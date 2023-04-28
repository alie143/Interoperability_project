const express = require("express");
const template = require("./moduls/m_templates");
const axios = require('axios');
const resttemp = require("../src/controller/template_c");
const app = express();
var cors = require('cors');
const { json } = require("body-parser");
app.use(cors('*'))
var request = require("request");
app.use(express.json());
var routes = require("../src/routes/interoperabilityRoutes");
app.use("/inter",routes);
var routes = require("../src/routes/self_application");
app.use("/selfapp",routes);
var routes = require("../src/routes/user_application");
app.use("/userapp",routes);

var routes = require("../src/routes/interoperability_user");
app.use("/app",routes);
var routes = require("../src/routes/interoperability_request");
app.use("/api",routes);

var routes = require("../src/routes/user_application");
app.use("/request",routes);

const midalware=require("../src/midaleWare/error")
app.use(midalware);


app.post("/interoperability", async (req, res) => {

    try {


        var data = req.body.data;

        var urlparam = req.body.methodName;
	
        var url = `http://10.210.12.30:3002/${urlparam}`;

        var newd = await resttemp.getData(data, url);
        res.send(newd);
    } catch (err) {
        res.send("error" + err)
    }

})


module.exports = app
