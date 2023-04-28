const { request } = require('express')
const mongoose=require('mongoose')

const platform=new mongoose.Schema({


    platform_id:{
        type: String,
        required: true 
    },

    platform_type:{
        type: String,
        required: true
    }

  

})

module.exports=mongoose.model('m_platform',platform)