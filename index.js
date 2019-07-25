// ==UserScript==
// @name        码云README.md目录化
// @namespace    README.md
// @version      0.2
// @description  码云项目主界面README.md增加目录侧栏导航，有需求或问题请反馈。
// @author       lecoler
// @match       *://gitee.com/*/*
// @note           2019.7.25-V0.2 修复bug，优化运行速度，新增按序获取
// @grant		 GM_addStyle
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @run-at 		 document-end
// ==/UserScript==
(function() {
    'use strict';
    //var
    const saveList = ['H1','H2','H3','H4','H5','H6']
    let list = [];
    //set css
    function setCss($dom,type){
        let css = {
            'color': '#333',
        };
        switch(+type){
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
        $dom.css(css).hover(function(){
            $(this).css('color','#01AAED')
        }).mouseout(function () {
            $(this).css('color','#333');
        });
    }
    //create dom
    function createBtn(){
        return new Promise(reslove=>{
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
            const $btn = $('<button id="aaaa">目录</button>').css(css).hover(function(){
                $(this).css('background','#5FB878')
            }).mouseout(function () {
                $(this).css('background','#009688');
            })
            reslove($btn);
        })
    }
    function createDom(){
        const $listDom = $('<div></div>');
        const listCss = {
            'min-width': '100px',
            'box-sizing': 'border-box',
            'padding': '10px',
            'background': '#F0F0F0',
            'border': '1px solid #ccc',
            'box-shadow': '1px 2px 3px #ccc',
            'height': '80%',
            'position': 'fixed',
            'left': '0',
            'top': '10%',
            'overflow-y': 'auto',
            'color': '#333',
            'display': 'flex',
            'flex-direction': 'column',
            'border-radius': '5px',
            'line-height': '1.6',
        };
        $listDom.css(listCss).hide();
        for(let i of list){
            let $a = $(`<a href=#${i.id}>${i.value}</a>`);
            setCss($a,i.type);
            $listDom.append($a);
        }
        $('body').append($listDom);
        $listDom.slideDown('fast');
        createBtn().then($btn=>{
            $btn.on('click',()=>{
                $listDom.slideToggle();
            })
            $('body').append($btn);
        })
    }
    //get readme.md
    (function (){
        //码云
        const $content = $('.file_content.markdown-body','#git-readme');
        const $domArr = $content.children();
        //get h1,h2,h3,h4,h5,h6
        for(let dom of $domArr.toArray()){
            let type;
            if(saveList.some((i,k)=>i==$(dom).get(0).tagName&&(type=k+1))){
                const id = $(dom).children('a').attr('id');
                const value = $(dom).text().trim();
                list.push({type,id,value})
            }
        }
        if(list.length)
            createDom();
        console.log(list)
    })()
})();
