import Product from '../models/productModel.js'
import { mongoCheckerId } from '../utils/mongoCheckerID.js'

// @desc    Get all products
// @route   GET /api/products
// @access  Private/Admin
const getProducts = async (req, res) => {
  const products = await Product.find({})
  products ? res.json(products) : res.status(404).json({ message: 'Products Not Found!' })
}

// @desc    Get product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    if (mongoCheckerId(req.params.id)) {
      const product = await Product.findById(req.params.id)
      !product ? res.status(404).json({ message: 'Product Not Found!' }) : res.json(product)
    } else {
      res.status(404)
      res.json({ message: 'Product Not Found!' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get product by category
// @route   GET /api/products/category/:id
// @access  Public
const getProductsByCategory = async (req, res) => {
  // const products = await Product.find({ category: req.params.id }).populate('category')
  try {
    const products = await Product.find({ category: req.params.id })
    !products || products.length === 0 ? res.status(404).json({ message: 'Product Not Found!' }) : res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    sku: req.body.sku,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    discountPrice: req.body.discountPrice,
    availability: req.body.availability,
    countInStock: req.body.countInStock,
    isFeature: req.body.isFeature,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
}

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    discountPrice,
    sku,
    description,
    image,
    brand,
    category,
    countInStock,
    availability,
    isFeature,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.sku = sku
    product.price = price
    product.discountPrice = discountPrice
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock
    product.availability = availability
    product.isFeature = isFeature

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404).json({ message: 'Product Not Found!' })
  }
}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: `Product removed | id: ${req.params.id}` })
  } else {
    res.status(404).json({ message: 'Product Not Found!' })
  }
}

export { getProducts, getProductsByCategory, getProductById, createProduct, updateProduct, deleteProduct }
