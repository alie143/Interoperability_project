const fetch = require("node-fetch");
const interoperability_user = require("../moduls/interoperability_user");
const self_application = require("../moduls/self_application");
const {getuserPort} = require("../controller/interoperability_user"); 
const bcrypt = require("bcryptjs");// for encypt/dcypt password
const jwt= require("jsonwebtoken");
const crypto =require("crypto");


exports.insertselfapplication = async (req, res) => {

try {
  const {application_name,apidata,function_name,email}=req.body;

	console.log("req.body                                       "+JSON.stringify(req.body));
	  var alldata=[];

            var data = {
            template_type:apidata.template_type
       }
         
	var ipAddress = "";
	var key ="";
 var obj = {
email:email,
apidata:[]
     }
	var port="";

	 key = await bcrypt.hash(email+apidata.application_name+apidata.template_type,10);

     var Interoperability_user = await interoperability_user.find({email});
console.log("Interoperability_user "+JSON.stringify(Interoperability_user));	
              
     
        for(var i=0;i<Interoperability_user[0].application_data.length;i++){
		console.log(application_name+"   ::: "+Interoperability_user[0].application_data[i].application_name);
        if(apidata.application_name==Interoperability_user[0].application_data[i].application_name)
                 {

		 	 ipAddress = Interoperability_user[0].application_data[i].BC_ip_Address;
                         port = Interoperability_user[0].application_data[i].port;
                }
        }



     var  Self_application = await self_application.find({email});

	console.log("SElf application >>>>>>>>>>>>>>>>>>>>>>>>##########################"+JSON.stringify(Self_application));
             let response = await fetch('http://10.210.12.179:3005/functions/getapi', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
          body: JSON.stringify(data)

        });
       let responseJson = await response.json();

	
     var apidatalist=[];

    
     for(var i=0;i<responseJson.length;i++){

              
          for(var j=0;j<apidata.function_name.length;j++){
       if(responseJson[i].function_name==apidata.function_name[j]){
	        console.log("apidata  : "+apidata.function_name[j]+"\n");
       var newobj={
       function_name:responseJson[i].function_name,
       rest_api_type:responseJson[i].rest_api_type,
       api_url:responseJson[i].api_url,
       reqbody:responseJson[i].reqbody,
       resbody:responseJson[i].resbody,
       function_desc:responseJson[i].function_desc  

       }

      apidatalist[apidatalist.length]=newobj;
       }}}

//	console.log("new obj  : "+JSON.stringify(apidatalist)+"\n");

     alldata[alldata.length]={
      template_type:apidata.template_type,
      application_name:apidata.application_name,
      apidatalist:apidatalist,
      "BC_ipAddress":ipAddress,	     
      "port":port,	     
      "key":key,	     
     }

console.log("**************************************************IP ADRESS "+ipAddress);	
     if(Self_application.length==0){    
    obj.apidata[0]=alldata[0];
	     
var Self_application = await self_application.create(obj);
 await getuserPort(email,apidata.application_name);

	    // console.log("**************************************************"+JSON.stringify(alldata));
}else{
    var flag= false;
    for(var i=0;i<Self_application[0].apidata.length;i++){
        if(Self_application[0].apidata[i].template_type==apidata.template_type){
         flag = true;
        }
         
        if(flag==false){

	     console.log("false :"+JSON.stringify(alldata));	
            Self_application[0].apidata[Self_application[0].apidata.length]=alldata[0];
            var self_application_update = await self_application.updateMany(Self_application[0])
        }else{
//            res.send("allready present ");
        }
   
       }
}
     

     
res.status(200).json({
success: true,
token: Self_application
})
} catch (error) {
res.status(404).json({
success: false,
message: error
})
}

}

  exports.getapplicationname = async (req, res) => {
    try{

	    var listdata = [];
	    var data={
           "email":"",
           "application_name":"",		    
	    }
//	    console.log("application name");
	    const {template_type} = req.body; 
       const tmp= await self_application.find();
//	    var applicationname="";
	
         for(var j=0;j<tmp.length;j++){
                //  console.log("length : "+tmp[j].apidata.length);
      for(var i=0;i<tmp[j].apidata.length;i++){
	      console.log(tmp[j].apidata[i].application_name +"length : "+ tmp[j].email);
	      if(tmp[j].apidata[i].template_type==template_type){	      
            data.application_name = tmp[j].apidata[i].application_name;		   
            data.email = tmp[j].email;		      
		  //    break;
		     listdata[listdata.length]=data;
		      data={};
      }}
         }


console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,,, "+JSON.stringify(listdata));
	        res.json(listdata);
        



  }catch(err)

  {
      res.send("error"+err)
  }

  }




 exports.getdomainname= async (req, res) => {
 try{
console.log("domain name");
      const {application_name} = req.body;
          console.log("api call "+JSON.stringify(req.body));
       const tmp= await self_application.find({application_name})
//template_type
      var template_types=[];
	 console.log(JSON.stringify(tmp.length));
      for(var i=0;i<tmp[0].apidata.length;i++){ 
      template_types[template_types.length]=tmp[0].apidata[i].template_type;
      }  

//	 console.log("#########################################################3"+JSON.stringify(tmp));
        res.json(template_types);



  }catch(err)

  {
      res.send("error"+err)
  }

 }



 exports.getdomainnameall= async (req, res) => {
 try{

	 const email = req.body.email;
       const tmp= await self_application.find()

      var template_types=[];
         
        
//      for(var k=0;k<template_types.length;k++){
      for(var j=0;j<tmp.length;j++){			  
      for(var i=0;i<tmp[j].apidata.length;i++){
	      if(tmp[j].email!=email){
    template_types[template_types.length]=tmp[j].apidata[i].template_type;
              }}
      }
      
console.log(template_types);

	 var template=[];
 	   
      for(var i=0;i<template_types.length;i++){
	    
        if(template_types[i]!=template_types[i+1]){
		 template[template.length] = template_types[i];
	          continue ;
	}else{
   console.log(j+"i  ::: j"+template_types[j] );
    //     template[template.length] = template_types[i];
		//break;
	}

              }
      

  console.log("#########################################################3"+JSON.stringify(tmp));  

	// const result = tmp.filter((e)=>{if(e.email != email){return e}});

console.log("\n\n\n       RESULT &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& "+template);
        res.json(template);



  }catch(err)

  {
	  console.log("####################################333333"+err);
      res.send("error"+err)
  }

 }






 exports.getmethodname= async (req, res) => {
 try{
console.log("method name");
      const {application_name,email,template_type} = req.body;
          console.log("api call "+JSON.stringify(req.body));
       const tmp= await self_application.find({email})
     var method=[];
	 for(var i=0;i<tmp[0].apidata.length;i++){
         if(tmp[0].apidata[i].template_type==template_type && tmp[0].apidata[i].application_name==application_name)
		 {
                for(var j=0;j<tmp[0].apidata[i].apidatalist.length;j++){
	        var data = {
                   "method":"",
	           "description":""
		};
                data.method = tmp[0].apidata[i].apidatalist[j].function_name;
		data.description = tmp[0].apidata[i].apidatalist[j].function_desc;
			method[method.length]=data;
			data={};
		}
		 }
	 }

	 console.log("FUNCTION NAME?????????????????????? #####################################################"+JSON.stringify(method));
        res.json(method); 
  }catch(err)

  {
      res.send("error"+err)
  }

 }


// for validation 

exports.fetchapptemp = async (req, res) => {
  try {
    const {key} = req.body;
    var result = false;
    const temp = await self_application.find({ "apidata.key":key });
  
	  //	 console.log("#######################33"+JSON.stringify(temp[0].apidata)); 
	  for(var i=0;i<temp[0].apidata.length;i++)
          {		  
	  if(temp[0].apidata[i].key==key)
	  {
            result = true;
	  }
	  }

	  res.json(result);
  
  //  res.json(true);
  } catch (err) {
   // res.send("Error : ", err);
	  res.status(400).send(false);
  }
}

exports.fetchalldata = async (req, res)=>{
    try {
       const { email } = req.body;
       console.log("Email for self_application", email);
       const alldata = await self_application.find({ email });
       //const newalldata = alldata[0].apidata[0];
       console.log("All Data Type : ", typeof alldata);	    
       console.log("All Data of self_application : ", alldata);
       
       res.status(200).json(alldata);
    } catch (err){
      res.status(400).send(err); 
    }
}

