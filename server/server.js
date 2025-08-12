// server/server.js
require('dotenv').config(); // load env variables

const express = require('express');
const connectdb = require('./db');
const eventRoutes = require('./routes/eventRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// No need for app.use('/uploads', ...) — Cloudinary hosts files

// mount api routes
app.use('/api', eventRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
