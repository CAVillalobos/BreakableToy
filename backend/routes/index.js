const koaRouter = require('koa-router')
const CtrlContact = require('../controllers/contactControllers')

const router = new koaRouter()

router.get('/api/contacts', CtrlContact.getAllContacs)
router.get('/api/contacts/:contactId', CtrlContact.getContact)
router.post('/api/contacts', CtrlContact.postContact)
router.put('/api/contacts/:contactId', CtrlContact.putContact)
router.delete('/api/contacts/:contactId', CtrlContact.deleteContact)

module.exports = router