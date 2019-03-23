const Contact = require('../models/model')

async function getAllContacs(ctx){
    const {page, name, lastmame} = ctx.query
    const options = {
        page: page || 1,
        limit: 10
    }
    const contact = await Contact.paginate({}, options)
    console.log("Returning contacts")
    ctx.status = 200
    ctx.body = contact
}

async function getContact(ctx){
    try{
        const id = ctx.params.contactId
        console.log(id)
        const contact = await Contact.findById(id) //Manejar errores
        if(contact){
            ctx.status = 200
            ctx.body = contact
            console.log(contact)
        }else{
            ctx.status = 500
            ctx.body = "Error. No element was found"
            console.log("Contact not found")
        }
    }catch (err) {
        ctx.status = err.status || 500;
        ctx.app.emit('error', err, ctx);
    }
}

async function postContact(ctx){
    try{
        const clientContact = ctx.request.body
        let contact = new Contact(clientContact) //Verificar mutabilidad
        console.log(contact)
        const saveContact = await contact.save()
        ctx.status = 200
        console.log("Contact saved")
        ctx.body = saveContact
    }catch (err){
        ctx.body = "Error. Not a valid contact"
        ctx.status = err.status || 500
        ctx.app.emit('error', err, ctx)
    }
}

async function putContact(ctx){
    try{
        const id = ctx.params.contactId
        console.log(id)
        //Buscar y actualizar. Enviar ID y elementos a modificar contenidos en ctx.request.body
        const contact = await Contact.findByIdAndUpdate(id, ctx.request.body) //Método reemplazado
        ctx.body = contact
        ctx.status = 200
        console.log("Contact updated")
    }catch (err){
        ctx.body = "Error. Not a valid contact"
        ctx.status = err.status || 500
        ctx.app.emit('error', err, ctx)
    }
}

async function deleteContact(ctx){
    try{
        const id = ctx.params.contactId
        console.log(id)
        const contact = await Contact.findById(id)
        const deletedContact = await contact.remove() //Puede funcionar con FindByIdAndRemove
        ctx.body = deletedContact
        ctx.status = 200
        console.log("Contact deleted")
    }catch (err){
        ctx.body = "Error. Not a valid contact"
        ctx.status = err.status || 500
        ctx.app.emit('error', err, ctx)
    }
}

//Exportar métodos
module.exports={
    getAllContacs,
    getContact,
    postContact,
    putContact,
    deleteContact
}