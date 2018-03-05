// ==UserScript==
// @name         Minimize Jira column titles
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.*.com/browse/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const delay = 200;
    const getTitles = () => document.querySelectorAll('.ghx-column-headers li.ghx-column h2');

    let timerId = setTimeout(function tick() {
        if (getTitles().length) {
            const titles = getTitles();
            titles.forEach((title) => {
                title.title = title.innerHTML;
            });
            var style = document.createElement('style');
            style.innerHTML = [
                `.ghx-column-headers li.ghx-column { display: inline-flex; width: calc(100% / ${titles.length}); }`,
                '.ghx-column-headers li.ghx-column h2 { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px; }',
                '#ghx-pool { padding-top: 50px !important; }'
            ].join('');
    document.head.appendChild(style);
            document.querySelector('ghx-pool').style.paddingTop = '50px';
        } else {
            timerId = setTimeout(tick, delay);
        }
    }, delay);
})();
