/*
* 到目前为止，我们一直使用console.log和console.error来打印代码中的不同信息。
* 然而，这并不是一个很好的方法。让我们把所有打印到控制台的工作分离到自己的模块utils/logger.js。
*
* 将日志提取到自己的模块中是一个好主意，而且不止一个方面:
* 如果我们想开始将日志写入文件或将它们发送到外部日志服务，
* 如 graylog 或 papertrail 我们只需要在一个地方进行修改。
* */
const info = (...params) => {
    console.log(...params)
}
const error = (...params) => {
    console.error(...params)
}
module.exports = {info, error}