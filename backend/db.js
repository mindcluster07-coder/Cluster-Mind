import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shopsmart_db'
const USE_MEMORY_DB = process.env.USE_MEMORY_DB !== 'false'

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('MongoDB connected:', mongoose.connection.name)
  } catch (err) {
    if (!USE_MEMORY_DB) {
      console.error('MongoDB connection failed:', err.message)
      process.exit(1)
    }
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    const memoryServer = await MongoMemoryServer.create()
    await mongoose.connect(memoryServer.getUri('shopsmart_db'))
    console.warn(
      `Real MongoDB unavailable (${err.message}); using in-memory database. Data will not persist across restarts.`
    )
    const { seedAll } = await import('./seedData.js')
    await seedAll()
    console.log('In-memory database seeded with demo data.')
  }
}

export default connectDB
