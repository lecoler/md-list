// ==UserScript==
// @name        码云README.md目录化
// @namespace    README.md
// @version      0.1
// @description  码云项目主界面README.md增加目录侧栏导航，有需求或问题请反馈。
// @author       lecoler
// @license      GPL-3.0-only
// @match       *://gitee.com/*/*
// @grant		 GM_addStyle
// @require      https://code.jquery.com/jquery-latest.min.js
// @run-at 		 document-end
// ==/UserScript==

(function() {
    'use strict';
    try{
        //var
        let list = [];
        //methods
        function getItem($arr,type){
            return new Promise(reslove=>{
                for(let i=0;i<$arr.length;i++){
                    let id = $($arr[i]).children('a').attr('id');
                    if(id){
                        let obj = {
                            type: type,
                            id: '#'+id,
                            value: id,
                        };
                        list.push(obj);
                    }else{
                        continue;
                    }
                }
                reslove();
            })
        }
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
                    css['text-indent'] = '12px';
                    break;
                case 3:
                    css['font-size'] = '14px';
                    css['text-indent'] = '24px';
                    break;
                case 4:
                    css['font-size'] = '13px';
                    css['text-indent'] = '36px';
                    break;
                case 5:
                    css['font-size'] = '12px';
                    css['text-indent'] = '48px';
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
                let $a = $(`<a href=${i.id}>${i.value}</a>`);
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

        //get dom
        const $body = $('#git-readme') || $('.readme-box');
        const $content = $('.file_content.markdown-body',$body);
        Promise.all([getItem($('h1',$content).toArray(),'1'),
                     getItem($('h2',$content).toArray(),'2'),
                     getItem($('h3',$content).toArray(),'3'),
                     getItem($('h4',$content).toArray(),'4'),
                     getItem($('h5',$content).toArray(),'5')])
            .then(()=>{
            if(list.length)
                createDom();
            removeAd();
        })



    }catch(err){
        console.error(err)
    }
})();
