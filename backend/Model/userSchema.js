const mongoose=require("mongoose");



const Schema=mongoose.Schema;


const userSchema=new Schema({
    email:{type:String,unique:true,reqired:true},
    password:{type:String, reqired:true}
})

const model=mongoose.model("userData",userSchema);
module.exports=model;