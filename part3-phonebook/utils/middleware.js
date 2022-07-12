/*
* 自定义中间件已经被转移到一个新的utils/middleware.js模块:
* */
const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const requestLogger = (req, res, next) => {
    logger.info('Method:\t', req.method)
    logger.info('Path:\t', req.path)
    logger.info('Body:\t', req.body)
    logger.info('---')
    next()
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)
    if (err.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'})
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message})
    }
    next(err)
}

module.exports = {unknownEndpoint, requestLogger, errorHandler}