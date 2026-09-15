import mongoose from 'mongoose'

const marketingTeamSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'marketing' },
    department: { type: String, default: 'Marketing' },
  },
  { timestamps: true }
)

export default mongoose.model('MarketingTeam', marketingTeamSchema)
