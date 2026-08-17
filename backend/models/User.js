import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'customer' },
  },
  { timestamps: true }
)

export default mongoose.model('User', userSchema)
