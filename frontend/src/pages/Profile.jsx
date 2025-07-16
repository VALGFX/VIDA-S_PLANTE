import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const AuthCheckPage = () => {
	const { token, logoutUser } = useContext(ShopContext)

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
			{token ? (
				<>
					<h2>Esti autentificat!</h2>
					<button
						onClick={logoutUser}
						style={{ padding: '10px 20px', cursor: 'pointer' }}
					>
						Deconectare
					</button>
				</>
			) : (
				<h2>Nu ești autentificat.</h2>
			)}
		</div>
	)
}

export default AuthCheckPage
