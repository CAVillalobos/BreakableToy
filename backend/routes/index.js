/*const Koa = require('koa')
const BodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const json = require('koa-json')*/
const koaRouter = require('koa-router')
const CtrlContact = require('../controllers/contactControllers')

/*const app = new Koa()

app.use(koaBody())
app.use(BodyParser())
app.use(json())*/

const router = new koaRouter()

router.get('/api/contacts', CtrlContact.getAllContacs)
router.get('/api/contacts/:contactId', CtrlContact.getContact)
router.post('/api/contacts', CtrlContact.postContact)
router.put('/api/contacts/:contactId', CtrlContact.putContact)
router.delete('/api/contacts/:contactId', CtrlContact.deleteContact)

module.exports = router