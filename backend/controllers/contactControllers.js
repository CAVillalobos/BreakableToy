const Contact = require('../models/model')

async function getAllContacs(ctx){
    const {page, name, lastName} = ctx.query
    const options = {
        page: page || 1,
        limit: 10
    }
    const query = {};

    if (name || lastName) {
        query.$and = [];
        name && query.$and.push({ name: new RegExp(name, 'i') });
        lastName && query.$and.push({ lastName: new RegExp(lastName, 'i') });
    }
    const contact = await Contact.paginate(query, options)
    if(contact){
        console.log("Returning contacts")
        ctx.status = 200
        ctx.body = contact
    }else{
        console.log("No contacts found")
        ctx.status = 404
        ctx.body = {
            error: "Error. No contacts found",
        }
    }
}

async function getContact(ctx){
    const id = ctx.params.contactId
    try{
        console.log(id)
        const contact = await Contact.findById(id) //Manejar errores
        if(contact){
            ctx.status = 200
            ctx.body = contact
            console.log(contact)
        }else{
            ctx.status = 404
            ctx.body = {
                error: "Error. No element was found",
                id: id
            }
            console.log("Contact not found")
        }
    }catch (err) {
        ctx.status = err.status || 404;
    }
}

async function postContact(ctx){
    const contact = new Contact(ctx.request.body) //Verificar mutabilidad
    try{
        console.log(contact)
        const saveContact = await contact.save()
        ctx.status = 200
        console.log("Contact saved")
        ctx.body = saveContact
    }catch (err){
        ctx.body = {
            error: "Error. Not a valid contact",
            contact
        }
        ctx.status = err.status || 400
    }
}

async function putContact(ctx){
    const id = ctx.params.contactId
    console.log(id)
    try{
        //Buscar y actualizar. Enviar ID y elementos a modificar contenidos en ctx.request.body
        const contact = await Contact.findByIdAndUpdate(id, ctx.request.body) //Método reemplazado
        ctx.body = contact
        ctx.status = 200
        console.log("Contact updated")
    }catch (err){
        const clientContact = ctx.request.body
        ctx.body = {
            error: "Error. Not a valid contact",
            id: id,
            clientContact
        }
        ctx.status = err.status || 400
    }
}

async function deleteContact(ctx){
    const id = ctx.params.contactId
    try{
        console.log(id)
        const contact = await Contact.findById(id)
        const deletedContact = await contact.remove() //Puede funcionar con FindByIdAndRemove
        ctx.body = deletedContact
        ctx.status = 200
        console.log("Contact deleted")
    }catch (err){
        ctx.body = {
            error: "Error. Not a valid contact",
            doc: {
                id: id
            }
        }
        ctx.status = err.status || 404
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