import express from 'express'
import {
	addProduct,
	listProducts,
	removeProduct,
	singleProduct,
	updateProduct,
} from '../controllers/productController.js'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'

const productRouter = express.Router()

productRouter.post(
	'/add',
	adminAuth,
	upload.fields([
		{ name: 'image1', maxCount: 1 },
		{ name: 'image2', maxCount: 1 },
		{ name: 'image3', maxCount: 1 },
		{ name: 'image4', maxCount: 1 },
	]),
	addProduct
)

productRouter.post('/remove', adminAuth, removeProduct)

productRouter.post('/single', singleProduct)

productRouter.get('/list', listProducts)

productRouter.post('/update', adminAuth, updateProduct)

export default productRouter
