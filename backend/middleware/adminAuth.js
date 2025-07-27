import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
	try {
		const token = req.headers.token || req.headers.authorization
		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Not Authorized. Please log in again.',
			})
		}

		const actualToken = token.startsWith('Bearer ')
			? token.split(' ')[1]
			: token

		const decoded = jwt.verify(actualToken, process.env.JWT_SECRET)

		// Decodificarea ar trebui să conțină datele cu care ai semnat tokenul.
		// Presupun că la login semnezi un obiect, nu un string concatenat.
		// Deci verifici dacă decoded.email este admin-ul
		if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) {
			return res.status(403).json({
				success: false,
				message: 'Not Authorized. Please log in again.',
			})
		}

		// Poți salva userul admin în req pentru folosire ulterioară
		req.adminEmail = decoded.email

		next()
	} catch (error) {
		console.error('Admin auth error:', error)
		res.status(401).json({
			success: false,
			message: 'Invalid or expired token. Please log in again.',
		})
	}
}

export default adminAuth
