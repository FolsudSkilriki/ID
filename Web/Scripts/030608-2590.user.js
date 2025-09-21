// ==UserScript==
<<<<<<< HEAD:Web/Scripts/template.user copy 13.js
// @name         Ísland.is Kennitala Fix (SPA-safe) ()
=======
// @name         Ísland.is Kennitala Fix (SPA-safe) (Karen Tan Arnar | 030608-2590)
>>>>>>> 1278e879494c03c45d42e48eedd040eee2705036:Web/Scripts/030608-2590.user.js
// @namespace    http://tampermonkey.net/
// @version      1
// @description  Works with React routing on island.is and safely replaces Kennitala without breaking layout or styles
// @author       You
// @match        https://island.is/minarsidur/min-gogn/yfirlit
// @match        https://island.is/minarsidur/min-gogn/yfirlit/*
// @match        https://island.is/minarsidur/skirteini/okurettindi/default
// @grant        none
// @license        MIT
// ==/UserScript==
(function() {
    'use strict';
<<<<<<< HEAD:Web/Scripts/template.user copy 13.js
    const oldKT = '';
    const newKT = '';
=======
    const oldKT = '030608-2590';
    const newKT = '030605-2590';
>>>>>>> 1278e879494c03c45d42e48eedd040eee2705036:Web/Scripts/030608-2590.user.js
    const oldKTplain = oldKT.replace('-', '');
    const newKTplain = newKT.replace('-', '');
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