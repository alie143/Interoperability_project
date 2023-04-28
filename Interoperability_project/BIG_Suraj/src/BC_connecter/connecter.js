const fetch = require("node-fetch");
//const {midalware} = require("../BC_connecter/connecteri");
//const {fetchdata} = require("../registry/template");

exports.bcCall = async (response, data) => {
  var res = await response;
  var ip = res.ip;
  console.log("rinning ....................................." + JSON.stringify(res));

  //var obj = JSON.parse(data);
  var url = res.result.api_url.replace('ip-address', ip);
  console.log("URL  ....................................." + url);


  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      //	body : data

    });

    console.log("Response in bcCall : ",response);
    let responseJson = await response.json();
    //       console.log("************************************** API **************************************"+JSON.stringify(responseJson));
    return responseJson;
  } catch (error) {

    console.log("error is ............................." + error);
    return error;
    //  if(error.code=="ECONNREFUSED")
    // {
    // return "Server is down";
    //}
  }

}



