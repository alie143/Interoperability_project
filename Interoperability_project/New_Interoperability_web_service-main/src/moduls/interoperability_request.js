const mongoose=require('mongoose');
const interoperability_request=new mongoose.Schema({

	application_name:{
	type:String,
     require:true
	},
       template_type:{
       type:String,
     require:true
       },	
      function_name: {
	      type:Array,
     require:true
      },
      status:{
	type:String,
     require:true      
      },
      email:{
     type:String,
     require:true
      },
      key:{
     type:String,
     require:true
      },
      remark:{
       type:String,
     require:true
	},
    sourceEmail:{
     type:String,
     require:true	    
    },
    source_application_name:{
     type:String,
     require:true
    },
    source_domain_name:{
     type:String,
     require:true
    },	
    token: { type: String },
	
})

module.exports=mongoose.model('interoperability_request',interoperability_request)

