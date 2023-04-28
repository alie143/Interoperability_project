const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const ubf_user_network_config = require('../models/ubf_user_network_config')
const router=express.Router()

router.get('/getconfig',async(req,res)=>{
    try{
         const ntw= await ubf_user_network_config.find()
         res.json(ntw)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})



router.post('/addconfig',async(req,res)=>{
    const tm=new ubf_user_network_config({
        
        setup_id:req.body.setup_id,
        user_id:req.body.user_id,
        environment_id:req.body.environment_id,
        node_id:req.body.node_id,
        hl_platform_version_id:req.body.hl_platform_version_id,
        consensus_id:req.body.consensus_id,
        updated_by:req.body.updated_by,
        updated_ts:req.body.updated_ts,
        alloted_ip:req.body.alloted_ip,
        
})
try{
    tm.save();
     res.send(tm);

}catch(err)
{ 
    res.send('error while posting')
}

})

module.exports=router