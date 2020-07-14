### 笔记
1. github 使用`pjax`加载  
so 可直接监听 `pjax`加载完成事件
```js
window.addEventListener('pjax:complete', function (e) {
    console.log(e);
});
```
2. 监听`dom`改变事件
```js
const observe = new MutationObserver(function(MutationRecord,MutationObserver) {
  console.log(MutationRecord,MutationObserver);
})
observe.observe(document.getElementById('body'), {
    childList: true
})
```