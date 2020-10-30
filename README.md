# md目录化
![TamperMonkey v4.5](https://img.shields.io/badge/TamperMonkey-v4.8-brightgreen.svg) ![Chrome x64 v60.4](https://img.shields.io/badge/Chrome%20x64-v73.0-brightgreen.svg)  
本项目是个js脚本，需配合 [Greasy Fork](https://greasyfork.org/zh-CN) 脚本管理器使用。   
为网站的Markdown格式的文档，提供个目录列表   

### 安装使用 

[下载地址](https://greasyfork.org/zh-CN/scripts/387834)  

#### 配合Tampermonkey食用最佳
[Tampermonkey 插件下载](https://greasyfork.org/zh-CN)   

***Tip***: Internet Explorer 8 及更早 IE 版本不支持，本项目是基于Chrome开发调试，其他浏览器可能会存在些问题，请见谅      

### 插件功能

- 项目README.md增加目录侧栏导航  
- 功能： 
  - 鼠标左键点击 收缩/展开  
  - 鼠标右键点击 返回顶部  
  - 悬浮按钮 
  - 可拖动  
  - 点击滚动到页面相应部分 
  - 可手动拉伸  
- 目前只支持  
  - 码云（gitee）  
  - github
  - github wiki 
  - npmjs.com   
  - URL以`*.md`结尾的网站（测试版） 

### 更新日志
***2020.10.30*** : V1.10 Fix not find node        
***2020.09.15*** : V1.9  针对URL=*.md结尾网页优化，移除计时器，改成用户触发加载检测，同时为检测失败添加‘移除目录’按钮（测试版）      
***2020.09.14*** : V1.8  新增支持全部网站 *.md（测试版）      
***2020.07.14*** : V1.7  新增当前页面有能解析的md才展示      
***2020.06.23*** : V1.6  css样式进行兼容处理      
***2020.05.22*** : V1.5  新增支持github wiki 页    
***2020.05.20*** : V1.4  拖动按钮坐标改用百分比，对窗口大小改变做相应适配   
***2020.02.10*** : V1.3  修改样式,整个按钮可点;新增支持 npmjs.com      
***2019.12.04*** : V1.2  新增容错   
***2019.10.31*** : V1.1  修改样式，新增鼠标右键返回顶部   
***2019.10.28*** : V1.0  优化逻辑，追加判断目录内容是否存在  
***2019.10.25*** : V0.9  重构项目，移除jq，改用原生开发，新增悬浮按钮  
***2019.9.18*** : V0.8 修改样式,新增可手动拉伸  
***2019.9.11*** : V0.7 新增点击跳转前判断是否能跳,不能将回到主页执行跳转  
***2019.8.11*** : V0.6 优化代码，修改样式    
***2019.7.25*** : V0.5 新增支持github，修改样式  
***2019.7.25*** : V0.3 优化代码运行，修复bug，码云项目界面md目录化完成  
***2019.7.24*** : V0.1 初步完成码云md目录化  

### 关于

如果脚本对您有那么些小帮助的，麻烦帮忙点一下右上角的Star小星星  
本脚本仅在浏览器端运行，源码公开可见，仅做研究使用

### 反馈建议 
如发现bug/其他异常体验欢迎提交 [issues](https://github.com/lecoler/md-list/issues) 反馈 

### 效果图

![image 演示图](https://raw.githubusercontent.com/lecoler/readme.md-list/master/static/dom_01.png)   
![image 演示图](https://raw.githubusercontent.com/lecoler/readme.md-list/master/static/dom_02.png)
