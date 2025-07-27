import userModel from '../models/userModel.js'

// Obține utilizatorii care nu sunt aprobați
export const getWaitingUsers = async (req, res) => {
	try {
		const users = await userModel.find({ isApproved: false }, 'name email')
		res.json({ success: true, users })
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}

// Aprobare utilizator
export const approveUser = async (req, res) => {
	try {
		const { userId } = req.body
		const updatedUser = await userModel.findByIdAndUpdate(userId, {
			isApproved: true,
		})

		if (!updatedUser) {
			return res.json({
				success: false,
				message: 'Utilizatorul nu a fost găsit',
			})
		}

		res.json({ success: true, message: 'Utilizatorul a fost aprobat' })
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
}
