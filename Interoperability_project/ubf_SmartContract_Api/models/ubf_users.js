const { request } = require('express')
const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({


    user_id:{
        type: String,
        required: true 
    },

    cp_name:{
        type: String,
        required: true
    },

    user_name:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },


    contact_number:{
        type: String,
        required: true
    },


    address:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },


    is_phone_verified:{
        type: String,
        required: true
    },

    is_email_verified:{
        type: String,
        required: true
    },

    registration_ts:{
        type: String,
        required: true
    },

    status:{
        type: String,
        required: true
    },

})

module.exports=mongoose.model('ubf_users',userSchema)