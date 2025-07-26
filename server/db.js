
const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/eventDataBase', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('database connected');
  } catch (error) {
    console.error(' database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectdb;
