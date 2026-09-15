import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import marketingRoutes from './routes/marketing.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/marketing', marketingRoutes)

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500).json({ message: 'Internal server error' })
})

let dbReady = false

export async function ensureDB() {
  if (!dbReady) {
    await connectDB()
    dbReady = true
  }
}

connectDB().catch((err) => {
  console.error('MongoDB connection failed:', err.message)
})

export default app

if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`)
    })
  })
}
