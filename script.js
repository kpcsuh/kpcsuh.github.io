/* SACFF — small progressive enhancements. The page is fully usable without JS. */
(function () {
  'use strict';

  /* =====================================================================
     FORM DELIVERY — configure this one line, then everything below works.

     Paste the Apps Script web-app URL you get at the end of the setup in
     google-apps-script/README.md. It handles both forms:
       · Contact form     -> emails sacff7@gmail.com
       · Prayer requests  -> appends a row to the Google Sheet (+ notifies)

     Until it is filled in, the contact form falls back to opening the
     visitor's own mail app addressed to sacff7@gmail.com, and the prayer
     form explains that it isn't connected yet. Nothing is silently lost.
     ===================================================================== */
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbwtV8sMDc72dqmhk-UMJCNBMzpBAU700DLtEM3lZhKGLHTRchq6uTCOVXEQyWq1YhNa/exec';                       // <-- paste the /exec URL here
  var CONTACT_EMAIL = 'sacff7@gmail.com';

  /* ---------------------------------------------------- mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  function closeNav() {
    if (!nav || !nav.classList.contains('is-open')) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  }

  /* ------------------------------------- highlight the section in view */
  var links = Array.prototype.slice.call(
    document.querySelectorAll('.site-nav a[href^="#"]')
  );
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ========================== form submission ========================== */
  var loadedAt = Date.now();

  document.querySelectorAll('[data-endpoint-form]').forEach(function (form) {
    var kind = form.getAttribute('data-endpoint-form');   // 'contact' | 'prayer'
    var status = form.querySelector('.form-status');
    var button = form.querySelector('button[type="submit"]');
    var original = button ? button.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        say('Please complete the highlighted fields.', 'error');
        var bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        return;
      }

      // Spam checks: honeypot filled, or submitted implausibly fast.
      var trap = form.querySelector('.hp input');
      if ((trap && trap.value) || Date.now() - loadedAt < 2500) {
        say('Thank you — your message has been received.');
        form.reset();
        return;
      }

      if (!ENDPOINT) { unconfigured(); return; }

      var data = new URLSearchParams(new FormData(form));
      data.set('form', kind);
      data.set('page', location.href);

      busy(true);
      // URL-encoded keeps this a "simple" request, so no CORS preflight —
      // which Apps Script web apps do not answer.
      fetch(ENDPOINT, { method: 'POST', body: data })
        .then(function (r) { return r.json().catch(function () { return { ok: r.ok }; }); })
        .then(function (res) {
          if (!res || res.ok === false) throw new Error(res && res.error);
          say(kind === 'prayer'
            ? 'Your request has been received. We will be praying with you.'
            : 'Thank you. Someone from the fellowship will be in touch.');
          form.reset();
        })
        .catch(function () {
          say(kind === 'prayer'
            ? 'Sorry — that did not send. Please email ' + CONTACT_EMAIL + ' instead.'
            : 'Sorry — that did not send.', 'error');
          if (kind === 'contact') mailtoFallback();
        })
        .then(function () { busy(false); });
    });

    function busy(on) {
      if (!button) return;
      button.disabled = on;
      button.textContent = on ? 'Sending…' : original;
    }

    function say(msg, state) {
      if (!status) return;
      if (state) status.dataset.state = state; else delete status.dataset.state;
      status.textContent = msg;
    }

    function unconfigured() {
      if (kind === 'contact') {
        say('Opening your mail app…');
        mailtoFallback();
      } else {
        say('This form is not connected yet. Please email ' + CONTACT_EMAIL +
            ' with your request.', 'error');
      }
    }

    // Hands the message to the visitor's own mail client, pre-filled. Used when
    // no endpoint is configured or the request fails, so nothing is lost.
    function mailtoFallback() {
      var get = function (n) {
        var el = form.querySelector('[name="' + n + '"]');
        return el ? el.value : '';
      };
      var body =
        'Name: ' + get('name') + '\n' +
        'Email: ' + get('email') + '\n' +
        'About: ' + get('topic') + '\n\n' + get('message');
      window.location.href = 'mailto:' + CONTACT_EMAIL +
        '?subject=' + encodeURIComponent('Website enquiry — ' + (get('topic') || 'SACFF')) +
        '&body=' + encodeURIComponent(body);
    }
  });

  /* ============================== giving ==============================
     PayPal JS SDK, using SACFF's own client id (a public identifier, not a
     secret). The SDK is only fetched once the Giving section is scrolled into
     view, so visitors who never reach it aren't served a third-party script.
     Zelle and cheque details need no JavaScript at all and always show.
     ==================================================================== */
  var PAYPAL_CLIENT_ID = 'AUyMT9V09ADxRrDnhj4X1_0ZK78guY8LfQPa-PaWnZRoi3F2ULvY9zaDvjov4BHVH4jA6gk5a2vN1wZ9';

  var giveSection = document.getElementById('giving');
  var amountInput = document.getElementById('give-amount');
  var payContainer = document.getElementById('paypal-buttons');
  var giveStatus = document.getElementById('give-status');

  if (giveSection && amountInput && payContainer) {
    // Preset buttons just fill the amount field, which stays the single source
    // of truth — createOrder reads it at click time, so no button re-render.
    document.querySelectorAll('.amount-presets button').forEach(function (b) {
      b.addEventListener('click', function () {
        amountInput.value = b.getAttribute('data-amount');
        markActivePreset();
        amountInput.dispatchEvent(new Event('input'));
      });
    });
    amountInput.addEventListener('input', markActivePreset);
    markActivePreset();

    if ('IntersectionObserver' in window) {
      var payObserver = new IntersectionObserver(function (entries, obs) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          obs.disconnect();
          loadPayPal();
        }
      }, { rootMargin: '200px' });
      payObserver.observe(giveSection);
    } else {
      loadPayPal();
    }
  }

  function markActivePreset() {
    document.querySelectorAll('.amount-presets button').forEach(function (b) {
      var on = b.getAttribute('data-amount') === String(amountInput.value);
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  /** Returns the amount as a PayPal-safe decimal string, or null if invalid. */
  function giftAmount() {
    var n = parseFloat(amountInput.value);
    if (!isFinite(n) || n < 1 || n > 25000) return null;
    return n.toFixed(2);
  }

  function loadPayPal() {
    var s = document.createElement('script');
    s.src = 'https://www.paypal.com/sdk/js?client-id=' + PAYPAL_CLIENT_ID +
            '&currency=USD&components=buttons&disable-funding=venmo,paylater,applepay';
    s.onload = renderPayPal;
    s.onerror = function () {
      payContainer.innerHTML = '<p class="paypal-placeholder">Card giving is ' +
        'unavailable right now — please use Zelle or a cheque.</p>';
    };
    document.head.appendChild(s);
  }

  function renderPayPal() {
    if (!window.paypal || !window.paypal.Buttons) return;
    payContainer.innerHTML = '';

    window.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'donate' },

      createOrder: function (data, actions) {
        var value = giftAmount();
        if (!value) {
          tell('Please enter an amount between $1 and $25,000.', 'error');
          return Promise.reject(new Error('invalid amount'));
        }
        tell('');
        return actions.order.create({
          purchase_units: [{
            amount: { value: value, currency_code: 'USD' },
            description: 'Donation to San Antonio Christian Family Fellowship',
          }],
          application_context: { shipping_preference: 'NO_SHIPPING' },
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          var first = '';
          try { first = details.payer.name.given_name; } catch (e) {}
          tell('Thank you' + (first ? ', ' + first : '') +
               '. Your gift has been received — God bless you.');
        });
      },

      onCancel: function () { tell('No payment was taken.'); },

      onError: function () {
        tell('Something went wrong with the payment. Please try Zelle or a cheque, ' +
             'or email sacff7@gmail.com.', 'error');
      },
    }).render('#paypal-buttons');
  }

  function tell(msg, state) {
    if (!giveStatus) return;
    if (state) giveStatus.dataset.state = state; else delete giveStatus.dataset.state;
    giveStatus.textContent = msg;
  }

  /* ------------------------------------------- newsletter (still a stub) */
  document.querySelectorAll('.subscribe').forEach(function (form) {
    var status = form.parentNode.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;
      if (!form.checkValidity()) {
        status.dataset.state = 'error';
        status.textContent = 'Please enter a valid email address.';
        return;
      }
      delete status.dataset.state;
      status.textContent = 'Thank you — you’re on the list.';
      form.reset();
    });
  });

  /* ------------------------------------------------------ footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
