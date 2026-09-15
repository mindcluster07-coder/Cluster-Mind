import { Router } from 'express'
import MarketingTeam from '../models/MarketingTeam.js'
import Campaign from '../models/Campaign.js'
import Coupon from '../models/Coupon.js'
import Loyalty from '../models/Loyalty.js'
import CustomerBehavior from '../models/CustomerBehavior.js'
import CustomerSegment from '../models/CustomerSegment.js'
import Recommendation from '../models/Recommendation.js'
import Product from '../models/Product.js'

const router = Router()

function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)
}

function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.api_key
  if (!apiKey) {
    return res.status(401).json({ message: 'API key required. Provide via X-API-Key header or api_key query param.' })
  }
  req.apiKey = apiKey
  next()
}

async function validateApiKey(req, res, next) {
  const marketing = await MarketingTeam.findOne({ apiKey: req.apiKey, isActive: true })
  if (!marketing) {
    return res.status(403).json({ message: 'Invalid or revoked API key.' })
  }
  req.marketing = marketing
  next()
}

router.use(apiKeyAuth)
router.use(validateApiKey)

router.get('/me', (req, res) => {
  res.json({
    id: req.marketing._id,
    username: req.marketing.username,
    email: req.marketing.email,
    department: req.marketing.department,
    apiKeyCreatedAt: req.marketing.apiKeyCreatedAt,
  })
})

router.post('/api-key/regenerate', asyncHandler(async (req, res) => {
  const newKey = req.marketing.generateApiKey()
  await req.marketing.save()
  res.json({ apiKey: newKey, createdAt: req.marketing.apiKeyCreatedAt })
}))

router.get('/overview', asyncHandler(async (req, res) => {
  const [campaigns, coupons, loyalty, segments, behaviors] = await Promise.all([
    Campaign.countDocuments({ createdBy: req.marketing._id }),
    Coupon.countDocuments({ createdBy: req.marketing._id }),
    Loyalty.countDocuments({ createdBy: req.marketing._id }),
    CustomerSegment.countDocuments(),
    CustomerBehavior.countDocuments(),
  ])
  const recentCampaigns = await Campaign.find({ createdBy: req.marketing._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean()
  res.json({
    stats: {
      totalCampaigns: campaigns,
      totalCoupons: coupons,
      totalLoyaltyPrograms: loyalty,
      totalSegments: segments,
      totalBehaviors: behaviors,
    },
    recentCampaigns,
  })
}))

router.get('/campaigns', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query
  const query = { createdBy: req.marketing._id }
  if (status) query.status = status
  const [items, total] = await Promise.all([
    Campaign.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    Campaign.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

router.post('/campaigns', asyncHandler(async (req, res) => {
  const campaign = await Campaign.create({
    ...req.body,
    createdBy: req.marketing._id,
  })
  res.status(201).json(campaign)
}))

router.get('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await Campaign.findOne({ _id: req.params.id, createdBy: req.marketing._id }).lean()
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  res.json(campaign)
}))

router.patch('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await Campaign.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.marketing._id },
    req.body,
    { new: true }
  ).lean()
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  res.json(campaign)
}))

router.delete('/campaigns/:id', asyncHandler(async (req, res) => {
  const campaign = await Campaign.findOneAndDelete({ _id: req.params.id, createdBy: req.marketing._id })
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' })
  res.json({ message: 'Campaign deleted' })
}))

router.get('/coupons', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, isActive } = req.query
  const query = { createdBy: req.marketing._id }
  if (isActive !== undefined) query.isActive = isActive === 'true'
  const [items, total] = await Promise.all([
    Coupon.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    Coupon.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

router.post('/coupons', asyncHandler(async (req, res) => {
  const coupon = await Coupon.create({
    ...req.body,
    createdBy: req.marketing._id,
  })
  res.status(201).json(coupon)
}))

router.delete('/coupons/:id', asyncHandler(async (req, res) => {
  console.log('DELETE /coupons/:id hit, id:', req.params.id);
  const coupon = await Coupon.findOneAndDelete({ _id: req.params.id, createdBy: req.marketing._id })
  console.log('Found coupon:', coupon?.code);
  if (!coupon) return res.status(404).json({ message: 'Coupon not found' })
  res.json({ message: 'Coupon deleted' })
}))

router.get('/loyalty', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query
  const query = { createdBy: req.marketing._id }
  const [items, total] = await Promise.all([
    Loyalty.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    Loyalty.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

router.post('/loyalty', asyncHandler(async (req, res) => {
  const loyalty = await Loyalty.create({
    ...req.body,
    createdBy: req.marketing._id,
  })
  res.status(201).json(loyalty)
}))

router.delete('/loyalty/:id', asyncHandler(async (req, res) => {
  const loyalty = await Loyalty.findOneAndDelete({ _id: req.params.id, createdBy: req.marketing._id })
  if (!loyalty) return res.status(404).json({ message: 'Loyalty program not found' })
  res.json({ message: 'Loyalty program deleted' })
}))

router.get('/segments', asyncHandler(async (req, res) => {
  const segments = await CustomerSegment.find().lean()
  res.json(segments)
}))

router.get('/behaviors', asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, segment } = req.query
  const query = segment ? { segment } : {}
  const [items, total] = await Promise.all([
    CustomerBehavior.find(query).sort({ updatedAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    CustomerBehavior.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

router.get('/recommendations', asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, type } = req.query
  const query = type ? { type } : {}
  const [items, total] = await Promise.all([
    Recommendation.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    Recommendation.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

router.get('/products', asyncHandler(async (req, res) => {
  const { page = 1, limit = 50, category, search } = req.query
  const query = {}
  if (category) query.category = category
  if (search) query.$text = { $search: search }
  const [items, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit)).lean(),
    Product.countDocuments(query),
  ])
  res.json({ items, total, page: parseInt(page), pages: Math.ceil(total / limit) })
}))

export default router