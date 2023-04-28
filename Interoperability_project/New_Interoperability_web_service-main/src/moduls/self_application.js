const mongoose=require('mongoose');
const self_application=new mongoose.Schema({

     email:{
      type:String,
       require:true,
      unique:true	     
     },
    ipAddress:{
     type:String,
     require:true	    
    },
    apidata:{
     type:Array,
     require:true	    
    },
   blockchain_ip_address:{
     type:String,
     require:true
    }	
})

module.exports=mongoose.model('self_application',self_application)
