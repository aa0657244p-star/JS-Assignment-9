const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);  // السطر الجديد
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected mesho successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;