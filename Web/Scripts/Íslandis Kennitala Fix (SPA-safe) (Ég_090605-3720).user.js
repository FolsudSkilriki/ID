    // ==UserScript==
// @name         Ísland.is Kennitala Fix (SPA-safe) (Ég | 090605-3720)
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Works with React routing on island.is and safely replaces Kennitala without breaking layout or styles.
// @author       You
// @match        https://island.is/minarsidur/min-gogn/yfirlit
// @match        https://island.is/minarsidur/min-gogn/yfirlit/*
// @match        https://island.is/minarsidur/skirteini/okurettindi/default
// @grant        none
// @license        MIT
// @downloadURL https://update.greasyfork.org/scripts/547845/%C3%8Dslandis%20Kennitala%20Fix%20%28SPA-safe%29%20%28Tristan%20Sikora%20%7C%20200907-2050%29.user.js
// @updateURL https://update.greasyfork.org/scripts/547845/%C3%8Dslandis%20Kennitala%20Fix%20%28SPA-safe%29%20%28Tristan%20Sikora%20%7C%20200907-2050%29.meta.js
// ==/UserScript==
(function () {
  'use strict';

  // === Kennitala config (edit these two only) ===
  const oldKT = '090605-3720'; // with dash
  const newKT = '090603-3720'; // with dash
  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  // --- Replace Kennitala safely (no innerHTML; text nodes only) ---
  function replaceKennitala() {
    document.querySelectorAll('p, span, div, td, th, li, a, strong, em').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const txt = el.textContent;
        if (!txt) return;
        if (txt.includes(oldKT)) {
          el.textContent = txt.replaceAll(oldKT, newKT);
        } else if (txt.includes(oldKTplain)) {
          el.textContent = txt.replaceAll(oldKTplain, newKTplain);
        }
      }
    });
  }

  // Run continuously to catch SPA-rendered content
  setInterval(replaceKennitala, 50);

  // --- Auto-refresh after clicking "Mínar upplýsingar" ---
  // Guard so we don't reload twice from the same click
  const RELOAD_FLAG = 'is_minuppl_reload_once';
  if (sessionStorage.getItem(RELOAD_FLAG) === '1') {
    // Clear the flag on the reloaded page
    sessionStorage.removeItem(RELOAD_FLAG);
  }

  // Delegate clicks anywhere in the document
  document.addEventListener('click', (evt) => {
    const target = evt.target.closest('a, button, [role="button"]');
    if (!target) return;

    // Heuristics to detect the correct control:
    const label = (target.getAttribute('aria-label') || target.textContent || '').trim();
    const href = (target.getAttribute('href') || '').toLowerCase();

    const looksLikeMinarUppl =
      /mínar upplýsingar/i.test(label) ||         // Icelandic visible label
      /minar upplysingar/i.test(label) ||         // label without accents
      /minar|upplysing/i.test(label) ||           // partials from label
      href.includes('minar') || href.includes('upplysing'); // href contains hints

    if (!looksLikeMinarUppl) return;

    // Set flag and refresh after 10ms
    sessionStorage.setItem(RELOAD_FLAG, '1');
    setTimeout(() => {
      location.reload();
    }, 10);
  }, true); // capture phase to catch framework handlers early
})();