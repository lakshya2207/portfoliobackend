const mongoose = require('mongoose');
const projectSchema = mongoose.Schema({
    name: String,
    description: String,
    sourceCode:String,
    demo:String,
    images:[String],
    techStack:String,
    type:String,
})
module.exports=mongoose.model('project',projectSchema);