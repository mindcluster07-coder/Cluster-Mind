import { Router } from 'express'
import Recommendation from '../models/Recommendation.js'
import Product from '../models/Product.js'
import { verifyToken } from '../middleware/auth.js'

const router = Router()

router.get('/', verifyToken, async (req, res) => {
  try {
    const filter = { customerId: req.user.id }
    const recs = await Recommendation.find(filter).sort({ score: -1 }).limit(12).lean()

    const productIds = recs.map((r) => r.productId)
    const products = await Product.find({ _id: { $in: productIds } }).lean()
    const productMap = new Map(products.map((p) => [String(p._id), p]))

    const recommendations = recs.map((r) => ({
      ...r,
      product: productMap.get(String(r.productId)) || null,
    }))

    res.json({ recommendations })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.get('/all', verifyToken, async (req, res) => {
  try {
    const recs = await Recommendation.find().sort({ score: -1 }).limit(50).lean()
    res.json({ recommendations: recs })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId, score = 0, reason = '' } = req.body
    if (!productId) {
      return res.status(400).json({ message: 'productId is required.' })
    }
    const recommendation = await Recommendation.findOneAndUpdate(
      { customerId: req.user.id, productId },
      { score: Number(score), reason },
      { upsert: true, new: true }
    )
    res.status(201).json({ message: 'Recommendation saved.', recommendation })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

export default router
