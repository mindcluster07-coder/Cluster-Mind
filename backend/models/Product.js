import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    oldPrice: Number,
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    badge: String,
    image: { type: String, required: true },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
)

export default mongoose.model('Product', productSchema)
