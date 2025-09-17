// ==UserScript==
<<<<<<<< HEAD:Web/Scripts/300708-2690.user.js
// @name         Ísland.is Kennitala Fix (SPA-safe) (Kría Kemp | 300708-2690)
========
// @name         Ísland.is Kennitala Fix (SPA-safe) (Trausti Magnússon | 121208-3260)
>>>>>>>> 86ade988d9d08723c04fa2dea3e58185eefba57d:Web/Scripts/121208-3260.user.js
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
<<<<<<<< HEAD:Web/Scripts/300708-2690.user.js
    const oldKT = '300708-2690';
    const newKT = '300702-2690';
========
    const oldKT = '121208-3260';
    const newKT = '121204-3260';
>>>>>>>> 86ade988d9d08723c04fa2dea3e58185eefba57d:Web/Scripts/121208-3260.user.js
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