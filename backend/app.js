const koa = require("koa")
const bodyParser = require("koa-bodyparser")
const koaBody = require('koa-body')
const cors = require('koa2-cors')
const app = new koa()
const router= require('./routes/index')
const json = require("koa-json")

app.use(koaBody())
app.use(bodyParser())
app.use(json())
app.use(cors())

app.use(router.routes())
    .use(router.allowedMethods())

module.exports = app