import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import morgan from 'morgan'
import connectDB from './database.js'
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'
import orderRoutes from './routes/orderRoute.js'
import uploadRoutes from './routes/uploadRoute.js'
import userRoutes from './routes/userRoutes.js'
import brandRoutes from './routes/brandRoutes.js'

const app = express()

dotenv.config()

connectDB()

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is Running on http://localhost:${PORT}`)
})
