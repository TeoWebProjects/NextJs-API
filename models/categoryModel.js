import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
  {
    cat_id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    childrenCats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }],
  },
  {
    timestamps: true,
  }
)

const Category = mongoose.model('Category', categorySchema)

export default Category
