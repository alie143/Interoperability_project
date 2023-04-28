const express = require('express');
var router = express();
const req = require('express/lib/request');
const res = require('express/lib/response');

router.post("/submitData", (req, res)=>{
     try{
        console.log("Mapping successfully...");
        let data = JSON.stringify(req.body);
        console.log("Data : ",data);
        res.send("Data submitted successfully...");
    }catch(error){
        console.log("error : ",error);
        res.send(error);
    }

});

module.exports = router;
