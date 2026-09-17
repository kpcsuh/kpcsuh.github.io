/* SACFF — small progressive enhancements. The page is fully usable without JS. */
(function () {
  'use strict';

  /* ---------------------------------------------------- mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close the menu after picking a destination, and on Escape.
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

  /* --------------------------------------------------- form stubs */
  // No backend is wired up yet: validate, acknowledge, and keep the input.
  // Point these at your real endpoint when one exists.
  document.querySelectorAll('.contact-form, .subscribe').forEach(function (form) {
    var status = form.classList.contains('subscribe')
      ? form.parentNode.querySelector('.form-status')
      : form.querySelector('.form-status');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!status) return;

      if (!form.checkValidity()) {
        status.dataset.state = 'error';
        status.textContent = 'Please fill in the highlighted fields.';
        var bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        return;
      }

      delete status.dataset.state;
      status.textContent = form.classList.contains('subscribe')
        ? 'Thank you — you’re on the list.'
        : 'Thank you. Someone from the fellowship will be in touch.';
      form.reset();
    });
  });

  /* ------------------------------------------------------ footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
