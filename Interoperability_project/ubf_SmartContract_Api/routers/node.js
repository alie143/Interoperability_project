const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_node = require('../models/m_node')
const m_consensus= require('../models/m_node')
const router=express.Router()


//get data from table 
router.get('/getnode',async(req,res)=>{
    try{
         const mnode= await m_node.find()
         res.json(mnode)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

//get only environment name  from table 
router.get('/getonenode',async(req,res)=>{
    try{

         const nd= await m_node.find({},{node_type:1})
         console.log(nd)
         var arr = nd.map(e => e.node_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})


module.exports=router