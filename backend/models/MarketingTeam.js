import mongoose from 'mongoose'
import crypto from 'crypto'

const marketingTeamSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'marketing' },
    department: { type: String, default: 'Marketing' },
    apiKey: { type: String, unique: true, sparse: true },
    apiKeyCreatedAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

marketingTeamSchema.methods.generateApiKey = function () {
  const key = `mk_live_${crypto.randomBytes(32).toString('hex')}`
  this.apiKey = key
  this.apiKeyCreatedAt = new Date()
  return key
}

export default mongoose.model('MarketingTeam', marketingTeamSchema)
