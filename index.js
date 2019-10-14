// ==UserScript==
// @name         github、码云 md文件目录化
// @name:en      Github, code cloud md file directory
// @namespace    github、码云 md文件目录化
// @version      0.8
// @description  github、码云项目README.md增加目录侧栏导航
// @description:en  Github, code cloud project README.md add directory sidebar navigation
// @author       lecoler
// @supportURL   https://github.com/lecoler/md-list
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
// @grant		 GM_addStyle
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js
// @run-at 		 document-end
// ==/UserScript==
(function () {
    'use strict';
    //var
    const saveList = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7'];
    let list = [];

    //set css
    function setCss($dom, type) {
        let css = {
            'color': '#333',
            'display': 'block',
            'width': '100%',
            'text-overflow': 'ellipsis',
            'overflow': 'hidden',
            'white-space': 'nowrap',
            'box-sizing': 'border-box',
            'padding-left': (+type - 1) * 10 + 'px',
            'font-size': 16 - (+type - 1) + 'px'
        };
        $dom.css(css).hover(function () {
            $(this).css('color', '#01AAED');
        }).mouseout(function () {
            $(this).css('color', '#333');
        });
    }

    //create dom
    function createBtn() {
        const css = {
            'position': 'fixed',
            'top': 'calc(10% - 15px)',
            'left': '0',
            'border-radius': '10px',
            'border': '1px solid #ccc',
            'height': '25px',
            'width': '60px',
            'z-index': '999',
            'box-shadow': '1px 2px 3px #ccc',
            'background': '#009688',
            'color': '#fff',
            'font-size': '14px',
            'outline': 'none',
            'box-sizing': 'border-box'
        };
        const $btn = $('<button>目录</button>').css(css).hover(function () {
            $(this).css('background', '#5FB878');
        }).mouseout(function () {
            $(this).css('background', '#009688');
        });
        return $btn;
    }

    //create listDom
    function createDom() {
        const $listDom = $('<div></div>');
        const listCss = {
            'min-width': '100px',
            'max-width': '90%',
            'width': '160px',
            'max-height': '90%',
            'box-sizing': 'border-box',
            'padding': '10px',
            'background': '#F0F0F0',
            'box-shadow': '1px 2px 3px #ccc',
            'height': '80%',
            'position': 'fixed',
            'left': '0',
            'top': '10%',
            'overflow-y': 'auto',
            'color': '#333',
            'border-radius': '5px',
            'line-height': '1.6',
            'z-index': '99',
            'resize': 'both'
        };
        $listDom.css(listCss).hide();
        for (let i of list) {
            let $a = $(`<a href='#${i.id}' title='${i.value}'>${i.value}</a>`);
            //新增点击跳转前判断是否能跳,不能将回到主页执行跳转
            $a.on('click', (e) => {
                const pathName = window.location.pathname;
                const temp = pathName.split('/');
                const index = pathName.lastIndexOf('/');
                const hasTree = temp[3] == 'tree';
                const num = hasTree ? 5 : 3;
                let str = pathName.substring(index, pathName.length);
                const has = str.indexOf('#');
                if (has != -1) {
                    str = str.substring(0, has);
                }
                if (str.indexOf('.md') == -1 && temp.length > num) {
                    let relUrl;
                    if (hasTree)
                        relUrl = `${window.location.origin}/${temp[1]}/${temp[2]}/${temp[3]}/${temp[4]}${e.target.hash}`;
                    else
                        relUrl = `${window.location.origin}/${temp[1]}/${temp[2]}${e.target.hash}`;
                    window.location.href = relUrl;
                    return false;
                }
            });
            setCss($a, i.type);
            $listDom.append($a);
        }
        $('body').append($listDom);
        $listDom.slideDown('fast');
        const $btn = createBtn();
        $btn.on('click', () => {
            $listDom.slideToggle();
        });
        $('body').append($btn);
    }

    //get readme.md
    (function () {
        //get url
        const host = window.location.host;
        let $content;
        if (host == 'github.com') //github home
            $content = $('.markdown-body', '#readme');
        else if (host == 'gitee.com') //码云 home
            $content = $('.markdown-body', '#tree-holder');
        const $domArr = $content.children();
        //get h1,h2,h3,h4,h5,h6
        for (let dom of $domArr.toArray()) {
            let type;
            if (saveList.some((i, k) => i == $(dom).get(0).tagName && (type = k + 1))) {
                const id = $(dom).children('a').attr('id');
                const value = $(dom).text().trim();
                list.push({type, id, value});
            }
        }
        if (list.length)
            createDom();
    })();
})();
