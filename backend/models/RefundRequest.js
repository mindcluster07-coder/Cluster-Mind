import mongoose from 'mongoose'

const refundRequestSchema = new mongoose.Schema(
  {
    orderId: String,
    customer: String,
    amount: { type: Number, default: 0 },
    reason: String,
    date: String,
    status: { type: String, default: 'Pending' },
  },
  { timestamps: true }
)

export default mongoose.model('RefundRequest', refundRequestSchema)
