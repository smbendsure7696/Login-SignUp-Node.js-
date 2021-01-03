const mongoose = require('mongoose');

const mongoUrl = "mongodb://localhost:27017/nodemock";

const {userSchema} = require('./schema');

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connected to DB");
    
})
.catch((err)=>{
    console.log("Error in connecting to DB",err);
});

const userModel = mongoose.model('person',userSchema);

module.exports = {userModel};


