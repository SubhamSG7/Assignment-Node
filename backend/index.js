const express = require('express')
const app = express()
const port = 3030
const connect=require("./Connection/mongoConnect");
const Users=require("./Model/userSchema");
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const cors=require("cors");



connect();
app.use(cors());
app.use(express.json());
app.post("/register",async(req,res)=>{
    const {email,password}=req.body;
    try {
        bcrypt.hash(password, 10,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log(err);
            }
            else{
                let data=await Users.create({email:email,password:hash})
                res.status(201).json({message:"SuccesFully Registered"})
            }
        });
    } catch (error) {
        console.log(error);
    }
})
app.get("/login",async(req,res)=>{
    const {email,password}=req.query;
    try {
        const userdata=await Users.find({email:email});
        const hashedPassword=userdata[0].password;
        bcrypt.compare(password, hashedPassword, function(err, result) {
            // result == true
            if(err){
                console.log(err);
            }
            if(result){
                const token=jwt.sign({email:email,password:password},"my-secret",{expiresIn:'1h'});
                res.status(200).json({message:"Authorised",token:token})
            }
            else{
                res.status(401).json({message:"UnAuthorised Client"});
            }
        });
    } catch (error) {
        
    }
})
app.get("/getdata",async(req,res)=>{
    try {
        const data=await Users.find();
        res.status(200).send(data)

    } catch (error) {
        console.log(error);
    }
})
function auth(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, 'my-secret');
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ message: 'Token is not valid' });
    }
  }
app.post("/Auth",auth,(req,res)=>{
    res.status(200).json({message:"Authorised"})
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))