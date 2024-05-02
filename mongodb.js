const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/mydata";

mongoose.connect(url).then(()=>{
    console.log("connection sucessfull");
})
.catch((e)=>{
    console.log("no connection");
})