const mongoose=require('mongoose')
//const User=require('./models/User'),

const UserSchema=new mongoose.Schema({
    googleId:String,
    displayName:String,
    email:String,
    image:String
},{timestamps:true});

const UserModel=new mongoose.model("user",UserSchema);

module.exports=UserModel;
