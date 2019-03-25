const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateName = function (name) {
    var re = /^[a-z]+$/i;
    return re.test(name)
};


const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: false,
        required: true, //Cambiar a Boolean
        validate: [validateName, 'Please fill a Name'], //Verificar validación
        match: [/^[a-z]+$/i, 'Please fill a valid Name']
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        validate: [validateName, 'Please fill a valid last name'],
        match: [/^[a-z]+$/i, 'Please fill a valid LastName']
    },
    company: {
        type: String,
        trim: true,
        lowercase: true,
        sparse: true,
        validate: [validateName, 'Please fill a valid company name'],
        match: [/^[a-z]+$/i, 'Please fill a valid company company']
    },
    phone: {
        type: Number,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})
ContactSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('contact', ContactSchema)