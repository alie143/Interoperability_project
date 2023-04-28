const { request } = require('express')
const mongoose=require('mongoose')

const tmpl=new mongoose.Schema({


    template_id:{
        type: String,
        required: true 
    },

    template_type:{
        type: String,
        required: true
    }
  

})

module.exports=mongoose.model('m_templates',tmpl)