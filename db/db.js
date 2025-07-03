import mongoose from 'mongoose';

export const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'chatApp',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err.message);
    process.exit(1);
  }
};
