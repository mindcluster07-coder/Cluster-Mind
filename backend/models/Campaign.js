import mongoose from 'mongoose'

const campaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    segmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerSegment' },
    audience: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'active', 'completed'],
      default: 'draft',
    },
    schedule: Date,
  },
  { timestamps: true }
)

export default mongoose.model('Campaign', campaignSchema)
