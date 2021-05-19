const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/meower');
const mews = db.get('mews');
const userinfo = db.get('userinfo');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message:'Meower'
    });
});

app.get('/mews',(req,res)=>{
    mews.find()
    .then(mews => {
        res.json(mews);
    });
});

function isValidMew(mew){
    return mew.name && mew.name.toString().trim() != '' && mew.content && mew.content.toString().trim() != '';
}

app.post('/mews',(req,res)=>{
    if(isValidMew(req.body)){
        const mew = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            created: new Date()
        }

        mews.insert(mew).then(createdMew=>{res.json(createdMew)});
    }
    else{
        res.status(422);
        res.json({
            message: 'Name and Content are required!'
        });
    }
});

app.get('/signup',(req,res)=>{
    userinfo.find()
    .then(mews => {
        res.json(mews);
    });
});

app.post('/signup',(req,res)=>{
    const user = {
        username: req.body.username,
        password: req.body.password,
        repeatedpassword: req.body.repeatedpassword,
        registrationDate: new Date()
    };
    
    // if(password.trim()==repeatedpassword()){
        userinfo.insert(user).then(newUser=>{res.json(newUser)});
    //     console.log(req.body);
    // }
    // else{
    //     alert("The passwords are not the same!");
    // }
});

app.listen(5000, ()=>{
    console.log("Listening on http://localhost:5000");
});