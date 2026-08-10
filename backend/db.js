import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsmart_db'

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected:', mongoose.connection.name)
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

export default connectDB
