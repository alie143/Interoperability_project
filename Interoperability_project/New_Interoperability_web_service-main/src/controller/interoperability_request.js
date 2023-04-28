const interoperability_request = require("../moduls/interoperability_request");
exports.updatestatus = async (req,res)=>{

	var { sourceEmail } = req.body;
	console.log("update status sourceEmail : ",sourceEmail);
	var response = await interoperability_request.find({sourceEmail:sourceEmail});

	console.log("update status..........................................."+JSON.stringify(response));
	res.json(response);
}


exports.changestatus = async (req, res)=>{

	const { email,sourceEmail,status,remark,application_name,source_application_name } = req.body;
	console.log(sourceEmail +"..........................###########################################################333 change status");
//	const { status,email } = req.body;
	console.log("email, sourceEmail, status, remark,application_name, source_application_name : ",email,sourceEmail,status,remark,application_name,source_application_name);
                     
	var response = await interoperability_request.find({application_name : application_name,email : email,sourceEmail : sourceEmail,source_application_name : source_application_name}).update({},{$set:{status : status,remark : remark}},{multi:true});
        

	console.log("Response from interoperability_request : ", JSON.stringify(response));
	res.status(200).send("Your request has been approved...!");
        
	//var mydata = { status: "waiting" };
	//var newdata = { $set: { email: "sachin@cdac.in", status: status } };

	//var response = await interoperability_request.updateOne(mydata, newdata, function (err, res) {
	//	if (err) {
	//		throw err;
	//	} else {
	//		console.log("Response from interoperability_request : ", JSON.stringify(response));
	//		res.json(response);
	//	}
	//})

}


//exports.updateremark = async (req, res)=>{
//	const { email,remark } = req.body;
//      console.log("email & remark from frontend : ", email,",",remark);

//	var response = await interoperability_request.find({email : email}).updateOne({remark : remark});
//	console.log("Remark from interoperability_request : ",JSON.stringify(response));
//	res.status(200).send("remark created...!");
//}


exports.requestcount = async (req, res) => {
        var countArr = [];
	const {email}= req.body;
        console.log("email for count : ",email);
        console.log("req.body : ", req.body);
	let status1 = "approved";
	let status2 = "rejected";
	let status3 = "waiting";
        countArr[0] = await interoperability_request.find({email : email, status : status1 }).count();
        countArr[1] = await interoperability_request.find({email : email, status : status2 }).count();
	countArr[2] = await interoperability_request.find({email : email, status : status3 }).count();
        
	var response = countArr;
	console.log("count of the requests : ",response);
        res.status(200).send(response);
	//countArr = "";
}


