import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsmart_db'

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log('MongoDB connected:', mongoose.connection.name)
    return mongoose.connection
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    if (process.env.NODE_ENV === 'production') {
      throw err
    }
    process.exit(1)
  }
}

export default connectDB
