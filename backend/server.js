import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import connectCloudinary from './config/cloudinary.js'
import connectDB from './config/mongodb.js'

// Import rute
import adminRouter from './routes/adminRoutes.js'
import cartRouter from './routes/cartRoute.js'
import emailCodeRoutes from './routes/emailCodeRoutes.js'
import orderRouter from './routes/orderRoute.js'
import productRouter from './routes/productRoute.js'
import subcategoryRoutes from './routes/subcategory.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())

// Rute API
app.use('/api/user', userRouter) // pentru login, register, admin
app.use('/api', emailCodeRoutes) // pentru send-code, verify-code
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/admin', adminRouter)
app.use('/api/subcategory', subcategoryRoutes)

app.get('/', (req, res) => {
	res.send('✅ API is working')
})

app.listen(port, () => {
	console.log(`🚀 Server started on PORT: ${port}`)
})
