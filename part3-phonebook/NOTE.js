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
* */