const fetch = require("node-fetch");
const interoperability_user = require("../moduls/interoperability_user");
const self_application = require("../moduls/self_application");

exports.insert = async (req, res) => {
        try{
const {email,data,platform,BC_ip_Address} = req.body;
		var obj={
     "email":email,
    "platform":platform,
    "BC_ip_Address":BC_ip_Address,
   "application_data":[data]
}
       	
 var Interoperability_user_data = await interoperability_user.find({email});
		console.log(Interoperability_user_data.length);
 var Interoperability_user;
if(Interoperability_user_data.length<1)
                {
			console.log("********************************************");
      Interoperability_user = await interoperability_user.create(obj);
//			 console.log( Interoperability_user );
                }else{
                          console.log( Interoperability_user_data[0].application_data );
                        Interoperability_user_data[0].application_data[Interoperability_user_data[0].application_data.length]=data;
                Interoperability_user = await interoperability_user.updateOne(Interoperability_user_data[0]);
              

		}



  res.status(200).json({
    success: true,
    result: Interoperability_user
  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}




exports.fetch= async (req, res) => {
        try{

		const {email} = req.body;
		console.log("email: "+email);
 var Interoperability_user = await interoperability_user.find({email});
var application_name=[];
for(var i=0;i<Interoperability_user[0].application_data.length;i++){
application_name[application_name.length]=Interoperability_user[0].application_data[i].application_name;
}


console.log(application_name);


  res.status(200).json({
    success: true,
     application_name:application_name

  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}









exports.fetchTemplate= async (req, res) => {
        try{

                const {email,application_name} = req.body;
                console.log("email: "+email);
 var Interoperability_user = await interoperability_user.find({email});
var template_type="";
for(var i=0;i<Interoperability_user[0].application_data.length;i++){
      if(Interoperability_user[0].application_data[i].application_name==application_name){
      template_type=Interoperability_user[0].application_data[i].template_type;
	      break ;
      }

}


console.log(template_type);


  res.status(200).json({
    success: true,
     template_type:template_type

  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}



exports.getalldata= async (req, res) => {
        try{

               
 var Interoperability_user = await interoperability_user.find();

  res.status(200).json({
    success: true,
     Interoperability_user:Interoperability_user

  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}


exports.getuserPort= async (email,application_name) => {
      console.log("*********................................................................................................*********");
 var Self_application = await self_application.find({email});
//Interoperability_user = await interoperability_user.create(obj);
//  console.log("interoprrability.........................user"+JSON.stringify(Self_application[0].apidata));
     for(var i=0;i<Self_application[0].apidata.length;i++){
	     var app = Self_application[0].apidata[i].application_name;
console.log("equlas "+ app.length +"=="+application_name.length);
     if(Self_application[0].apidata[i].application_name==application_name){
//console.log("if block is running"+JSON.stringify(Self_application[0].apidata[i]));
	     var str = Self_application[0].apidata[i].apidatalist[0].api_url;
	     var string = str.split(":");
	     var port_str = string[2].split("/");
	     var port = port_str[0];
    console.log("interoprrability.........................user"+port);
var Interoperability_user = await interoperability_user.find({email});
	 //    console.log("interoprrability.........................user"+Interoperability_user[0]);
     }
     }    
for(var i=0;i<Interoperability_user[0].application_data.length;i++)
{
if(Interoperability_user[0].application_data[i].application_name==application_name){
Interoperability_user[0].application_data[i]["port"]=port;

	const updateDocument = {
   $set: {
      port: port,
   },
};
 console.log("interoprrability.........................user"+Interoperability_user[0]);	
	try{
		const filter = { _id: Interoperability_user[0]._id };

      //await interoperability_user.updateMany(Interoperability_user[0]);;
		await interoperability_user.updateOne(filter,Interoperability_user[0]);
	}catch(e)
	{
console.log("error "+e);
	}
	}
 }

    return "done";
}



exports.networkMonitoring= async (req, res) => {
        try{
console.log("####################################################333"+req.body);		
const email = req.body.email;
 var Interoperability_user = await interoperability_user.find({email});
  res.status(200).json({
    success: true,
     Interoperability_user:Interoperability_user

  })
        }catch(err){
                console.log(err);
            res.status(304).json({
    success: false,
    error: err
  })
        }

}















