import Brand from '../models/brandModel.js'

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
const getBrands = async (req, res) => {
  const brands = await Brand.find({})
  res.json(brands)
}

// @desc    Get brand by id
// @route   GET /api/brands/:id
// @access  Public
const getBrandById = async (req, res) => {
  const brand = await Brand.findById(req.params.id)
  res.json(brand)
}

// @desc    Create a brand
// @route   POST /api/brands
// @access  Private/Admin
const createBrand = async (req, res) => {
  const brand = new Brand({
    brand_id: req.body.brand_id,
    name: req.body.name,
  })

  const createdBrand = await brand.save()
  res.status(201).json(createdBrand)
}

export { getBrands, getBrandById, createBrand }
