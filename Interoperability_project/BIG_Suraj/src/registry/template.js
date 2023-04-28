const fetch = require("node-fetch");

exports.fetchdata = async (function_name, key,domain_name,application_name ) => {
   try {
     // consiole.log(methodname);

      var data_res = {
         "result": {},
         "ip": ""
      }

      var data = {
         "methodname": function_name,
	 "key":key,
	 "template_type":domain_name,
	 "application_name":application_name     
      }
	//    console.log("RESPONSE **************************************"+JSON.stringify(data));

      let response = await fetch("http://10.210.12.179:4000/userapp/fetchalldata", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
	 body: JSON.stringify(data)     
	      
      });

      let responseJson = await response.json();

//	   console.log("RESPONSE **************************************"+responseJson);
      for (var i = 0; i < responseJson.length; i++) {
	      for (var k = 0; k < responseJson[i].resdata.length; k++) {
         for (var j = 0; j < responseJson[i].resdata[k].apidata.length; j++) {
            if (data.methodname == responseJson[i].resdata[k].apidata[j].function_name) {
               console.log("reqdata " + responseJson[i].resdata[k].apidata[j]);
               data_res.result = responseJson[i].resdata[k].apidata[j];
               data_res.ip = responseJson[i].resdata[k].ipAddress;
            }
         }}
      }



      console.log("********************************i****** API **************************************" + data_res.ip);
      return data_res;
   } catch (error) {
      console.log(error);
   }


}


exports.monitor = async (key) => {
   try {
      

      var data = {
         "key": key
      }
      let response = await fetch("http://10.210.12.179:4000/userapp/network", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
	 body: JSON.stringify(data)     
      });
      let responseJson = await response.json();
	   var list =[];

	   for(var i=0;i<responseJson.data.length;i++){
		   
		   list[list.length]={
            service : "redis_local",
            address : responseJson.data[i].ip,
            port    : responseJson.data[i].port,
            timeout : 1000,
            attempts: 1
		   }
		   
	   }
		   return list;
   } catch (error) {
      console.log(error);
   }


}





exports.networkMonitoring = async (sourceEmail) => {
   try {
      

      var data = {
         "sourceEmail": sourceEmail
      }

      let response = await fetch("http://10.210.12.179:4000/api/status", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
	 body: JSON.stringify(data)     
      });

      let responseJson = await response.json();
	   var list =[];

	   for(var i=0;i<responseJson.Interoperability_user[0].application_data.length;i++){
		   if(responseJson.Interoperability_user[0].application_data[i].application_name==application_name){
     console.log("responseJson network monitor .............................."+JSON.stringify(responseJson.Interoperability_user[0].application_data[i]));	   
		   
		   list[list.length]={
            service : "redis_local",
            address : responseJson.Interoperability_user[0].application_data[i].BC_ip_Address,
            port    : responseJson.Interoperability_user[0].application_data[i].port,
            timeout : 1000,
            attempts: 1
		   }
		   }
	   }
         	   console.log("Response from network monitoring : "+responseJson);
		   return responseJson;
   } catch (error) {
      console.log(error);
   }


}


