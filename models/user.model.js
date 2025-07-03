import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   userName: {
    type: String,
    required: true, // 👈 ensures it's mandatory
  },
  email: String,
  password: String,
});

export default mongoose.model('User', userSchema);
