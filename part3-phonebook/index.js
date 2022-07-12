/*
* 用于启动应用的index.js文件的内容被简化如下:
* */
const app = require('./app') // 实际上的Express应用
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT,()=>{
    logger.info(`Server running on port ${config.PORT}`)
})