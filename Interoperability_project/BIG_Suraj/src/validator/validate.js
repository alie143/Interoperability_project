const fetch = require("node-fetch");

exports.validateData = async (key) => {
    try {
        
        var data = {
            "key" : key
        }

        let response = await fetch("http://10.210.12.179:4000/selfapp/fetchall", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let responseJson = await response.json();
        let resData = responseJson;
	    if(resData==true)
	    {
             return true;
	    }else{
             return false;
	    }

    } catch (error) {
        console.log(error);
    }
}
