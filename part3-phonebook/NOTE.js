/*
* express.json()这个json-parser就是所谓的【 中间件 】
* json-parser从请求中获取原始数据，这些数据存储在request对象中，
* 将其解析为一个JavaScript对象，并将其作为一个新的属性body分配给request对象。
* 在实践中，你可以同时使用 几个 中间件。
* 当你有多个中间件时，它们会按照在Express中被使用的顺序一个一个地被执行。
* 中间件不就相当于Java里的【 AOP思想的切面 】嘛！！！
* ###  中间件函数的调用顺序是它们被Express服务器对象的use方法所使用的顺序。
* ###  请注意，json-parser是在requestLogger中间件之前被使用的，
* ###  因为在执行记录器的时候，request.body将不会被初始化。
* 如果想让 中间件 在 路由方法 被调用前执行，就放在路由方法前面（字面意思代码顺序）。
* 如果想在路由之后定义中间件函数，中间件只有在没有路由处理HTTP请求时才会被调用。
*
* https://github.com/expressjs/morgan
* Morgan中间件，以后有需要再研究吧。
*
* 【同源策略】和【 CORS 】并不是专门针对 React 或 Node，它们实际上是网络应用操作的普遍原则。
* 可以通过使用 Node's【 cors 中间件】来允许来自其他原点的请求。
*   1.后端仓库中，安装： npm install cors
*   2.取中间件来使用，并允许来自所有源的请求。
*           const cors = require('cors')
*           app.use(cors())
*
* Lint:
*   ESlint作为开发依赖项安装到后端项目中:  npm install eslint --save-dev
*   用命令初始化一个默认的ESlint配置:     npx eslint --init
*   检查和验证像index.js:               npx eslint index.js
*   package.json添加便捷脚本:           "lint":"eslint ."
*   检查和验证像index.js:               npm run lint
*   根目录创建.eslintignore文件并添加:   build
* 除了从命令行执行linter之外，一个更好的选择是在编辑器中配置一个eslint-plugin,
* 但是我用的web Storms,本身静态检查非常方便，所以lint工具目前看不出啥优势。
*
* part4:  我们将继续我们在后台的工作。我们的第一大主题将是为后端编写单元和集成测试。
*           在我们完成测试后，我们将看看如何实现用户认证和授权。
*
* */