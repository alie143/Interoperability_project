const database=require("mongoose");
const dotenv=require("dotenv");// it used for read config.env confing file

dotenv.config({path:"backend/congfig/config.env"});

const connectDatabase=()=>{
    database.connect(process.env.DB_URL,{    useNewUrlParser: true,
        useUnifiedTopology: true,
    }).
then((data)=>{console.log(data +"connected db successfully "+process.env.PORT)})
    .catch((err)=>{console.log(err)});
}

connectDatabase();
