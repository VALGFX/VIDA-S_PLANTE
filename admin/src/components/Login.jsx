import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Login = ({ setToken }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [focusedInput, setFocusedInput] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const handleLogin = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await axios.post(`${backendUrl}/api/user/admin`, {
				email,
				password,
			})

			if (response.data.success) {
				setToken(response.data.token)
				toast.success('Accesso effettuato con successo!')
				navigate('/dashboard')
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error(error.response?.data?.message || "Errore durante l'accesso.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div
				className="fixed inset-0 bg-[url('/mountains.jpg')] bg-cover bg-center z-[-2]"
				aria-hidden='true'
			/>
			<div
				className='fixed inset-0 bg-[rgba(35,36,58,0.85)] backdrop-blur-sm z-[-1]'
				aria-hidden='true'
			/>
			<div className='min-h-screen flex items-center justify-center px-6 text-white font-sans'>
				<div className='w-full max-w-xl bg-[#1E1E1E] p-8 rounded-3xl shadow-2xl'>
					<h3 className='text-sm tracking-widest uppercase text-gray-400 font-semibold mb-2'>
						Benvenuti a
					</h3>
					<h1 className='text-3xl font-extrabold mb-4 leading-tight select-none'>
						VIDA-S <span className='text-green-500'>Login</span>
					</h1>
					<p className='text-sm text-gray-400 mb-6'>
						Accedi al tuo account amministratore.
					</p>

					<form onSubmit={handleLogin} className='space-y-4'>
						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setFocusedInput('email')}
							onBlur={() => setFocusedInput(null)}
							className={`w-full px-4 py-2 rounded-xl border text-sm font-medium 
								bg-[rgba(46,50,77,0.85)] placeholder-white text-white outline-none
								${
									focusedInput === 'email'
										? 'border-green-500 bg-[rgba(57,68,99,0.9)]'
										: 'border-transparent'
								}`}
							required
						/>

						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							onFocus={() => setFocusedInput('password')}
							onBlur={() => setFocusedInput(null)}
							className={`w-full px-4 py-2 rounded-xl border text-sm font-medium 
								bg-[rgba(46,50,77,0.85)] placeholder-white text-white outline-none
								${
									focusedInput === 'password'
										? 'border-green-500 bg-[rgba(57,68,99,0.9)]'
										: 'border-transparent'
								}`}
							required
						/>

						<button
							type='submit'
							className='w-full py-3 rounded-full font-bold text-lg bg-green-600 hover:bg-green-700 transition-colors duration-300'
							disabled={loading}
						>
							{loading ? 'Accesso in corso...' : 'Accedi'}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
