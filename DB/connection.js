const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(()=>{
    console.log("DropCart Server connected successfully with MongoDb Atlas");
}).catch((err)=>{
    console.log(`MongoDB connection Failed!!! Error: ${err}`);
})