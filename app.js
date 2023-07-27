require("dotenv").config()
const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const { koaBody } = require('koa-body');    //引入koa-body
const helmet = require("koa-helmet")

const { loggerMiddleware } = require("./middlewares/logger")
const { responseHandler, errorHandler } = require("./middlewares/response")

const app = new Koa()

app.use(loggerMiddleware)

// Error Handler
app.use(errorHandler)

// middlewares
// koa-bodyparser接受不到body，改用koa-body，并且使用form-data格式
// app.use(bodyParser())

app.use(
    koaBody({
        multipart: true,    //解析多个文件
    })
)

app.use(helmet())

// routers
const indexRouter = require("./routes/index")
const dataRouter = require("./routes/data")

app.use(indexRouter.routes(), indexRouter.allowedMethods())
app.use(dataRouter.routes(), dataRouter.allowedMethods())

// Response
app.use(responseHandler)

module.exports = app
