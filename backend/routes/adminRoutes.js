import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const router = express.Router()

// Middleware simplu pentru verificare token admin (exemplu)
const verifyAdmin = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader)
			return res
				.status(401)
				.json({ success: false, message: 'No token provided' })

		const token = authHeader.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		// Aici poți face verificări suplimentare dacă token-ul are rol admin
		// De exemplu, dacă token conține un câmp 'role' === 'admin'
		// Dacă nu ai, poți face o comparație simplă cu un email sau ceva

		next()
	} catch (error) {
		return res.status(401).json({ success: false, message: 'Invalid token' })
	}
}

// 1. GET utilizatori în așteptare
router.get('/waiting-users', verifyAdmin, async (req, res) => {
	try {
		const users = await User.find({ isApproved: false }).select('name email')
		res.json({ success: true, users })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

// 2. POST aprobare utilizator
router.post('/approve-user', verifyAdmin, async (req, res) => {
	try {
		const { userId } = req.body
		if (!userId)
			return res
				.status(400)
				.json({ success: false, message: 'userId is required' })

		const user = await User.findById(userId)
		if (!user)
			return res.status(404).json({ success: false, message: 'User not found' })

		user.isApproved = true
		await user.save()

		res.json({ success: true, message: 'User approved successfully' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

// 3. DELETE ștergere utilizator
router.delete('/delete-user/:id', verifyAdmin, async (req, res) => {
	try {
		const userId = req.params.id
		const user = await User.findByIdAndDelete(userId)
		if (!user)
			return res.status(404).json({ success: false, message: 'User not found' })

		res.json({ success: true, message: 'User deleted successfully' })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router
