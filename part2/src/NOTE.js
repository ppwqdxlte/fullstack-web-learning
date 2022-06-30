/* 启动React应用 npm start
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
*
* A Promise是一个代表异步操作(最终完成或失败)的对象。
* 3种状态：
*   1.答应是pending：这意味着最终的值（以下两个中的一个）还不能用。
*   2.承诺是fulfilled：它意味着操作已经完成，最终值可用，
*       一般来说是一个成功的操作。这种状态有时也被称为resolved。
*   3.承诺被拒绝：这意味着一个错误阻止了最终值的确定，这一般代表一个失败的操作。
*
* 我们已经使用了与React版本16.8.0一起引入的【状态钩子】，
* 它为定义为函数的React组件--所谓的功能组件提供状态。
* 16.8.0版本还引入了【效果钩子】这个新功能，按照官方文档的说法：
*       效果钩可以让你对函数组件执行副作用。
*       副作用的例子: 获取数据，设置订阅，手动改变React组件中的DOM...
* 效果函数【useEffect】实际上需要两个参数。第一个是一个函数，即effect本身
* 默认情况下，效果会在每次完成渲染后运行，但你可以选择只在某些值发生变化时启动它。
* useEffect的第二个参数用于指定效果的运行频率，
* 如果第二个参数是一个空的数组[]，那么效果就只在组件的第一次渲染时运行。
*
* 通常需要一个【 api-key 】来使用REST API服务。
* 不要把api-key保存到源码控制中!也不要在你的源代码中硬编码api-key！
* 而是使用一个环境变量来保存该密钥。比如应用该这样启动：
*   REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3 npm start // For Linux/macOS Bash
*   ($env:REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3) -and (npm start) // For Windows PowerShell
*   set REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3 && npm start // For Windows cmd.exe
* 可以从process.env对象中访问该键的值：
*   const api_key = process.env.REACT_APP_API_KEY
* 注意，如果你用npx create-react-app ...创建了应用，
* 那么环境变量的名字仍然必须以REACT_APP_开头。你也可以使用.env文件，
* 而不是每次都在命令行上定义它，方法是在项目的根部创建一个名为".env"的文件，
* 并加入以下内容：
*   # .env
*   REACT_APP_API_KEY=t0p53cr3t4p1k3yv4lu3
* 详情： https://fullstackopen.com/zh/part2/%E4%BB%8E%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE
*
* 存储在json-server后台的单个笔记可以通过对笔记的唯一URL进行HTTP请求，以两种不同方式进行修改。
* 我们可以用【HTTP PUT请求】来替换整个笔记，或者用【HTTP PATCH请求】只改变笔记的某些属性。
*
* 在添加了与后端服务器通信的代码后，App组件变得有些臃肿。
* 本着【单一责任原则】，我们认为将这种通信提取到自己的【模块】是明智的。
*
* */