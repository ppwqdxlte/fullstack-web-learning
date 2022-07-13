/*
* 我们实现的config模块与node-config包略有相似。编写我们自己的实现是合理的，
* 因为我们的应用很简单，同时也因为它给我们带来了宝贵的经验。
* 对环境变量的处理被提取到一个单独的utils/config.js文件中:
* */
require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URL = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URL
    : process.env.MONGODB_URL

module.exports = {PORT, MONGODB_URL}