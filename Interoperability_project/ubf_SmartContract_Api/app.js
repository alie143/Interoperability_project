const express =require('express')
const mongoose=require('mongoose')

const app=express()

const cors = require('cors');
app.use(cors('*'));


//const url = 'mongodb://ubf:ubf@10.210.12.191:27017/master';
//const url = 'mongodb://nbfuser:nbf@190@10.210.12.190:27017/master?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
//const url ='mongodb://nbfuser:nbf@190@10.210.12.190:27017/master';

const url = 'mongodb://sachin:sachindbt@10.210.12.191:27017/master?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'



mongoose.connect(url,{useNewUrlParser:true});
const con=mongoose.connection;


con.on('open',()=>{
     console.log('connected....')
})

app.use(express.json())
const userRouter=require('./routers/user')
app.use('/user',userRouter)

app.use(express.json())
const consensusRouter=require('./routers/consensus')
app.use('/consensus',consensusRouter)


app.use(express.json())
const environmentRouter=require('./routers/environment')
app.use('/environment',environmentRouter)

app.use(express.json())
const funcRouter=require('./routers/functions')
app.use('/functions',funcRouter)

 
app.use(express.json())
const versionRouter=require('./routers/platformVersion')
app.use('/platformVersion',versionRouter)



app.use(express.json())
const nodeRouter=require('./routers/node')
app.use('/node',nodeRouter)

app.use(express.json())
const pltRouter=require('./routers/platform')
app.use('/platform',pltRouter)


app.use(express.json())
const stakeRouter=require('./routers/stakeHolder')
app.use('/stakeHolder',stakeRouter)


app.use(express.json())
const tmp=require('./routers/templates')
app.use('/templates',tmp)

app.use(express.json())
const config=require('./routers/networkConfig')
app.use('/networkConfig',config)

app.use(express.json())

app.listen(3005,()=>{
    console.log('server started on 3005...')
})
