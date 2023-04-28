const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const m_functions = require('../models/m_functions')
const router=express.Router()
const fs = require('fs');
//const admz = require('adm-zip')
var AdmZip = require("adm-zip")

const admzip = require('adm-zip')
 
const multer = require('multer')

const replace = require('replace-in-file');
var MongoClient = require('mongodb').MongoClient;  
var url = 'mongodb://ubf:ubf@10.210.12.191:27017/master'; 

//get data from table 
router.get('/getfunction',async(req,res)=>{
    try{
         const func= await m_functions.find()
         res.json(func)
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})

//get only environment name  from table 
router.get('/getonefunction',async(req,res)=>{
    try{

         const fun= await m_functions.find({},{function_name:1})
         console.log(fun)
         var arr = fun.map(e => e.function_name)
        res.json(arr)

         //res.consensus_type
 
    }catch(err)
 
    {
        res.send("error"+err)
    }
})



/****************fetch functionname according to stakeholder id (eg."upload certificate",
    "bulk upload certificate",
    "Count")*************/

router.get('/getonefunction/:id',async(req,res)=>{
    try{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("master");
            var query = { stake_holder_id: parseInt(req.params.id) };
            dbo.collection("m_functions").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              var arr = result.map(e =>e.function_id+","+e.function_name)
                res.json(arr)
              db.close();
            });
          });
 
    }catch(err)
    {
        res.send("error"+err)
    }
})



/***********************geting code related to previouse selector****************************/
var file_data;
router.get('/getonefunctiontype/:id',async(req,res)=>{
    try{
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("master");
            var query = { function_id: parseInt(req.params.id) };
            dbo.collection("m_functions").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              file_data = result.map(e => e.function_type)
                res.json(file_data)
                console.log("********************************\n"+file_data)
                 

              db.close();
            });
          });
 
    }catch(err)
    {
        res.send("error"+err)
    }

})



/**************when click on save button ************** */
router.get('/save',async(req,res)=>{
  try{
    fs.appendFile('/home/gandhali/Documents/certificateLogic.js', file_data.toString(), function (err) {
      if (err) throw err;
      console.log('data save to file successfully.');
      res.json(file_data)
    });

  }catch(err)

  {
      res.send("error"+err)
  }
})


/************replacing file content ************* */
router.get('/download',async(req,res)=>{
  try{
    
    ogfile='/home/user3/Documents/certificateLogic.js'
    replacementfile='/home/user3/Documents/CertificateLogic1.js'

    async function replaceContents(file, replacement, cb) {
      fs.readFile(replacement, (err, contents) => {
        if (err) return cb(err);
        fs.readFile(file, (error, cont) => {
          if (error) return cb(error);
          
          var result = contents.toString().replace(/\/\/Replace/g,cont );
           result = contents.toString().replace(/\/\/endline/g,cont );
          console.log(result)
          fs.writeFile(file, result, cb);
        })
      })
    }
      replaceContents(ogfile, replacementfile, err => {
        console.log(ogfile)
      if (err) {
        // handle errors here
        throw err;
      }
     // downloadZip()
     
/*******************downloding zip************************* */
       try{
        var zip = new AdmZip();

        // add file directly
        var content = "inner content of the file";
        // add local file
         zip.addLocalFile("/home/user3/Documents/certificateLogic.js");
       
        var willSendthis =  zip.toBuffer();
       
        zip.writeZip(/*target file name*/ "/home/user3/Documents/certificate.zip");
        
        const downloadName = `certificate.zip`;
        const data =  zip.toBuffer();
        //zip.writeZip(__dirname+"/"+downloadName);
        res.set('Content-Type','application/octet-stream');
            res.set('Content-Disposition',`attachment; filename=${downloadName}`);
            res.set('Content-Length',data.length);
            res.send(data);
       } catch(err)
       {
           res.send("error"+err)
       }
     
    });
   
    console.log('done');
   // res.send("file updated sucessfully")

  }catch(err)

  {
      res.send("error"+err)
  }
 })


 router.post('/getapi',async(req,res)=>{
  try{
	 
      const {template_type} = req.body;
	  console.log("api call "+JSON.stringify(req.body));
       const tmp= await m_functions.find({template_type})
     
       
     
       // console.log(tmp[i]);
        res.json(tmp);

       //res.consensus_type

  }catch(err)

  {
      res.send("error"+err)
  }
})


router.post('/getmethod',async(req,res)=>{
  try{

      const {template_type} = req.body;
         // console.log(template_type+"fuction .................................... "+JSON.stringify(req.body));
       const tmp= await m_functions.find({template_type})


var function_name=[];
      //  console.log(tmp);
	  for(var i=0;i<tmp.length;i++){
       // console.log(tmp[i].function_name);
		  function_name[function_name.length] = tmp[i].function_name;
	  }
	   //console.log(method_name);
        res.json(function_name);

       //res.consensus_type

  }catch(err)

  {
      res.send("error"+err)
  }
})


module.exports=router
