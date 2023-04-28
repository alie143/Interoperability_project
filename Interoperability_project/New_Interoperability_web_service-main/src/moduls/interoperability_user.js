const mongoose=require('mongoose');
const interoperability_user=new mongoose.Schema({

     email:{
      type:String,
       require:true,
      unique:true
     },
    platform:{
        type: String,
        require: true ,
    },

    BC_ip_Address:{
     type:String,
     require:true
    },
    application_data:{
     type:Array,
     require:true
    }
})

module.exports=mongoose.model('interoperability_user',interoperability_user)
