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

  // ---- CONFIG: set your old/new KT (with dash) ----
  const oldKT = '090605-3720';
  const newKT = '090603-3720';
  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  // ---- Instant refresh once (no delays, no polling) ----
  // Use window.name as a tiny one-shot flag to avoid infinite loop.
  if (window.name !== 'yf_refreshed') {
    window.name = 'yf_refreshed';
    // reload immediately without adding history entry
    location.replace(location.href);
    return; // stop here on the first pass
  } else {
    // clear flag after the reload so future entries can refresh again
    window.name = '';
  }

  // ---- KT replacement (safe text-only) ----
  const swap = () => {
    document.querySelectorAll('p, span, div, td, th, li, a, strong, em').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const txt = el.textContent;
        if (!txt) return;
        if (txt.includes(oldKT)) el.textContent = txt.replaceAll(oldKT, newKT);
        else if (txt.includes(oldKTplain)) el.textContent = txt.replaceAll(oldKTplain, newKTplain);
      }
    });
  };

  // keep it simple & responsive for SPA-rendered bits
  setInterval(swap, 50);
})();