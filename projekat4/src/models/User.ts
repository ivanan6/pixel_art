import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userScema = new Schema({
    id:String,
    username:String,
    password:String
})

const User = mongoose.model('User',userScema)
module.exports = User