const { request } = require('express')
const mongoose=require('mongoose')

const stake=new mongoose.Schema({


    // stake_holder_id:{
    //     type: String,
    //     required: true 
    // },

    // template_id:{
    //     type: String,
    //     required: true
    // },

    template_type:{
        type:String,
        require:true
    },
    application_name:{
     type:String,
     require:true
    },
    stake_holder_type:{
        type: Array,
        required: true 
    },
    version:{
        type:Number,
        require:true
    },
    language:{
        type:String,
        require:true

    }
  

})

module.exports=mongoose.model('m_stake_holders',stake)