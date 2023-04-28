const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_environment = require('../models/m_environment')
const router=express.Router()



//get data from table 
router.get('/getenvironment',async(req,res)=>{
    try{
         const environment= await m_environment.find()
         res.json(environment)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

/*
router.post('/addenv',async(req,res)=>{
    const environment=new m_environment({
        
        environment_id:req.body.environment_id,
        environment_type:req.body.environment_type
       
})
try{
    environment.save();
     res.send(environment);

}catch(err)
{ 
    res.send('error while posting')
}

})

*/

//get only environment name  from table 
router.get('/getoneenvironment',async(req,res)=>{
    try{

         const env= await m_environment.find({},{environment_type:1})
         console.log(env)
         var arr = env.map(e => e.environment_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

module.exports=router