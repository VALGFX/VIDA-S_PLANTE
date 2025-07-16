import { v2 as cloudinary } from 'cloudinary'
import productModel from '../models/productModel.js'

// 🔸 Adăugare produs
const addProduct = async (req, res) => {
	try {
		const {
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestseller,
		} = req.body

		const image1 = req.files.image1?.[0]
		const image2 = req.files.image2?.[0]
		const image3 = req.files.image3?.[0]
		const image4 = req.files.image4?.[0]

		const images = [image1, image2, image3, image4].filter(Boolean)

		const imagesUrl = await Promise.all(
			images.map(async file => {
				const result = await cloudinary.uploader.upload(file.path, {
					resource_type: 'image',
				})
				return result.secure_url
			})
		)

		const productData = {
			name,
			description,
			category,
			subCategory,
			price: Number(price),
			bestseller: bestseller === 'true',
			sizes: JSON.parse(sizes),
			image: imagesUrl,
			date: Date.now(),
		}

		const product = new productModel(productData)
		await product.save()

		res.json({ success: true, message: 'Produs adăugat cu succes' })
	} catch (error) {
		console.error(error)
		res.json({ success: false, message: error.message })
	}
}

// 🔹 Listare produse
const listProducts = async (req, res) => {
	try {
		// folosim lean() ca să ne asigurăm că _id este inclus ca string și nu ObjectId
		const products = await productModel.find({}).lean()
		res.json({ success: true, products })
	} catch (error) {
		console.error(error)
		res.json({ success: false, message: error.message })
	}
}

// 🔹 Ștergere produs
const removeProduct = async (req, res) => {
	try {
		const id = req.body.id || req.body._id
		if (!id)
			return res.json({ success: false, message: 'ID lipsă pentru ștergere' })

		await productModel.findByIdAndDelete(id)
		res.json({ success: true, message: 'Produs șters cu succes' })
	} catch (error) {
		console.error(error)
		res.json({ success: false, message: error.message })
	}
}

// 🔹 Informații produs individual
const singleProduct = async (req, res) => {
	try {
		const { productId } = req.body
		const product = await productModel.findById(productId)
		res.json({ success: true, product })
	} catch (error) {
		console.error(error)
		res.json({ success: false, message: error.message })
	}
}

// 🔹 Actualizare produs
const updateProduct = async (req, res) => {
	try {
		let {
			_id,
			id,
			name,
			description,
			price,
			category,
			subCategory,
			sizes,
			bestseller,
			image, // array de linkuri (dacă nu se face upload nou)
		} = req.body

		const finalId = _id || id
		if (!finalId) return res.json({ success: false, message: 'ID lipsă' })

		const product = await productModel.findById(finalId)
		if (!product)
			return res.json({ success: false, message: 'Produs inexistent' })

		// Parsăm stringuri venite prin FormData
		if (typeof sizes === 'string') sizes = JSON.parse(sizes)
		if (typeof bestseller === 'string') bestseller = bestseller === 'true'

		let uploadedImageUrl = null

		// 1. Imagine încărcată cu .single('image')
		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, {
				resource_type: 'image',
			})
			uploadedImageUrl = result.secure_url
		}

		// 2. Sau dacă se trimite ca .files.image (cu .array('image'))
		if (req.files?.image?.[0]) {
			const result = await cloudinary.uploader.upload(req.files.image[0].path, {
				resource_type: 'image',
			})
			uploadedImageUrl = result.secure_url
		}

		// Actualizăm câmpurile
		if (name) product.name = name
		if (description) product.description = description
		if (category) product.category = category
		if (subCategory) product.subCategory = subCategory
		if (price) product.price = Number(price)
		if (sizes) product.sizes = sizes
		if (typeof bestseller === 'boolean') product.bestseller = bestseller

		// Imagine: nouă sau existentă
		if (uploadedImageUrl) {
			product.image = [uploadedImageUrl]
		} else if (Array.isArray(image) && image.length > 0) {
			product.image = image
		}

		await product.save()

		res.json({ success: true, message: 'Produs actualizat cu succes' })
	} catch (error) {
		console.error(error)
		res.json({ success: false, message: error.message })
	}
}

export { addProduct, listProducts, removeProduct, singleProduct, updateProduct }
