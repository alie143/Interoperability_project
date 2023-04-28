const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_consensus= require('../models/m_consensus')
const router=express.Router()


//get data from table 
/*router.get('/getconsensus',async(req,res)=>{
    try{
         const consensus= await m_consensus.find()
         res.json(consensus)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})*/


//get only consensus name  from table 
router.get('/getoneconsensus',async(req,res)=>{
    try{

         const consensus= await m_consensus.find({},{consensus_type:1})
         console.log(consensus)
         var arr = consensus.map(e => e.consensus_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

module.exports=router