import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
import userModel from '../models/userModel.js'

// Creează token JWT
const createToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Login utilizator
const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await userModel.findOne({ email })

		if (!user) {
			return res.json({ success: false, message: "User doesn't exist" })
		}

		if (!user.isApproved) {
			return res.json({
				success: false,
				message: 'Your account is not approved yet.',
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (isMatch) {
			const token = createToken(user._id)
			res.json({ success: true, token })
		} else {
			res.json({ success: false, message: 'Invalid credentials' })
		}
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}

// Înregistrare utilizator
const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body

		const exists = await userModel.findOne({ email })
		if (exists) {
			return res.json({ success: false, message: 'User already exists' })
		}

		if (!validator.isEmail(email)) {
			return res.json({ success: false, message: 'Please enter a valid email' })
		}
		if (password.length < 8) {
			return res.json({
				success: false,
				message: 'Please enter a strong password',
			})
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
			isApproved: false,
		})

		const user = await newUser.save()

		res.json({
			success: true,
			message: 'Registration successful! Wait for admin approval.',
		})
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}

// Login admin
const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body

		if (
			email === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			})
			res.json({ success: true, token })
		} else {
			res.json({ success: false, message: 'Invalid credentials' })
		}
	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
}

// Obține profilul utilizatorului (fără parola)
const getUserProfile = async (req, res) => {
	try {
		const userId = req.user.id
		const user = await userModel.findById(userId).select('-password')
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}
		res.json({ success: true, user })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
}

export { adminLogin, getUserProfile, loginUser, registerUser }
