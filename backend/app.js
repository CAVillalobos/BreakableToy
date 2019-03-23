const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const koaBody = require('koa-body');
const app = new koa();
const router= require('./routes/index')
const json = require("koa-json");

app.use(koaBody());
app.use(bodyParser());
app.use(json());

app.use(router.routes())
    .use(router.allowedMethods())

module.exports = app, router