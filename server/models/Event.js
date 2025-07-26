const mongoose=require('mongoose');

const eventSchema=new mongoose.Schema({
    title:String,
    date:Date,
    Description:String,
    location:String
});
module.exports=mongoose.model('Event',eventSchema);