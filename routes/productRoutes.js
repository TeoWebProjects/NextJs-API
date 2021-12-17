import express from 'express'
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// GET method route

router.get('/', protect, admin, getProducts)
router.post('/', protect, admin, createProduct)
router.get('/:id', getProductById)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.get('/categories/:id', getProductsByCategory)

export default router
