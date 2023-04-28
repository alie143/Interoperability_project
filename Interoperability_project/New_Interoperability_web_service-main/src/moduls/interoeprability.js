const mongoose=require('mongoose');
const bcrypt = require("bcryptjs");// for encypt/dcypt password
const jwt= require("jsonwebtoken");
const crypto =require("crypto");
const interoperability=new mongoose.Schema({


    applicationName:{
        type: String,
        required: true 
    },

    applicationDomain:{
        type: String,
        required: true
    },

    interoppApplicationName:{
        type:String,
        required:true
    },

    interoppApplicationDomain:{
        type:String,
        required:true
    },

    version:{
        type:String,
        require:true
    },

    exposingApi:{
        type:String,
        require:true
    },

    requestBody:{
        type:String,
        require:true
    },

    methodName:{
        type:String,
        require:true
    },
    interoperability_ID:{
        type:String,
        require:true
    }
})


interoperability.pre("save",async function(next){
if(!this.isModified("interoperability_ID")){
    console.log("pre save .....................");
next();
}
console.log("NOT   modified");
    this.interoperability_ID= await bcrypt.hash(this.interoperability_ID,10);
})

//JWT TOKEN 
interoperability.methods.getJWTToken= function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRE,
    })
};



// Compare Password

interoperability.methods.comparePassword = async function(interoperability_ID){
return await bcrypt.compare(interoperability_ID,this.interoperability_ID)

}


module.exports=mongoose.model('interoperability',interoperability)