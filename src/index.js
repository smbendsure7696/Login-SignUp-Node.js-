const express = require('express');

//bcrypt is library for encryption and decryption the password
const bcrypt = require('bcrypt');

const {userModel} = require('./connector');

const app = express();

app.use(express.json());


const isNullorUndefined = val => val===null || val===undefined;

//SALT for encryption
const SALT = 3;

//validation functions 
const validateEmail = email =>{
    var at =email.indexOf("@");  
    var dot =email.lastIndexOf(".");  
    if (at<1 || dot<at+2 || dot+2>=email.length)
    {
        return false;
    }
    else
    {
        return true;
    }

}

const validateName = name =>{
    if(name==="" || name.length>32 || name.length<3)
        return false;
    else
        return true;
}


const validatePassword = pass =>{
    const val = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;

    if(pass.match(val))
        return true;
    else
        return false;
}

const validateAge = age =>{
    if(age>0 && age<=100)
        return true;
    else
        return false;
}


app.post('/signup',async(req,res)=>{

    const {name,age,email,password} = req.body;

    const existingUser = await userModel.findOne({Email:email});

    console.log(existingUser);

    if(validateName(name) && validatePassword(password) && validateEmail(email) && validateAge(age))
    {

        if(isNullorUndefined(existingUser))
        {
            const hashPassword = bcrypt.hashSync(password,SALT);
            const newUser = new userModel({
                Name : name,
                Age : age,
                Email : email,
                Password : hashPassword,
            });
            
            await newUser.save();
            res.status(200).send({success : "Account created successfully"});
        }
        else
        {
            res.status(400).send({err: "Email already exists"});
        }

    }
    else
    {
        res.status(400).send({err: "data is not valid"});
    }

    
});

app.post('/login',async(req,res)=>{

    const {username, password} = req.body;

    const existingUser = await userModel.findOne({Email:username});

    if(isNullorUndefined(existingUser))
    {
        res.status(401).send({err: "Account does not exists"});
    }
    else
    {
        const hashpass = existingUser.Password;
        
        //console.log(hashpass);

        if(bcrypt.compareSync(password,hashpass))        {
            res.send(existingUser);

        }
        else
        {
            res.status(401).send({err: "Invalid Username/Password"});
        }
        
    }

});

app.listen(3007,()=>{
    console.log("Server is running");
});