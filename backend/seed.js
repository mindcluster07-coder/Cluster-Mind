import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import connectDB from './db.js'
import Admin from './models/Admin.js'
import MarketingTeam from './models/MarketingTeam.js'
import User from './models/User.js'
import Product from './models/Product.js'
import Campaign from './models/Campaign.js'
import Coupon from './models/Coupon.js'
import Loyalty from './models/Loyalty.js'
import CustomerSegment from './models/CustomerSegment.js'
import CustomerBehavior from './models/CustomerBehavior.js'
import Recommendation from './models/Recommendation.js'
import { products } from './data/products.js'

const collections = [
  'users',
  'admins',
  'marketingteams',
  'products',
  'customerbehaviors',
  'customersegments',
  'recommendations',
  'campaigns',
  'coupons',
  'loyalties',
]

async function seed() {
  await connectDB()

  for (const name of collections) {
    await mongoose.connection.db.createCollection(name).catch(() => {})
  }
  console.log('Collections ready:', collections.join(', '))

  await Admin.deleteMany({})
  await Admin.create({
    username: 'admin',
    password: await bcrypt.hash('admin123', 10),
    email: 'admin@shopsmart.com',
  })

  await User.deleteMany({})
  await User.create({
    name: 'Rahul Sharma',
    email: 'demo@clustermind.com',
    contact: '9876543210',
    address: 'Pune, Maharashtra',
    password: await bcrypt.hash('demo123', 10),
    role: 'customer',
  })

  await MarketingTeam.deleteMany({})
  await MarketingTeam.create([
    {
      username: 'marketing',
      password: await bcrypt.hash('marketing123', 10),
      email: 'marketing@shopsmart.com',
      department: 'Marketing',
    },
    {
      username: 'aiml',
      password: await bcrypt.hash('aiml123', 10),
      email: 'aiml@shopsmart.com',
      department: 'AI/ML',
    },
  ])

  await Product.deleteMany({})
  const productDocs = await Product.insertMany(products)

  const productIds = productDocs.map((p) => p._id)
  const demoUser = await User.findOne({ email: 'demo@clustermind.com' })

  await CustomerSegment.deleteMany({})
  const segmentDocs = await CustomerSegment.insertMany([
    { segmentName: 'Premium Customers', criteria: 'High spend (top 10%)', size: 1200 },
    { segmentName: 'Loyal Customers', criteria: 'Repeat purchases >= 5', size: 3400 },
    { segmentName: 'Price Sensitive', criteria: 'Prefers discounts & deals', size: 2900 },
    { segmentName: 'New Customers', criteria: 'Registered within 30 days', size: 1800 },
    { segmentName: 'Inactive Customers', criteria: 'No purchase in 90 days', size: 3100 },
  ])

  await Campaign.deleteMany({})
  await Campaign.insertMany([
    { name: 'Summer Sale', segmentId: segmentDocs[2]._id, audience: 2900, status: 'active' },
    { name: 'Electronics Fest', segmentId: segmentDocs[0]._id, audience: 1200, status: 'active' },
    { name: 'Loyalty Week', segmentId: segmentDocs[1]._id, audience: 3400, status: 'scheduled' },
    { name: 'New User Offer', segmentId: segmentDocs[3]._id, audience: 1800, status: 'completed' },
    { name: 'Clearance Sale', segmentId: segmentDocs[4]._id, audience: 3100, status: 'draft' },
  ])

  await Coupon.deleteMany({})
  await Coupon.insertMany([
    { code: 'AI20OFF', discount: 5000, used: false },
    { code: 'WELCOME50', discount: 500, used: false },
    { code: 'FIRSTORDER', discount: 1000, used: false },
    { code: 'FESTIVE100', discount: 10000, used: false },
  ])

  await Loyalty.deleteMany({})
  if (demoUser) {
    await Loyalty.create({
      customerId: demoUser._id,
      points: 2450,
      tier: 'silver',
      rewards: ['Free Shipping', 'Birthday Voucher'],
    })
  }

  await CustomerBehavior.deleteMany({})
  if (demoUser && productIds.length) {
    const now = Date.now()
    const behaviors = []
    for (let i = 0; i < 30; i++) {
      behaviors.push({
        customerId: demoUser._id,
        productId: productIds[i % productIds.length],
        action: ['view', 'click', 'add_to_cart', 'purchase', 'search'][i % 5],
        timestamp: new Date(now - i * 3600 * 1000),
      })
    }
    await CustomerBehavior.insertMany(behaviors)
  }

  await Recommendation.deleteMany({})
  if (demoUser && productIds.length) {
    await Recommendation.insertMany(
      productIds.slice(0, 5).map((id, i) => ({
        customerId: demoUser._id,
        productId: id,
        score: 0.95 - i * 0.1,
        reason: 'Matches your purchase history',
      }))
    )
  }

  console.log('\nDatabase seeded successfully!')
  console.log('Login credentials:')
  console.log('  Customer  -> demo@clustermind.com / demo123')
  console.log('  Admin     -> admin      / admin123')
  console.log('  Marketing -> marketing  / marketing123')
  console.log('  AI/ML     -> aiml       / aiml123')

  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding failed:', err.message)
  process.exit(1)
})
