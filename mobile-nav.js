/* ════════════════════════════════════════════════════════════════════
   mobile-nav.js — runtime-injected hamburger drawer for mobile viewports
   Works against both `.site-nav` (sub-page nav) and `.idx2-nav`
   (homepage nav). Reads the existing nav structure so it stays in sync
   with whatever links are already in the page — no per-page wiring.
   Below 760px, the desktop links are hidden by existing CSS; this script
   surfaces them through a hamburger button + slide-in drawer.
   ════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function buildDrawer() {
    var nav = document.querySelector('nav.site-nav, nav.idx2-nav');
    if (!nav) return;
    if (nav.classList.contains('gms-nav')) return; // skip the simplified conversion-page nav
    if (nav.querySelector('.mnav-hamburger')) return; // already initialised

    var isIdx2 = nav.classList.contains('idx2-nav');
    var linkListSel = isIdx2 ? '.idx2-nav-links' : '.nav-links';
    var dropdownSel = isIdx2 ? '.idx2-dropdown' : '.simple-dropdown, .dropdown-menu, .dropdown-states';
    var dropdownItemClassSel = isIdx2 ? '.idx2-has-dropdown' : '.has-dropdown, .has-mega-dropdown';
    var ctaSel = isIdx2 ? '.idx2-nav-cta' : '.nav-cta';

    var linkList = nav.querySelector(linkListSel);
    if (!linkList) return;

    // Build hamburger button
    var hamburger = document.createElement('button');
    hamburger.type = 'button';
    hamburger.className = 'mnav-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'mnav-drawer');
    hamburger.innerHTML =
      '<span class="mnav-hamburger-bar"></span>' +
      '<span class="mnav-hamburger-bar"></span>' +
      '<span class="mnav-hamburger-bar"></span>';

    // Insert hamburger just before the CTA so visual order is: brand … hamburger CTA
    var cta = nav.querySelector(ctaSel);
    var ctaLi = cta ? cta.closest('li') : null;
    if (ctaLi && ctaLi.parentNode === linkList) {
      linkList.insertBefore(hamburger, ctaLi);
    } else {
      nav.appendChild(hamburger);
    }

    // Build drawer
    var drawer = document.createElement('div');
    drawer.className = 'mnav-drawer';
    drawer.id = 'mnav-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'true');
    drawer.setAttribute('aria-label', 'Site navigation');
    drawer.hidden = true;

    var panel = document.createElement('div');
    panel.className = 'mnav-panel';

    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mnav-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML =
      '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">' +
        '<path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '</svg>';

    var panelInner = document.createElement('div');
    panelInner.className = 'mnav-panel-inner';

    // Build the link list by reading the existing nav
    var items = linkList.querySelectorAll(':scope > li');
    items.forEach(function (li) {
      if (li === ctaLi) return; // CTA handled separately at the bottom

      var hasDropdown = li.matches(dropdownItemClassSel);
      var topLink = li.querySelector(':scope > a');
      var trigger = li.querySelector(':scope > button');
      var label = topLink ? topLink.textContent.trim() : (trigger ? trigger.childNodes[0].textContent.trim() : '');

      if (hasDropdown) {
        var section = document.createElement('div');
        section.className = 'mnav-section';

        var heading = document.createElement('div');
        heading.className = 'mnav-heading';
        heading.textContent = label || 'Menu';
        section.appendChild(heading);

        var dropdown = li.querySelector(dropdownSel);
        if (dropdown) {
          var subLinks = dropdown.querySelectorAll('a[href]');
          subLinks.forEach(function (a) {
            var cloned = document.createElement('a');
            cloned.className = 'mnav-link';
            cloned.href = a.getAttribute('href');
            cloned.textContent = a.textContent.trim().replace(/\s+/g, ' ');
            section.appendChild(cloned);
          });
        }
        panelInner.appendChild(section);
      } else if (topLink) {
        var solo = document.createElement('a');
        solo.className = 'mnav-link mnav-link-solo';
        solo.href = topLink.getAttribute('href');
        solo.textContent = label;
        panelInner.appendChild(solo);
      }
    });

    // Bottom CTA mirrors the nav CTA
    if (cta) {
      var ctaClone = document.createElement('a');
      ctaClone.className = 'mnav-cta';
      ctaClone.href = cta.getAttribute('href') || '#';
      ctaClone.textContent = cta.textContent.trim();
      panelInner.appendChild(ctaClone);
    }

    panel.appendChild(closeBtn);
    panel.appendChild(panelInner);

    var scrim = document.createElement('div');
    scrim.className = 'mnav-scrim';

    drawer.appendChild(scrim);
    drawer.appendChild(panel);
    document.body.appendChild(drawer);

    // Open/close handlers
    function open() {
      drawer.hidden = false;
      // force reflow so the transition runs
      void drawer.offsetWidth;
      drawer.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      // wait for transition
      setTimeout(function () {
        if (!drawer.classList.contains('is-open')) drawer.hidden = true;
      }, 260);
    }

    hamburger.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) close();
      else open();
    });
    closeBtn.addEventListener('click', close);
    scrim.addEventListener('click', close);
    // Close when any link inside the drawer is tapped
    drawer.addEventListener('click', function (e) {
      var t = e.target.closest('a');
      if (t) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    // If the viewport widens past mobile while the drawer is open, close it.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760 && drawer.classList.contains('is-open')) close();
    });
  }

  ready(buildDrawer);
})();
