const fetch = require("node-fetch");
const user_application = require("../moduls/user_application");
const self_application = require("../moduls/self_application");
const interoperability_user = require("../moduls/interoperability_user");
const Exception = require('./Exception');
const interoperability_request = require("../moduls/interoperability_request");
//const  CatchAsyncError = require('./CatchAsyncError');
const CatchAsyncError = require("../midaleWare/CatchAsyncError");
const bcrypt = require("bcryptjs");// for encypt/dcypt password

const jwt = require("jsonwebtoken");

const crypto = require("crypto");



exports.insertselfapplication = CatchAsyncError(async (req, res, next) => {
  try {
    var obj = req.body;
    //   console.log(obj);
    const { application_name, email, sourceEmail, source_application_name, source_domain_name } = req.body;

    var Interoperability_user = await interoperability_user.find({ email });
    var User_getdata = await user_application.find({ email: sourceEmail });


    if (User_getdata.length != 0) {
      for (var i = 0; i < User_getdata.length; i++) {
        for (var j = 0; j < User_getdata[i].resdata.length; j++) {
          if (User_getdata[i].resdata[j].application_name == req.body.apidata.application_name) {
            throw new Exception("Duplicate data is available ");
          }
        }
      }
    }

    if (Interoperability_user == "") {

      throw new Exception("You are not Onbord in NBF ");
    }
    var Self_application = await self_application.find();

    const token = jwt.sign(
      { application_name: req.body.apidata.application_name, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE
      }
    );
    var ip = "";
    var port = "";	  
    //var encryptedemail = await bcrypt.hash(email, 10);
    for (var i = 0; i < Interoperability_user[0].application_data.length; i++) {
      if (Interoperability_user[0].application_data[i].application_name == obj.apidata.application_name) {
        ip = Interoperability_user[0].application_data[i].BC_ip_Address;
        port = Interoperability_user[0].application_data[i].port;

      }
    }


    var d = {
      "apidata": [],
      "application_name": req.body.apidata.application_name,
      "template_type": req.body.apidata.template_type,
      "destinationEmail": email,
      "status_app": "inprogress",
      "key": "",
      "ipAddress":ip,
      "port":port	    
    }

    var response = {
      "generic_api": "",
      "email": sourceEmail,
      "resdata": [],
      "source_application_name": obj.source_application_name,
      "source_domain_name": obj.source_domain_name,
   //   "ipAddress": ip,
      "application_ip_address": "gdgjsahg",
      "token": token
    }


    var method_name = [];

    for (var k = 0; k < Self_application.length; k++) {
   //   for (var l = 0; l < Self_application[k].apidata[i].apidatalist[j].function_name.length; l++) {
        for (var i = 0; i < Self_application[k].apidata.length; i++) {
          for (var j = 0; j < Self_application[k].apidata[i].apidatalist.length; j++) {
// added for loop
		  for (var l = 0; l < Self_application[k].apidata[i].apidatalist[j].function_name.length; l++) {

            var data = {
              "function_name": "",
              "data": "",
              "key": ""
            };


            if (obj.apidata.function_name[l] == Self_application[k].apidata[i].apidatalist[j].function_name && obj.apidata.application_name == Self_application[k].apidata[i].application_name) {
              data.function_name = Self_application[k].apidata[i].apidatalist[j].function_name;
              data.key = Self_application[k].apidata[i].key;
              d.key = Self_application[k].apidata[i].key;
              data.data = Self_application[k].apidata[i].apidatalist[j].reqbody;

              Self_application[k].apidata[i].apidatalist[j].reqbody = data;
              d.apidata[d.apidata.length] = Self_application[k].apidata[i].apidatalist[j];
              method_name[method_name.length] = Self_application[k].apidata[i].apidatalist[j].function_name;
            }
           
          
            data = {};

          }
        }
      }
    }
    console.log("KEY #############################"+data.key);

    if (User_getdata.length == 0) {
      response.resdata[response.resdata.length] = d;
      var User_application = await user_application.create(response);
    } else {
      User_getdata[0].resdata[User_getdata[0].resdata.length] = d;
      var User_application = await user_application.create(User_getdata[0]);
    }

	  

    var request = {
      "application_name": req.body.apidata.application_name,
      "template_type":req.body.apidata.template_type,	    
      "function_name": method_name,
      "status": "waiting",
      "email": email,
      "key": d.key,
      "remark": "",
      "sourceEmail": obj.sourceEmail,
      "source_application_name": obj.source_application_name,
      "source_domain_name": obj.source_domain_name,
    }



     var Get_Interoperability_request = await interoperability_request.find({email:email});
     
console.log("Get_Interoperability_request :: ###########################################3"+Get_Interoperability_request=={});
//    if (Get_Interoperability_request.length==0) {
 //    request.req_user_data[request.req_user_data.lengtih]=req_user_data;
      var Interoperability_request = await interoperability_request.create(request);
  // } else {
    //   Get_Interoperability_request[0].req_user_data[Get_Interoperability_request[0].req_user_data.length] = req_user_data;
    //  var Interoperability_request = await interoperability_request.create(Get_Interoperability_request[0]);
   // }
   

   


    res.status(200).json({
      success: true,
      data: 'success'
    })
  } catch (err) {

    console.log(err.message);
    res.status(400).json({
      status_is: false,
      message: err.message
    })
  }

})



