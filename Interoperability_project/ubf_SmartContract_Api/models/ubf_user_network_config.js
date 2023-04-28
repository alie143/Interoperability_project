const { request } = require('express')
const mongoose=require('mongoose')

const uconfig=new mongoose.Schema({


    setup_id:{
        type: String,
        required: true 
    },

    user_id:{
        type: String,
        required: true
    },
  

    environment_id:{
        type: String,
        required: true
    },


    node_id:{
        type: String,
        required: true
    },


    hl_platform_version_id:{
        type: String,
        required: true
    },


    consensus_id:{
        type: String,
        required: true
    },

    updated_by:{
        type: String,
        required: true
    },


    updated_ts:{
        type: String,
        required: true
    },


    alloted_ip:{
        type: String,
        required: true
    },


})

module.exports=mongoose.model('ubf_user_network_config',uconfig)