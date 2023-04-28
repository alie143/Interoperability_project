
const express= require("express");
const routes=express.Router();
const {insert,fetch,fetchTemplate,getalldata,networkMonitoring} = require("../controller/interoperability_user");
routes.route("/user/insert").post(insert);
routes.route("/user/fetch").post(fetch);
routes.route("/user/fetch/template").post(fetchTemplate);
routes.route("/user/fetchalldata").post(getalldata);
routes.route("/user/network").post(networkMonitoring);

module.exports=routes;
