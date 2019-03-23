const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const koaBody = require('koa-body')
const json = require('koa-json')
const CtrlContact = require('../controllers/contactControllers')

const app = new Koa()

app.use(koaBody())
app.use(BodyParser())
app.use(json())

const router = new Router()

router.get('/api/contact', CtrlContact.getAllContacs)
router.get('/api/contact/:contactId', CtrlContact.getContact)
router.post('/api/contact', CtrlContact.postContact)
router.put('/api/putContact/:contactId', CtrlContact.putContact)
router.put('/api/deleteContact/:contactId', CtrlContact.deleteContact)

module.exports = router