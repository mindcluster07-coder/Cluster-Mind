import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    contact: { type: String, required: true, unique: true },
    address: { type: String, trim: true, default: '' },
    dob: { type: Date },
    age: { type: Number },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'customer' },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
