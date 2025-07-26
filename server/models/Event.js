const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    title:String,
    date:String,
    Description:String,
    location:String
},{timestamps:true,versionKey:false});
module.exports=mongoose.model('Event',eventSchema);