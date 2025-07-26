import mongoose from 'mongoose'

const verificationCodeSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	code: { type: String, required: true },
	expireAt: { type: Number, required: true },
})

export default mongoose.model('VerificationCode', verificationCodeSchema)
