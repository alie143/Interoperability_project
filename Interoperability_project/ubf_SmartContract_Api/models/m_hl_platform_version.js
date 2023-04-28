const { request } = require('express')
const mongoose=require('mongoose')

const platformVersion=new mongoose.Schema({


    hl_platform_version_id:{
        type: String,
        required: true 
    },

    platform_id:{
        type: String,
        required: true
    },

    version:{
        type: String,
        required: true
    }
})

module.exports=mongoose.model('m_hl_platform_version',platformVersion)