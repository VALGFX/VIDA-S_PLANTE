import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String },
		street: { type: String },
		city: { type: String },
		state: { type: String },
		zipcode: { type: String },
		country: { type: String },
		cartData: { type: Object, default: {} },
		isApproved: { type: Boolean, default: false },
	},
	{ minimize: false }
)

const userModel = mongoose.models.user || mongoose.model('user', userSchema)

export default userModel
