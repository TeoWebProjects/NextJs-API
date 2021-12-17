import Category from '../models/categoryModel.js'

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  const categories = await Category.find({})
  res.json(categories)
}

// @desc    Get category by id
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  const product = await Category.findById(req.params.id)
  res.json(product)
}

// @desc    Create a product
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  const category = new Category({
    cat_id: req.body.cat_id,
    name: req.body.name,
    childrenCats: req.body.childrenCats,
  })

  const createdCategory = await category.save()
  res.status(201).json(createdCategory)
}

export { createCategory, getCategories, getCategoryById }
