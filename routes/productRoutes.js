import express from 'express'
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// GET method route

router.get('/', getProducts)
router.get('/search/:name', searchProductsByName)
router.post('/', protect, admin, createProduct)
router.get('/:id', getProductById)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.get('/categories/:id', getProductsByCategory)

export default router
