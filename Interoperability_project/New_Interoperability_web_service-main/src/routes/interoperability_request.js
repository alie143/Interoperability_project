
const express= require("express");
const routes=express.Router();
const {updatestatus,changestatus,requestcount} = require("../controller/interoperability_request");
routes.route("/status").post(updatestatus);
routes.route("/change").put(changestatus);
//routes.route("/remark").put(updateremark);
routes.route("/count").post(requestcount);
module.exports=routes;

