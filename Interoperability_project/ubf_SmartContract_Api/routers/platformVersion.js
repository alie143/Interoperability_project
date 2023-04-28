const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_hl_platform_version = require('../models/m_hl_platform_version')
const m_functions = require('../models/m_hl_platform_version')
const router=express.Router()

//get data from table 
router.get('/getversion',async(req,res)=>{
    try{
         const version= await m_hl_platform_version.find()
         res.json(version)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})


//get only environment name  from table 
router.get('/getoneplatformversion',async(req,res)=>{
    try{

         const plt= await m_hl_platform_version.find({},{version:1})
         console.log(plt)
         var arr = plt.map(e => e.version)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

       



module.exports=router