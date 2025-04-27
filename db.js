const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://sruthi23bce20146:RepwLBYAtobirqOZ@cluster0.2dpmw4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully 🚀');
  } catch (error) {
    console.error('Failed to connect to MongoDB ❌', error);
  }
};

module.exports = connectToMongo;
