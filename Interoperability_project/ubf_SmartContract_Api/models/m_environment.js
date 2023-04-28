const { request } = require('express')
const mongoose=require('mongoose')

const environment=new mongoose.Schema({


    environment_id:{
        type: String,
        required: true 
    },

    environment_type:{
        type: String,
        required: true
    }

    
})

module.exports=mongoose.model('m_environment',environment)