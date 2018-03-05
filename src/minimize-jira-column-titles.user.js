// ==UserScript==
// @name         Minimize Jira column titles
// @namespace    https://github.com/D4ST1N/minimize-jira-column-titles
// @version      1.0.0
// @description  Allow to minimize jira column titles
// @author       D4ST1N
// @license MIT
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const getTitles = () => document.querySelectorAll('.ghx-column-headers li.ghx-column h2');
    let delay = 100;
    let maxTimes = 10;

    let timerId = setTimeout(function tick() {
        maxTimes -= 1;
        delay *= 2;

        if (getTitles().length) {
            const titles = getTitles();
            titles.forEach((title) => {
                title.title = title.innerHTML;
            });
            var style = document.createElement('style');
            style.innerHTML = [
                `.ghx-column-headers li.ghx-column { display: inline-flex; width: calc(100% / ${titles.length}); }`,
                '.ghx-column-headers li.ghx-column h2 { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100px; }',
                '#ghx-pool { padding-top: 50px !important; }'
            ].join('');
    document.head.appendChild(style);
            document.querySelector('ghx-pool').style.paddingTop = '50px';
        } else if (maxTimes > 0) {
            timerId = setTimeout(tick, delay);
        }
    }, delay);
})();
