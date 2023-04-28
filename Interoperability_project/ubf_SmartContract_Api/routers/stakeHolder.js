const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_stake_holders = require('../models/m_stake_holders')

var MongoClient = require('mongodb').MongoClient;  
var url = 'mongodb://ubf:ubf@10.210.12.191:27017/master';  

const router=express.Router()


// //get data from table 
// router.get('/getstake',async(req,res)=>{
//     try{
//          const stakeHold= await m_stake_holders.find()
//          res.json(stakeHold)
 
//     }catch(err)
 
//     {
//         res.send("error"+err)
//     }
// })


 


//get only stakeholder name  from table 
router.get('/getonestake',async(req,res)=>{
    try{

         const stk= await m_stake_holders.find({},{stake_holder_type:1})
         console.log(stk)
         var arr = stk.map(e => e.stake_holder_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})



//getting stakeholder using template id 
router.get('/getonestake1',async(req,res)=>{
    try{
        var query={template_id:1}
         const stk= await m_stake_holders.find(query)
         console.log(stk)
        var arr = stk.map(e => e.stake_holder_type)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

//get stake by template

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("master");
//     var query = { template_id: "1" };
//     dbo.collection("m_stake_holders").find(query).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
//   });


/************************************************************************/
  router.get('/getonestake/:id',async(req,res)=>{
    try{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("master");
            var query = { template_id: parseInt(req.params.id) };
            dbo.collection("m_stake_holders").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              var arr = result.map(e => e.stake_holder_id+","+e.stake_holder_type)
              
                res.json(arr)
              db.close();
            });
          });
 
    }catch(err)
    {
        res.send("error"+err)
    }
})



/************get api url *********** */
router.get('/getapi/:id',async(req,res)=>{
  try{
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("master");
          var query = { function_id: parseInt(req.params.id) };
          dbo.collection("m_functions").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            var arr = result.map(e => e.api_url)
              res.json(arr)
            db.close();
          });
        });

  }catch(err)
  {
      res.send("error"+err)
  }
})



/***************get function desciption ************* */

router.get('/getdescription/:id',async(req,res)=>{
  try{
      MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("master");
          var query = { function_id: parseInt(req.params.id) };
          dbo.collection("m_functions").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            var arr = result.map(e => e.function_desc)
              res.json(arr)
            db.close();
          });
        });

  }catch(err)
  {
      res.send("error"+err)
  }
})


router.post('/getstakeholder',async(req,res)=>{
  try{
      const {application_name,template_type} = req.body;
       const tmp= await m_stake_holders.findOne({application_name,template_type})
       console.log(tmp.stake_holder_type);
      //  var arr = tmp.map(e => e.template_id+","+e.template_type)
       
      res.json(tmp.stake_holder_type);

       //res.consensus_type

  }catch(err)

  {
      res.send("error"+err)
  }
})
module.exports=router