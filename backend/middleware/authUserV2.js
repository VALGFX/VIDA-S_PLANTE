import userModel from '../models/userModel.js'

const getUserProfileV2 = async (req, res) => {
	try {
		const user = await userModel.findById(req.user.id).select('-password -__v')

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' })
		}

		res.json({ success: true, user })
	} catch (error) {
		console.error('Error fetching user profile V2:', error.message)
		res.status(500).json({ success: false, message: 'Server error' })
	}
}

export { getUserProfileV2 }
