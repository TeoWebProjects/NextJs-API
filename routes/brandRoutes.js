import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { getBrands, getBrandById, createBrand } from '../controllers/brandController.js'

const router = express.Router()

router.post('/', protect, admin, createBrand)
router.get('/', getBrands)
router.get('/:id', getBrandById)

export default router
