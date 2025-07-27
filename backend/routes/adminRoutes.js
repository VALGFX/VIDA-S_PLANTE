import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

// Middleware pentru verificare token + rol admin
const verifyAdmin = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).json({ success: false, message: 'Token mancante' })
		}

		const token = authHeader.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Verificăm dacă tokenul aparține contului de admin
		if (decoded.email !== process.env.ADMIN_EMAIL) {
			return res.status(403).json({ success: false, message: 'Accesso negato' })
		}

		// Atașăm datele în `req.admin` dacă e nevoie
		req.admin = decoded
		next()
	} catch (error) {
		console.error('Admin auth error:', error)
		return res.status(401).json({ success: false, message: 'Token non valido' })
	}
}

// 1. Obține utilizatori neaprobati
router.get('/waiting-users', verifyAdmin, async (req, res) => {
	try {
		const users = await User.find({ isApproved: false }).select('name email')
		res.json({ success: true, users })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

// 2. Aprobă un utilizator
router.post('/approve-user', verifyAdmin, async (req, res) => {
	try {
		const { userId } = req.body
		if (!userId) {
			return res
				.status(400)
				.json({ success: false, message: 'ID utilizator lipsă' })
		}

		const user = await User.findById(userId)
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: 'Utilizator inexistent' })
		}

		user.isApproved = true
		await user.save()

		res.json({ success: true, message: 'Utilizator aprobat cu succes' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

// 3. Șterge un utilizator
router.delete('/delete-user/:id', verifyAdmin, async (req, res) => {
	try {
		const userId = req.params.id
		const user = await User.findByIdAndDelete(userId)
		if (!user) {
			return res
				.status(404)
				.json({ success: false, message: 'Utilizator inexistent' })
		}

		res.json({ success: true, message: 'Utilizator șters cu succes' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})
console.log('JWT_SECRET folosit:', process.env.JWT_SECRET)

export default router
