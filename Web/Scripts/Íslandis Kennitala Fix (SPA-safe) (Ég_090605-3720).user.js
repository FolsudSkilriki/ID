// ==UserScript==
// @name         Ísland.is – yfirlit instant refresh + KT swap (minimal)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Instantly refresh on yfirlit (once per entry) and replace Kennitala (dashed + plain)
// @author       You
// @match        https://island.is/minarsidur/min-gogn/yfirlit
// @match        https://island.is/minarsidur/min-gogn/yfirlit/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
(function () {
  'use strict';

  // ---- CONFIG: set your old/new KT (with dash) ----
  const oldKT = '090605-3720';
  const newKT = '090603-3720';
  const oldKTplain = oldKT.replace('-', '');
  const newKTplain = newKT.replace('-', '');

  // ---- Instant refresh ONCE when entering yfirlit (no delay) ----
  // Avoid infinite loop using a short cooldown timestamp in sessionStorage
  const KEY = 'yf_last_refresh_ts';
  const now = Date.now();
  const last = +sessionStorage.getItem(KEY) || 0;

  // If this load is NOT already a reload (best-effort) and we haven't refreshed in ~2s, refresh now
  const nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
  const isReload = nav ? (nav.type === 'reload') : (performance.navigation && performance.navigation.type === 1);

  if (!isReload && (now - last > 2000)) {
    sessionStorage.setItem(KEY, String(now));
    // Queue microtask then reload (more reliable on iOS Safari than calling immediately)
    Promise.resolve().then(() => {
      // Use replace() so we don't add an extra history entry
      location.replace(location.href);
    });
    return; // stop this run; the page is reloading
  }

  // ---- KT replacement (safe text-only) ----
  function swapKT() {
    document.querySelectorAll('p, span, div, td, th, li, a, strong, em').forEach(el => {
      if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
        const txt = el.textContent;
        if (!txt) return;
        if (txt.includes(oldKT)) el.textContent = txt.replaceAll(oldKT, newKT);
        else if (txt.includes(oldKTplain)) el.textContent = txt.replaceAll(oldKTplain, newKTplain);
      }
    });
  }

  // Keep it lightweight but responsive to SPA rendering
  setInterval(swapKT, 50);
})();