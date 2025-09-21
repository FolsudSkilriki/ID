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

  // === Kennitala config ===
  const oldKT = '090605-3720'; // with dash
  const newKT = '090603-3720'; // with dash
  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  // --- Refresh immediately on yfirlit URL (only once) ---
  if (location.href === "https://island.is/minarsidur/min-gogn/yfirlit" &&
      !sessionStorage.getItem("yfirlitRefreshed")) {
    sessionStorage.setItem("yfirlitRefreshed", "1");
    setTimeout(() => location.reload(), 10); // wait 10 ms, then reload
  }

  // --- Replace Kennitala values ---
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

  setInterval(replaceKennitala, 50);
})();