exports.getdata = async (req, res) => {
  try {
    console.log("method name");
    const { email,application_name,template_type} = req.body;
    var data = {
      "function_name": "",
      "data": "",
      "key": ""
    };

    var response = {
      "generic_api": "http://10.210.12.179:5000/api/insert",
      "apidata": [],
      "status_app": "waitting",
      "key": ""
    }

var apidata=[];
   // console.log("api call " + JSON.stringify(req.body));
    const tmp = await user_application.find({email:email})
 //   console.log("DATA  " + JSON.stringify(tmp));
    for (var i = 0; i < tmp[0].resdata.length; i++) {
    
     
      	    console.log(application_name==tmp[0].resdata[i].application_name);
	  if(application_name==tmp[0].resdata[i].application_name && template_type == tmp[0].resdata[i].template_type)
	    {
		    
//                  console.log(application_name==tmp[0].resdata[i].application_name);
//		    console.log("APIDATA "+tmp[0].resdata[i]);
for (var j = 0; j < tmp[0].resdata[i].apidata.length; j++) {
		    apidata[j]=tmp[0].resdata[i].apidata[j];
		    console.log("APIDATA "+tmp[0].resdata[i].apidata[j]);
		    tmp[0].resdata[i].apidata[j].reqbody["application_name"]=application_name;
		    tmp[0].resdata[i].apidata[j].reqbody["template_type"]=tmp[0].resdata[i].template_type;
      apidata[j].reqbody =tmp[0].resdata[i].apidata[j].reqbody;

		    response.key=tmp[0].resdata[i].key;
        apidata[j].reqbody.data=JSON.parse(apidata[j].reqbody.data);
	  apidata[j].reqbody= JSON.stringify(apidata[j].reqbody);
   response.apidata[response.apidata.length] = apidata[j];
    }

    }
    }	  

	 


//	  console.log("#####################33 "+JSON.stringify(response))
//    response.key = key;
	  console.log("#####################33 "+JSON.stringify(response.apidata))
    res.status(200).json(response);

  } catch (err) {
    res.status(400).send(err);
  }

}





exports.fetchalldata = async (req, res) => {
  try {
	  const {methodname,key,application_name,template_type} = req.body;
    console.log("method name");

	  // const tmp = await user_application.find({"resdata.apidata.function_name":methodname,"resdata.key":key,"resdata.application_name":application_name,"resdata.template_type":template_type});

	  const tmp = await user_application.find({"resdata.apidata.function_name":methodname,"resdata.key":key,"resdata.application_name":application_name,"resdata.template_type":template_type});
    console.log("DATA  ..............................." + JSON.stringify(tmp));
    res.send(tmp);

  } catch (err) {
    res.status(400).send(err);
  }

}





exports.fetchInteroperabilityRequest = async (req, res) => {

  try {

    const { email, status } = req.body.data;
    console.log("Email & status from request *************************************************  : ", email, ",", status);
    console.log("Request body : ", email);
    console.log("tyoe of req body : " + typeof req.body);
    const requestData = await interoperability_request.find({ email: email, status: status });
    console.log("response from db : ", requestData);
    res.status(200).json(requestData);

  } catch (err) {

    res.send("Error in user_application : ", err);

  }
}





exports.networkMonitoring= async (req, res) => {
        try{
console.log("####################################################333"+req.body);
const key = req.body.key;
	var listd=[];
 var User_getdata = await user_application.find({ "resdata.key": key });
		for(var i=0;i<User_getdata[0].resdata.length;i++){
                    var vmdetails = {
                "ip":User_getdata[0].resdata[i].ipAddress,
                 "port":User_getdata[0].resdata[i].port
                }
                  listd[listd.length]=vmdetails;
			vmdetails={};
		}
	console.log("####################################################333"+JSON.stringify(User_getdata[0].resdata));
  res.status(200).json({
    success: true,
     data : listd

  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}














