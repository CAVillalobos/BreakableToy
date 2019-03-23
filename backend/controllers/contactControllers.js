const Contact = require('../models/model')

async function getAllContacs(ctx){
    const contact = await Contact.find({})
    ctx.body = contact
}

async function getContact(ctx){
    const id = ctx.params.ContactId
    console.log(id)
    const contact = await contact.findById(id)
    console.log(contact)
    ctx.body = contact
}

async function postContact(ctx){
    const clientContact = ctx.request.body
    let contact = new Contact(clientContact)
    console.log(contact)
    const saveContact = await contact.save()
    ctx.body = saveContact
}

async function putContact(ctx){
    const id = ctx.params.contactId
    console.log(id)
    //Buscar y actualizar. Enviar ID y elementos a modificar contenidos en ctx.request.body
    const contact = await Contact.findById(id, ctx.request.body)
    ctx.body = contact
}

async function deleteContact(ctx){
    const id = ctx.params.contactId
    console.log(id)
    const contact = await Contact.findById(id)
    const deletedContact = await contact.remove
    ctx.body = deletedContact
}

//Exportar métodos
module.exports={
    getAllContacs,
    getContact,
    postContact,
    putContact,
    deleteContact
}