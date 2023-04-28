const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router=express.Router()
const ubf_users = require('../models/ubf_users')

//get the data from user table 
router.get('/getuser',async(req,res)=>{
   try{
        const user= await ubf_users.find()
        res.json(user)

   }catch(err)

   {
       res.send("error"+err)
   }
    
    // console.log('get request')
    // res.send("get data");
})


//post the data to student table 
router.post('/adduser',async(req,res)=>{
    const ubf_users1=new ubf_users({
        
        user_id:req.body.user_id,
        cp_name:req.body.ep_name,
        user_name:req.body.user_name,
        password:req.body.password,
        contact_number:req.body.contact_number,
        address:req.body.address,
        email:req.body.email,
        is_phone_verified:req.body.is_phone_verified,
        is_email_verified:req.body.is_email_verified,
        registration_ts:req.body.registration_ts,
        status: req.body.status
})
try{
    ubf_users1.save();
     res.send(ubf_users1);

}catch(err)
{ 
    res.send('error while posting')
}

})


//get the data from user  using id table 
router.get('/getdatabyuserid/:user_id',async(req,res)=>{
    try{
         const u1= await ubf_users.findById(req.params.user_id)
         res.json(u1)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
     
     // console.log('get request')
     // res.send("get data");
 })




module.exports=router