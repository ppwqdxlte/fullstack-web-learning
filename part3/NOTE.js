/*
* 注意本章节的应用和练习并不都是React应用，而且我们不会使用create-react-app工具来初始化这个应用的项目。
* 创建part3文件夹，用【 npm init 】命令创建一个新模板，在项目的根部自动生成一个包含项目信息的package.json文件。
* package.json中对scripts做一个改动：
*   "start": "node index.js"
* 根目录运行 【 node index.js 】或者【 npm start 】启动后端服务器
*   【注意】start脚本之所以可以工作，因为在package.json中"scripts"处定义了"start"，
*       同理，虽然没有test库，【 npm test 】也能简单执行指定的命令。
* 尽管node index.js有效，但npm项目习惯于使用 npm 命令。
* */