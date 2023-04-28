const { validateData } = require("../validator/validate")
const { bcCall } = require("../BC_connecter/connecter");
const { fetchdata,monitor,networkMonitoring } = require("../registry/template");
const {test} = require("../network_monitor/new_monitor");

exports.midalware = async (req, res) => {
    const { function_name, key, data } = req.body;
    const { template_type, application_name } = req.body;
    try {
        let validate = await validateData(key);
        
        if (validate == true) {
           
            var response = await fetchdata(function_name, key,template_type,application_name );
            
            var network_m = await monitor(key);
	
		var call_network_monitor = await test(network_m);
	
		if(call_network_monitor.url.networkStatus==true){
            var result = await bcCall(response, data);
			res.json(result);
		}else{
            //console.log("************************************** response **************************************"+JSON.stringify(data));
            res.send(template_type+" network down...!"); //It should be dynamic.
		}
        }else{
            res.send("Please register for interoperability!");
        }

    } catch (error) {

        console.log("############################# ************************************** response **************************************" + error);

    }
}

exports.network_monitor = async (req, res) => {
   
    const { key } = req.body;
	
    try {
            var network_m = await monitor(key);
	
		var call_network_monitor = await test(network_m);
	
		if(call_network_monitor.url.networkStatus==true){
            var result = "network up"
			res.json(result);
		}else{
            //console.log("************************************** response **************************************"+JSON.stringify(data));
            res.send("network down...!"); //It should be dynamic.
		}
 

    } catch (error) {

        console.log("************************************** response **************************************" + error);

    }
}

