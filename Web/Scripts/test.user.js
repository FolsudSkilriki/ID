// ==UserScript==
// @name         Auto Full Refresh on URL Change (except innskra)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Reloads the page when the URL changes, unless it includes "innskra" (login pages)
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastUrl = location.href;

    // Check for URL changes every 300ms
    setInterval(() => {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            // Only reload if the new URL does NOT contain "innskra"
            if (!currentUrl.includes('innskra')) {
                location.reload(true); // full reload
            }
        }
    }, 300);
})();