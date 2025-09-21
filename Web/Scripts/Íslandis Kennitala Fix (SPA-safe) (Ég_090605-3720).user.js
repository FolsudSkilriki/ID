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

  const REFRESH_DELAY_MS = 10;      // wait 10ms then reload
  const REENTER_COOLDOWN_MS = 3000; // allow another auto refresh after 3s

  // Path keys so we can rate-limit per page group
  function pathKey() {
    const p = location.pathname;
    if (p === '/minarsidur/min-gogn/yfirlit') return 'yfirlit-root';
    if (p.startsWith('/minarsidur/min-gogn/yfirlit/')) return 'yfirlit-sub';
    return null;
  }

  const key = pathKey();
  if (!key) return;

  const STORE_KEY = 'is_refresh_ts_' + key;
  const now = Date.now();
  const last = parseInt(sessionStorage.getItem(STORE_KEY) || '0', 10);

  if (!last || now - last > REENTER_COOLDOWN_MS) {
    sessionStorage.setItem(STORE_KEY, String(now));
    setTimeout(() => {
      location.replace(location.href); // reload without adding to history
    }, REFRESH_DELAY_MS);
  }

  // Backstop in case @run-at is ignored
  document.addEventListener('DOMContentLoaded', () => {
    const againNow = Date.now();
    const againLast = parseInt(sessionStorage.getItem(STORE_KEY) || '0', 10);
    if (!againLast || againNow - againLast > REENTER_COOLDOWN_MS) {
      sessionStorage.setItem(STORE_KEY, String(againNow));
      setTimeout(() => location.replace(location.href), REFRESH_DELAY_MS);
    }
  }, { once: true });
})();