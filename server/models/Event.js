// server/models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date },                     // Date type
  description: { type: String },            // lowercase (match frontend)
  location: { type: String },
  userId: { type: String },
  photo: { type: String }                   // stores file path like /uploads/xxx.jpg
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Event', eventSchema);
