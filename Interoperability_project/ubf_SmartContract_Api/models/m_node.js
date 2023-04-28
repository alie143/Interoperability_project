const { request } = require('express')
const mongoose=require('mongoose')

const node=new mongoose.Schema({


    node_id:{
        type: String,
        required: true 
    },

    node_type:{
        type: String,
        required: true
    }

  

})

module.exports=mongoose.model('m_node',node)