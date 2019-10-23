// ==UserScript==
// @name         github、码云 md文件目录化
// @name:en      Github, code cloud md file directory
// @namespace    github、码云 md文件目录化
// @version      0.8
// @description  github、码云项目README.md增加目录侧栏导航
// @description:en  Github, code cloud project README.md add directory sidebar navigation
// @author       lecoler
// @supportURL   https://github.com/lecoler/md-list
// @icon         https://raw.githubusercontent.com/lecoler/readme.md-list/master/static/icon.png
// @match        *://gitee.com/*/*
// @match        *://www.gitee.com/*/*
// @match        *://github.com/*/*
// @match        *://www.github.com/*/*
// @note         2019.9.18-V0.8  修改样式,新增可手动拉伸
// @note         2019.9.11-V0.7  新增点击跳转前判断是否能跳,不能将回到主页执行跳转
// @note         2019.8.11-V0.6  优化代码，修改样式
// @note         2019.7.25-V0.5  美化界面
// @note         2019.7.25-V0.4  新增支持github
// @note         2019.7.25-V0.2 修复bug，优化运行速度，新增按序获取
// @home-url     https://greasyfork.org/zh-CN/scripts/387834
// @homepageURL  https://github.com/lecoler/md-list
// @grant		     GM_addStyle
// @run-at 		   document-end
// ==/UserScript==
(function () {
    'use strict';
    // 初始化
    let initStatus = false;
    function init() {
        style();
        const button = document.createElement('button');
        button.innerHTML = '目录';
        button.setAttribute('class', 'le-md-btn');
        document.body.appendChild(button);
        initStatus = true;
    }
    // 插入样式表
    function style() {
        const style = document.createElement('style');
        style.innerHTML = `
        .le-md-btn{
            color: #000;
        }
        `;
        document.head.appendChild(style);
    }
    // 执行
    (function start() {
        // 获取链接
        const host = window.location.host;

        // 获取相应的容器dom
        let $content;
        let list = [];
        if (host === 'github.com' || host.startsWith('localhost')) {
            //github home
            $content = document.getElementById('readme').getElementsByClassName('markdown-body')[0];
        } else if (host === 'gitee.com') {
            //码云 home
            $content = document.getElementById('tree-content-holder').getElementsByClassName('markdown-body')[0];
        }
        // 获取子级
        const $children = $content.children;
        for (let $dom of $children) {
            const tagName = $dom.tagName;
            const lastCharAt = +tagName.charAt(tagName.length - 1);
            // 获取Tag h0-h9
            if (tagName.length === 2 && tagName.startsWith('H') && !isNaN(lastCharAt)) {
                // 获取value
                const value = $dom.innerText.trim();
                // 获取锚点
                const href = $dom.getElementsByTagName('a')[0].getAttribute('href');
                list.push({type: lastCharAt, value, href});
            }
        }
        //是否存在
        if (list.length) {
            if(!initStatus) init()
        }
    })();


})();
