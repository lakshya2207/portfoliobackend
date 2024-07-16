const mongoose = require('mongoose');
const introSchema = mongoose.Schema({
    name: String,
    github: String,
    email:String,
    phoneno:Number,
    github:String,
    linkedin:String,
    description:String,
    address:String,
    resume:String,
    skills:Object,
    role:String
})
module.exports=mongoose.model('intro',introSchema);