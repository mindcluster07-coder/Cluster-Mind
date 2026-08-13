import mongoose from 'mongoose'

const customerBehaviorSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    action: {
      type: String,
      enum: ['view', 'click', 'add_to_cart', 'purchase', 'search'],
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model('CustomerBehavior', customerBehaviorSchema)
