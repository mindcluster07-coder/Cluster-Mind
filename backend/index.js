import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db.js'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import cartRoutes from './routes/cart.js'
import wishlistRoutes from './routes/wishlist.js'
import campaignRoutes from './routes/campaigns.js'
import couponRoutes from './routes/coupons.js'
import loyaltyRoutes from './routes/loyalty.js'
import segmentRoutes from './routes/segments.js'
import behaviorRoutes from './routes/behavior.js'
import recommendationRoutes from './routes/recommendations.js'
import userRoutes from './routes/users.js'
import adminRoutes from './routes/admin.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/wishlist', wishlistRoutes)
app.use('/api/campaigns', campaignRoutes)
app.use('/api/coupons', couponRoutes)
app.use('/api/loyalty', loyaltyRoutes)
app.use('/api/segments', segmentRoutes)
app.use('/api/behavior', behaviorRoutes)
app.use('/api/recommendations', recommendationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)

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

// Connect to MongoDB on startup (all environments, including Vercel).
// In production the connection is reused across serverless invocations.
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
