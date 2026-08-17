import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './db.js'
import authRoutes from './routes/auth.js'

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend' })
})

app.use('/api/auth', authRoutes)

export default app

if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`)
    })
  })
}
