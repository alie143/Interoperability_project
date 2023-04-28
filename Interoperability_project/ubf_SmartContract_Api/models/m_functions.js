const { request } = require('express')
const mongoose=require('mongoose')

const functions=new mongoose.Schema({


    function_id:{
        type: Number,
        require: true ,
        unique:true
    },

    stake_holder_id:{
        type: Number,
        require: true
    },
   	

    function_name:{
        type: String,
        require: true
    },

    function_type:{
        type: String,
        require: true
    },

    function_desc:{
        type: String,
        require: true
    },
      rest_api_type:{
        type: String,
        required: true
    },	
    api_url:{
        type: String,
        require: true
    },

    version_id:{
        type: Number,
        require: true
    },
     template_type:{
        type:String,
        require:true
    },	

    reqbody:{type: String,
        require: true},

    resbody:{type: String,
        require: true}
})


module.exports=mongoose.model('m_functions',functions)
