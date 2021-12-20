import express from 'express'
import { createCategory, getCategories, getCategoryById } from '../controllers/categoryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', protect, admin, createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)

export default router
