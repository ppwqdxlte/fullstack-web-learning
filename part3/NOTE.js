/*
* 注意本章节的应用和练习并不都是React应用，而且我们不会使用create-react-app工具来初始化这个应用的项目。
* 创建part3文件夹，用【 npm init 】命令创建一个新模板，在项目的根部自动生成一个包含项目信息的package.json文件。
* package.json中对scripts做一个改动：
*   "start": "node index.js"
* 根目录运行 【 node index.js 】或者【 npm start 】启动后端服务器
*   【注意】start脚本之所以可以工作，因为在package.json中"scripts"处定义了"start"，
*       同理，虽然没有test库，【 npm test 】也能简单执行指定的命令。
* 尽管node index.js有效，但npm项目习惯于使用 npm 命令。
*
* 在提交的文件中包含Token也没事儿，Github自动检测到后就把token整无效了，
* 需要重新创建新的token即可。
*
* 编辑index.js将应用变成 web server http://localhost:3001
* http://localhost:3001/哈哈哈　此时随便什么端点和上面URL显示一样内容。
* Node.js语法不太一样，browser中运行的代码都是用ES6模块，模块用export定义，用import引用。
* 然而Node.js用CommonJS模块，原因是早在JS语言规范支持模块前，Node生态已经引入了模块特性，
* Node如今也支持了ES6模块，但由于支持不完善，将坚持使用CommonJS模块。
*
* 用Node内置的http实现server一旦app规模扩大就很麻烦，
* 最流行的创建后端服务器的库是【 express 】:
* !!! 不用执行 npm install express !!!也不用更新项目的依赖关系：npm update
* 好像因为part3的父文件夹有node_modules，已经包含了express模块？？？
* index.js先用express写服务器，再写map接口API，
* 然后npm start启动，请求http://localhost:3002 and http://localhost:3002/api/notes
*
*
*
*
* */