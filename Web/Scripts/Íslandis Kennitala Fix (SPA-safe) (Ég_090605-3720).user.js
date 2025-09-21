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
(function() {
    'use strict';

    const oldKT = '090605-3720';
    const newKT = '090603-3720';
    const oldKTplain = oldKT.replace('-', '');
    const newKTplain = newKT.replace('-', '');

    // Detect URL changes (SPA navigation)
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;

            // If we just navigated to "minar-upplysingar", reload the page
            if (location.pathname.includes('/minar-upplysingar')) {
                location.reload();
            }
        }
    }, 500);

    // Kennitala replacement loop
    setInterval(() => {
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
    }, 50);
})();