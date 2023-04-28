const express = require("express");
//const template = require("./modules/m_templates");
const axios = require('axios');
//const resttemp = require("../src/controller/template_c");
const app = express();
//var routes = require("../src/routes/template");
//app.use("/api",routes);
var cors = require('cors');
const { json } = require("body-parser");
app.use(cors('*'))
var request = require("request");
app.use(express.json());
var routes = require("../src/routes/template");
app.use("/api",routes);


module.exports = app

