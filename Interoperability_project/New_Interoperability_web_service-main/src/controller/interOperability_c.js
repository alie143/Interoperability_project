const interoperability = require("../moduls/interoeprability");

exports.getInterOperability = async (req, res) => {
  // var Interoperability = await interoperability.find();
  const { interoperability_ID } = req.body;
  console.log(interoperability_ID)
  var Interoperability = await interoperability.findOne(req.applicationName);
  //console.log(applicationName)
  var isMatch = await Interoperability.comparePassword(interoperability_ID);
  console.log(isMatch)
  if (!isMatch) {
    res.status(201).json({
      success: false,
      message: "Authorized person can not access blockchain network"
    })
  } else {
    var data = req.body.data;
    var urlparam = req.body.methodName;
    var url = `http://10.210.12.30:3002/${urlparam}`;
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)

      });
      let responseJson = await response.json();
      console.log("************************************** API **************************************" + JSON.stringify(responseJson));
      //  return responseJson;
      res.status(201).json({
        success: true,
        responseJson
      })
    } catch (error) {
      if (error.code == "ECONNREFUSED") {
        return "Server is down";
      }
    }
  }
}


// for storing data .
exports.insertInterOperability = async (req, res) => {
  var Interoperability = await interoperability.create(req.body);
  const token = Interoperability.getJWTToken();
  res.status(200).json({
    success: true,
    token: token
  })

}


// for verify blockchain network 
exports.verifyNetwork = async (req, res) => {

}
