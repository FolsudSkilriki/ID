// ==UserScript==
<<<<<<<< HEAD:Web/Scripts/220207-2850.user.js
// @name         Ísland.is Kennitala Fix (SPA-safe) (Magnús Helgason | 220207-2850)
========
// @name         Ísland.is Kennitala Fix (SPA-safe) (Pálmi Þór Helgason | 040408-4520)
>>>>>>>> 258a2a5d008d0a475ec0439b8f62b4fca95c9da0:Web/Scripts/040408-4520.user.js
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
<<<<<<<< HEAD:Web/Scripts/220207-2850.user.js
    const oldKT = '220207-2850';
    const newKT = '220204-2850';
========
    const oldKT = '040408-4520';
    const newKT = '040407-4520';
>>>>>>>> 258a2a5d008d0a475ec0439b8f62b4fca95c9da0:Web/Scripts/040408-4520.user.js
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