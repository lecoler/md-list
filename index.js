// ==UserScript==
// @name         github、码云 md文件目录化
// @namespace    github、码云 md文件目录化
// @version      0.6
// @description  github、码云项目README.md增加目录侧栏导航
// @author       lecoler
// @supportURL   https://github.com/lecoler/md-list
// @match        *://gitee.com/*/*
// @match        *://www.gitee.com/*/*
// @match        *://github.com/*/*
// @match        *://www.github.com/*/*
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
    const saveList = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
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
        };
        switch (+type) {
            case 1:
                css['font-size'] = '16px';
                break;
            case 2:
                css['font-size'] = '15px';
                css['text-indent'] = '10px';
                break;
            case 3:
                css['font-size'] = '14px';
                css['text-indent'] = '20px';
                break;
            case 4:
                css['font-size'] = '13px';
                css['text-indent'] = '30px';
                break;
            case 5:
                css['font-size'] = '12px';
                css['text-indent'] = '40px';
                break;
            case 6:
                css['font-size'] = '10px';
                css['text-indent'] = '50px';
                break;
        }
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
            'box-sizing': 'border-box',
        };
        const $btn = $('<button>目录</button>').css(css).hover(function () {
            $(this).css('background', '#5FB878');
        }).mouseout(function () {
            $(this).css('background', '#009688');
        });
        return $btn;
    }

    function createDom() {
        const $listDom = $('<div></div>');
        const listCss = {
            'min-width': '100px',
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
            'max-width': '160px',

        };
        $listDom.css(listCss).hide();
        for (let i of list) {
            let $a = $(`<a href='#${i.id}' title='${i.value}'>${i.value}</a>`);
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
