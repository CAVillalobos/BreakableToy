const Contact = require('../models/model')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateName = function (name) {
    var re = /^[a-z]+$/i;
    return re.test(name)
};

async function getAllContacs(ctx) {
    const { page, name, lastName } = ctx.query
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
    if (contact) {
        console.log("Returning contacts " + getTime())
        ctx.status = 200
        ctx.body = contact
    } else {
        console.log("No contacts found " + getTime())
        ctx.status = 404
        ctx.body = {
            msg: "Error. No contacts found",
        }
    }
}

async function getContact(ctx) {
    const id = ctx.params.contactId
    try {
        console.log(id)
        const contact = await Contact.findById(id) //Manejar errores
        if (contact) {
            ctx.status = 200
            ctx.body = {
                msg: "Contact found",
                contact
            }
            console.log(contact)
        } else {
            ctx.status = 404
            ctx.body = {
                msg: "Error. No element was found",
                id: id
            }
            console.log("Contact not found " + getTime())
        }
    } catch (err) {
        ctx.status = err.status || 404;
    }
}

async function postContact(ctx) {
    const contact = new Contact(ctx.request.body) //Verificar mutabilidad
    try {
        console.log(contact)
        const saveContact = await contact.save()
        ctx.status = 200
        console.log("Contact saved " + getTime())
        ctx.body = {
            msg: "Contact saved",
            saveContact
        }
    } catch (err) {
        console.log("Couldn't save contact " + getTime())
        ctx.body = {
            msg: "Error. Not a valid contact",
            details: err,
            contact
        }
        ctx.status = err.status || 400
    }
}

async function putContact(ctx) {
    const id = ctx.params.contactId
    console.log(id)
    try {
        if (
            validateName(ctx.request.body.name) &&
            validateName(ctx.request.body.lastName) &&
            validateEmail(ctx.request.body.email)) {
            //Buscar y actualizar. Enviar ID y elementos a modificar contenidos en ctx.request.body
            const contact = await Contact.findByIdAndUpdate(id, ctx.request.body) //Método reemplazado
            ctx.body = {
                msg: "Contact updated",
                contact
            }
            ctx.status = 200
            console.log("Contact updated " + getTime())
        } else {
            ctx.body = {
                msg: "Not valid data",
                details: err,
                id: id,
                clientContact
            }
            ctx.status = 406
        }
    } catch (err) {
        console.log("Couldn't update contact " + getTime())
        const clientContact = ctx.request.body
        ctx.body = {
            msg: "Not a valid contact",
            details: err,
            id: id,
            clientContact
        }
        ctx.status = err.status || 400
    }
}

async function deleteContact(ctx) {
    const id = ctx.params.contactId
    try {
        console.log(id)
        const contact = await Contact.findById(id)
        const deletedContact = await contact.remove() //Puede funcionar con FindByIdAndRemove
        ctx.body = {
            msg: "Contact removed",
            deletedContact
        }
        ctx.status = 200
        console.log("Contact deleted " + getTime())
    } catch (err) {
        console.log("Couldn't find contact " + getTime())
        ctx.body = {
            msg: "Error. Not a valid contact",
            details: err,
            id: id
        }
        ctx.status = err.status || 404
    }
}

function getTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
}

//Exportar métodos
module.exports = {
    getAllContacs,
    getContact,
    postContact,
    putContact,
    deleteContact
}