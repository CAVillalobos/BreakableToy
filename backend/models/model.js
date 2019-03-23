const mongoose = require('mongoose')

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const validateName = function(name) {
    var re = /^[a-z]+$/i;
    return re.test(name)
};


const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: false,
        required: 'Name is required',
        validate: [validateName, 'Please fill a Name'],
        match: [/^[a-z ,.'-]+$/i, 'Please fill a valid Name']
    },
    lastname: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'last Name is required',
        validate: [validateName, 'Please fill a valid last name'],
        match: [/^[a-z ,.'-]+$/i, 'Please fill a valid LastName']
    },
    company: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateName, 'Please fill a valid company name'],
        match: [/^[a-z ,.'-]+$/i, 'Please fill a valid Name company']
    } ,
    phone: {
        type:Number,
        unique: true},
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
})

module.exports= mongoose.model('contact', ContactSchema)