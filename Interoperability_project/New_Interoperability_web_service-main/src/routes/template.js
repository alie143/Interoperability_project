const express= require("express");
const routes=express.Router();
const {getDomain} = require("../controller/template_c");
routes.route("/",template).get(getDomain);