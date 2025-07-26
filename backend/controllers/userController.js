import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import validator from 'validator'
import userModel from '../models/userModel.js'
import VerificationCode from '../models/verificationCodeModel.js'

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
		const { name, email, password, company } = req.body

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
			company,
			isApproved: false,
		})

		await newUser.save()

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

// Trimite codul de verificare pe email
const sendVerificationCode = async (req, res) => {
	try {
		const { email } = req.body
		if (!email) return res.status(400).json({ message: 'Lipsește email' })

		const code = Math.floor(100000 + Math.random() * 900000).toString()
		const expireAt = Date.now() + 10 * 60 * 1000 // 10 minute

		await VerificationCode.findOneAndUpdate(
			{ email },
			{ code, expireAt },
			{ upsert: true, new: true }
		)

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})

		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: 'Codul tău de verificare VIDA-S Plante',
			text: `Codul tău de verificare este: ${code}. Este valabil 10 minute.`,
		}

		await transporter.sendMail(mailOptions)

		res.json({ message: 'Cod trimis pe email' })
	} catch (error) {
		console.error('Eroare la trimiterea codului:', error)
		res.status(500).json({ message: 'Eroare la trimiterea codului' })
	}
}

// Verifică codul trimis
const verifyCode = async (req, res) => {
	try {
		let { email, code } = req.body

		if (!email || !code) {
			return res.status(400).json({ message: 'Lipsește email sau cod' })
		}

		code = code.trim()

		const record = await VerificationCode.findOne({ email })

		if (!record) {
			return res.status(400).json({ message: 'Codul nu există sau a expirat' })
		}

		if (record.code !== code) {
			return res.status(400).json({ message: 'Codul este greșit' })
		}

		if (Date.now() > record.expireAt) {
			await VerificationCode.deleteOne({ email })
			return res.status(400).json({ message: 'Codul a expirat' })
		}

		await VerificationCode.deleteOne({ email })

		res.json({ message: 'Verificare cod success' })
	} catch (error) {
		console.error('Eroare la verificarea codului:', error)
		res.status(500).json({ message: 'Eroare la verificarea codului' })
	}
}

export { adminLogin, loginUser, registerUser, sendVerificationCode, verifyCode }
