const { request } = require('express')
const mongoose=require('mongoose')

const consensus=new mongoose.Schema({


    consensus_id:{
        type: String,
        required: true 
    },

    platform_id:{
        type: String,
        required: true
    },

    consensus_type:{
        type: String,
        required: true
    },

    consensus_desc:{
        type: String,
        required: true
    },

})

module.exports=mongoose.model('m_consensus',consensus)