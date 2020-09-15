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

- childList：子节点的变动
- attributes：属性的变动
- characterData：节点内容或节点文本的变动
- subtree：所有后代节点的变动

方法

+ disconnect()   取消监听
+ takeRecords()  清空记录