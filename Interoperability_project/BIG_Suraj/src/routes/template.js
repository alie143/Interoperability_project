const express= require("express");
const routes=express.Router();

const {midalware,network_monitor} = require("../internal_routing/apicall");
routes.route("/insert").post(midalware);
routes.route("/network_monitor").post(network_monitor);



module.exports=routes;

