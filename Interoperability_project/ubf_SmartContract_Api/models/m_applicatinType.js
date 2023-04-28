const mongoose=require('mongoose');

const applicationType=new mongoose.Schema({


   applicationName:{
       type:String,
       require:true
   }

})

module.exports=mongoose.model('applicationType',applicationType)