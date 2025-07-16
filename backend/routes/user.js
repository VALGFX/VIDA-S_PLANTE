// routes/user.js
import express from 'express'
import verifyToken from '../middleware/verifyToken.js' // middleware verificare JWT
import User from '../models/User.js'

const router = express.Router()

// Endpoint pentru a returna datele utilizatorului logat
router.get('/profile', verifyToken, async (req, res) => {
	try {
		// req.userId vine din verifyToken, care decodează tokenul și pune userId în request
		const user = await User.findById(req.userId).select('-password') // exclude parola
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}
		res.json({ success: true, user })
	} catch (error) {
		console.error(error)
		res.status(500).json({ success: false, message: 'Server error' })
	}
})

export default router
