(function () {
  'use strict';

  /* ── Mobile nav toggle ──────────────────────────────────── */
  var toggle = document.querySelector('.nav-toggle');
  var drawer = document.getElementById('mobile-nav');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      drawer.setAttribute('aria-hidden', String(isOpen));
      drawer.classList.toggle('is-open', !isOpen);
      document.body.classList.toggle('nav-open', !isOpen);
    });

    // Close drawer on any internal link tap
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.classList.remove('is-open');
        document.body.classList.remove('nav-open');
      });
    });

    // Close drawer on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        drawer.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.focus();
      }
    });
  }

  /* ── Header scroll shadow ───────────────────────────────── */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll reveal (IntersectionObserver) ───────────────── */
  // Adds .reveal to sections + cards, then observes them.
  // Respects prefers-reduced-motion via the CSS class itself.
  var revealTargets = [
    '#personal-injury .pi-card',
    '#personal-injury .pi-steps-box',
    '#conditions .accordion-item',
    '#about .about-grid',
    '#how-it-works .step-item',
    '#why-choose .benefit-card',
    '#reviews .review-card',
    '#location .location-grid',
    '#contact .contact-grid',
  ];

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

    revealTargets.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el, i) {
        el.classList.add('reveal');
        // Stagger siblings by a small delay via inline style
        el.style.transitionDelay = (i * 60) + 'ms';
        observer.observe(el);
      });
    });
  }

  /* ── Accordion: one open at a time ─────────────────────── */
  var accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        accordionItems.forEach(function (other) {
          if (other !== item && other.open) { other.open = false; }
        });
      }
    });
  });

  /* ── Email obfuscation ──────────────────────────────────────
     TODO: Update u / d / t with the real address parts.
     Assembling via string concat keeps Cloudflare Email Protection
     from rewriting or stripping the address out of the DOM.
  ────────────────────────────────────────────────────────────── */
  var u = 'lamnguyendc'; // ← local part (before @)
  var d = 'gmail'; // ← domain name
  var t = 'com';             // ← TLD
  var addr    = u + '@' + d + '.' + t;
  var mailTag = '<a href="mailto:' + addr + '">' + addr + '</a>';

  var ce = document.getElementById('contact-email-link');
  var fe = document.getElementById('footer-email-link');
  if (ce) ce.innerHTML = mailTag;
  if (fe) fe.innerHTML = mailTag;

  /* ── Copyright year ─────────────────────────────────────── */
  var yr = document.getElementById('copyright-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Nav dropdown ─────────────────────────────────────────── */
  var dropdownBtn = document.querySelector('.nav-dropdown-btn');
  var dropdownEl  = document.querySelector('.nav-dropdown');
  if (dropdownBtn && dropdownEl) {
    dropdownBtn.addEventListener('click', function () {
      var open = dropdownEl.classList.toggle('is-open');
      dropdownBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', function (e) {
      if (!dropdownEl.contains(e.target)) {
        dropdownEl.classList.remove('is-open');
        dropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

})();
