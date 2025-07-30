const express=require('express');
const router=express.Router();
const Event=require('../models/Event');

router.post('/events', async (req,res)=> {
try {
    const newEvent=new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
}
catch(err)
{
res.status(400).json({error: err.message});
}
});

 router.get('/events', async(req,res)=>{
    try{
    const events= await Event.find();
    res.json(events);
 }
 catch(err)
 {
    res.status(500).json({error: err.message});
 }
});

router.get('/events/:id', async(req,res)=>
   {
   try{
      const { id } = req.params;
      const event= await Event.findById(id);
      if(!event)
      {
         return res.status(404).json({error:'Event not found'});
      }
      res.json(event);
   } catch(err){
      res.status(500).json({error: err.message});
   }
});



router.delete('/events/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/events', async (req, res) => {
  try {
    const result = await Event.deleteMany({});
    res.json({
      message: 'All events deleted successfully',
      deletedCount: result.deletedCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports=router;