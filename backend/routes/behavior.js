import { Router } from 'express'
import CustomerBehavior from '../models/CustomerBehavior.js'
import { verifyToken, requireRole } from '../middleware/auth.js'

const router = Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const { productId, action } = req.body
    if (!productId || !action) {
      return res.status(400).json({ message: 'productId and action are required.' })
    }
    const allowed = ['view', 'click', 'add_to_cart', 'purchase', 'search']
    if (!allowed.includes(action)) {
      return res.status(400).json({ message: `action must be one of: ${allowed.join(', ')}` })
    }
    const behavior = await CustomerBehavior.create({
      customerId: req.user.id,
      productId,
      action,
    })
    res.status(201).json({ message: 'Behavior recorded.', behavior })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

router.get('/', verifyToken, requireRole('admin', 'marketing'), async (req, res) => {
  try {
    const { action, customerId, limit } = req.query
    const filter = {}
    if (action) filter.action = action
    if (customerId) filter.customerId = customerId

    let query = CustomerBehavior.find(filter).sort({ timestamp: -1 })
    if (limit) query = query.limit(Number(limit))
    const behaviors = await query.lean()
    res.json({ behaviors })
  } catch (err) {
    res.status(500).json({ message: 'Server error.', error: err.message })
  }
})

export default router
