const app=require("./app");
const connectDatabase=require("./backend/congfig/database")
const dotenv=require("dotenv");// it used for read config.env confing file

dotenv.config({path:"backend/congfig/config.env"});

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });




app.listen(process.env.PORT,()=>{

    console.log("server is running on "+process.env.PORT);
})



   // Unhandled Promise Rejection
   process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);


  });

