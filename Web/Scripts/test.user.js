// ==UserScript==
// @name         Auto Full Refresh on URL Change
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fully reloads the page whenever the URL changes (for SPAs like island.is)
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastUrl = location.href;

    // Watch for URL changes every 300ms
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            // Force full page reload
            location.reload(true);
        }
    }, 50);
})();