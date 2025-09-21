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
// ==UserScript==
// @name         Ísland.is Kennitala Fix (SPA-safe auto-refresh alt)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Auto-refreshes 10ms after entering "Mínar upplýsingar", safer approach using history hooks
// @author       You
// @match        https://island.is/minarsidur/min-gogn/yfirlit
// @match        https://island.is/minarsidur/min-gogn/yfirlit/*
// @match        https://island.is/minarsidur/skirteini/okurettindi/default
// @grant        none
// ==/UserScript==
(function() {
    'use strict';

    const oldKT = '090605-3720';
    const newKT = '090603-3720';
    const oldKTplain = oldKT.replace('-', '');
    const newKTplain = newKT.replace('-', '');

    // Run Kennitala replacement
    function replaceKennitala() {
        document.querySelectorAll('p, span, div').forEach(el => {
            if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
                let text = el.textContent;
                if (text.includes(oldKT)) {
                    el.textContent = text.replace(oldKT, newKT);
                }
                if (text.includes(oldKTplain)) {
                    el.textContent = text.replace(oldKTplain, newKTplain);
                }
            }
        });
    }

    // Run on load
    setInterval(replaceKennitala, 50);

    // Intercept SPA navigation
    function onUrlChange() {
        if (location.pathname.includes('/minar-upplysingar')) {
            setTimeout(() => {
                location.reload();
            }, 10); // wait 10 ms before reload
        }
    }

    // Patch pushState & replaceState to detect SPA routing
    const pushState = history.pushState;
    history.pushState = function() {
        pushState.apply(history, arguments);
        onUrlChange();
    };

    const replaceState = history.replaceState;
    history.replaceState = function() {
        replaceState.apply(history, arguments);
        onUrlChange();
    };

    window.addEventListener('popstate', onUrlChange);

    // Also run on initial load
    onUrlChange();

})();