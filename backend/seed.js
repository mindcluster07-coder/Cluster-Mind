import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import connectDB from './db.js'
import Admin from './models/Admin.js'
import MarketingTeam from './models/MarketingTeam.js'
import Product from './models/Product.js'
import { products } from './data/products.js'
import { seedAdminData } from './seedAdminData.js'

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
  'admincustomers',
  'adminorders',
  'admincampaigns',
  'refundrequests',
  'feedbackentries',
  'appnotifications',
  'teamusers',
  'activitylogs',
  'mlmodels',
  'predictionlogs',
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
  await Product.insertMany(products)

  await seedAdminData()

  console.log('\nDatabase seeded successfully!')
  console.log('Login credentials:')
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
