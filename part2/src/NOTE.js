/*
* React使用数组中对象的键属性来决定如何在组件重新渲染时更新该组件生成的视图。
* 关于这一点，更多的可以查看React文档https://reactjs.org/docs/reconciliation.html#recursing-on-children
*
* json-server将所有数据存储在db.json文件中，该文件位于服务器上。
* 在现实世界中，数据会被存储在某种数据库中。
* 然而，jon-server是一个方便的工具，它能够在开发阶段使用服务器端的功能，而不需要对其进行任何编程。
*
* 以前学过用XMLHttpRequest(XHR)对象进行HTTP请求来获取数据，1999年的老技术了，
* 【建议】不再推荐XHR，而推荐浏览器广泛使用的fetch方法，
* fetch方法基于promises，而不是XHR使用的事件驱动模型，在今天的浏览器中，可以借助所谓的网络工作者来运行并行化的代码。
* 然而，单个浏览器窗口的事件循环仍然只能由一个[单线程]处理
*
* axios库相当于fetch，但更顺手，安装：
*   npm install axios
*   npm install json-server --save-dev  (仅开发环境作数据库使用)
* 在package.json的scripts部分补充：
*   "server": "json-server -p3001 --watch db.json"
* 这样根目录下启动json-server更方便了：
*   npm run server
* */