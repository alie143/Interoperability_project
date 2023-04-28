const Exception = require('../controller/Exception');

module.exports = (err,req,res,next)=>{
err.statusCode = err.statusCode || 500;
err.message = err.message || "Internal Server Error";


if(err.name=="CastError"){

    const message=`Resorce not found. Invalid : ${err.path}`;
    err = new Exception(message,"400")
}

res.status(err.statusCode).json({
    success:false,
    error:err.message
})
}
