const mongoose=require('mongoose');
const user_application=new mongoose.Schema({

     email:{
      type:String,
       required:true,
     },
    
    source_application_name:{
      type:String,
      require:true
    },
    source_domain_name:{
      type:String,
      require:true
    },
    resdata:{
     type:Array,
     require:true
    },
   application_ip_address:{
     type:String,
     require:true
    },
   token: { type: String },
	
})

module.exports=mongoose.model('user_application',user_application)

