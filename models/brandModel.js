import mongoose from 'mongoose'

const brandSchema = mongoose.Schema(
  {
    brand_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model('Brand', brandSchema)

export default Brand
