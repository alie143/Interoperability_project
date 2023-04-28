const express = require('express');
var router = express();
const cors = require('cors');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(express.json());
router.use(cors('*'));
const controllerObj = require('./Controller');

router.use("/Controller", controllerObj);

router.listen(5000, ()=>{
   console.log("Server is listening on port 5000..."); 
})
