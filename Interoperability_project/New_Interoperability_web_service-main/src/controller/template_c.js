const fetch = require("node-fetch");
//Route import
// exports.getDomain = async(req,res)=>{
//     try{
//         const tmplt= await template.find()
//         var domainName=[];
//         tmplt.forEach(element => {
//             domainName[domainName.length]=element.template_type;
//         });
//         res.json(domainName);

//    }catch(err)

//    {
//        res.send("error"+err)
//    }

// }

exports.getData= async (data,url)=>{
    
           try {
            let response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
                },
              body: JSON.stringify(data)
        
            });
           let responseJson = await response.json();
           console.log("************************************** API **************************************"+JSON.stringify(responseJson));
           return responseJson;
           } catch (error) {
             if(error.code=="ECONNREFUSED")
             {
               return "Server is down";
             }
           }

}



