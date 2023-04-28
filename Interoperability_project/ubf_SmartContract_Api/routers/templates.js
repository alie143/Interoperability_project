const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_templates=require('../models/m_templates')
const router=express.Router()

router.get('/gettmp',async(req,res)=>{
    try{
         const tmplt= await m_templates.find()
         res.json(tmplt)
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

router.post('/gettemplate',async(req,res)=>{
    try{
        
       var template_type=[];
         const tmplt= await m_templates.find();
	    for(var i=0;i<tmplt.length;i++){
	    template_type[template_type.length]=tmplt[i].template_type;
	    }
         console.log(template_type);
         res.json(template_type)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})


router.get('/getapplicationname',async(req,res)=>{
    try{
         const tmplt= await m_templates.find();
         var newd =[];
         tmplt.forEach(element => {
             if(element.application_name!=null){
             newd[newd.length]=element.application_name;
             }
         });
         console.log("template"+newd);
         res.json(newd);
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})


/*
router.post('/addtem',async(req,res)=>{
    const tm=new m_templates({
        
        template_id:req.body.template_id,
        template_type:req.body.template_type
       
})
try{
    tm.save();
     res.send(tm);

}catch(err)
{ 
    res.send('error while posting')
}

})
*/

//get only template name  from table 
router.get('/getonetemplate',async(req,res)=>{
    try{
         
         const tmp= await m_templates.find({},{template_type:1,template_id:1})
         console.log(tmp)
         var arr = tmp.map(e => e.template_id+","+e.template_type)
         
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})





router.post('/getversion',async(req,res)=>{
    try{
        const {application_name,template_type} = req.body;
         const tmp= await m_templates.findOne({application_name,template_type})
         console.log(tmp.version);
        //  var arr = tmp.map(e => e.template_id+","+e.template_type)
         
        res.json(tmp.version);

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

module.exports=router
