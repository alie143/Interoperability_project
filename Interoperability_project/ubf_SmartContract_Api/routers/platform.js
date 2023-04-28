const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_platform = require('../models/m_platform')
const router=express.Router()


//get data from table 
router.get('/getplatform',async(req,res)=>{
    try{
         const platform= await m_platform.find()
         res.json(platform)
 
    }catch(err)
    {
        res.send("error"+err)
    }
})



router.post('/addplat',async(req,res)=>{
    const plt=new m_platform({
        
        platform_id:req.body.platform_id,
        platform_type:req.body.platform_type
       
})
try{
    plt.save();
     res.send(plt);

}catch(err)
{ 
    res.send('error while posting')
}

})


//get only environment name  from table 
router.get('/getoneplatform',async(req,res)=>{
    try{

         const plt= await m_platform.find({},{platform_type:1})
         console.log(plt)
         var arr = plt.map(e => e.platform_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

module.exports=router