const express= require("express");
const routes=express.Router();
const {getInterOperability,insertInterOperability} = require("../controller/interOperability_c");
// routes.route("/",inter).post(getInterOperability);
routes.route("/getData").get(getInterOperability);
routes.route("/insert").post(insertInterOperability);
module.exports=routes;