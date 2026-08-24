import 'dotenv/config'
import mongoose from 'mongoose'
import connectDB from './db.js'
import { seedAll } from './seedData.js'

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

  await seedAll()

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
