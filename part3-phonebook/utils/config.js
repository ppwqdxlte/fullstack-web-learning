/*
* 对环境变量的处理被提取到一个单独的utils/config.js文件中:
* */
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL

module.exports = {PORT, MONGODB_URL}