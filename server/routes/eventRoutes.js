// server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer in-memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Upload file to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// POST create event
router.post('/events', upload.single('photo'), async (req, res) => {
  try {
    const { _id,title, date, description, location, userId } = req.body;
    let photoUrl = null;
    console.log(_id);
    if (req.file) {
      photoUrl = await uploadToCloudinary(req.file.buffer, 'events');
    }

    const newEvent = new Event({
      _id,
      title,
      date: date ? new Date(date) : undefined,
      description,
      location,
      userId,
      photo: photoUrl
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    console.error('POST /events error:', err);
    res.status(400).json({ error: err.message });
  }
});

// GET events by userId
router.get('/events/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Find all events where the uid matches the userId from the request parameters
    const events = await Event.find({ userId: userId });

    // Respond with the array of events
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/events/:Id', async (req, res) => {
  try {
    const Id = req.params.Id;
    
    // Find all events where the uid matches the userId from the request parameters
    const events = await Event.find({ _id:Id });

    // Respond with the array of events
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/events/:id', upload.single('photo'), async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, date, description, location, userId } = req.body;
    let photoUrl = null;

    if (req.file) {
      photoUrl = await uploadToCloudinary(req.file.buffer, 'events');
    }

    const updateData = {
      title,
      date: date ? new Date(date) : undefined,
      description,
      location,
      userId,
      // Update photo URL if a new photo was uploaded
      ...(photoUrl && { photo: photoUrl })
    };

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error('PUT /events/:id error:', err);
    res.status(400).json({ error: err.message });
  }
});

router.delete('/events/:id', async (req, res) => {
  console.log("DELETE request for ID:", req.params.id); // 👈 add this
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully', deletedEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
