import express from 'express'
import { addOrderItems, getOrdersByUserId } from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

// Post method route
router.post('/', addOrderItems)
router.get('/user/:id', protect, getOrdersByUserId)

export default router
