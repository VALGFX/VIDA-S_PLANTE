import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
	const [currentState, setCurrentState] = useState('Login')
	const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const onSubmitHandler = async event => {
		event.preventDefault()
		setLoading(true)
		try {
			if (currentState === 'Sign Up') {
				const response = await axios.post(backendUrl + '/api/user/register', {
					name,
					email,
					password,
				})

				if (response.data.success) {
					if (response.data.token) {
						setToken(response.data.token)
						localStorage.setItem('token', response.data.token)
						toast.success('Registrazione completata con successo!')
						navigate('/')
					} else {
						toast.info(
							"Registrazione riuscita. Attendere l'approvazione dell'amministrazione."
						)
					}
				} else {
					toast.error(response.data.message)
				}
			} else {
				const response = await axios.post(backendUrl + '/api/user/login', {
					email,
					password,
				})

				if (response.data.success) {
					if (response.data.token) {
						setToken(response.data.token)
						localStorage.setItem('token', response.data.token)
						toast.success('Accesso effettuato con successo!')
						navigate('/')
					} else {
						toast.error(
							"Il tuo account non è ancora stato approvato. Attendere l'approvazione dell'amministratore."
						)
					}
				} else {
					toast.error(response.data.message)
				}
			}
		} catch (error) {
			console.error(error)
			toast.error(
				error.response?.data?.message ||
					error.message ||
					'Qualcosa è andato storto'
			)
		}
		setLoading(false)
	}

	useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [token])

	return (
		<>
			{/* Background + overlay */}
			<div
				className="fixed inset-0 bg-[url('/mountains.jpg')] bg-cover bg-center z-[-2]"
				aria-hidden='true'
			/>
			<div
				className='fixed inset-0 bg-[rgba(35,36,58,0.85)] backdrop-blur-sm z-[-1]'
				aria-hidden='true'
			/>

			<div className='min-h-screen flex items-center justify-center px-6 font-sans text-white'>
				<div className='relative max-w-lg w-full bg-[#1E1E1E] rounded-3xl shadow-2xl flex flex-col p-10 cursor-default'>
					<div className='mb-6'>
						<p className='text-gray-400 uppercase tracking-widest text-xs font-semibold mb-1'>
							Benvenuto su
						</p>
						<h1 className='text-4xl font-extrabold mb-3 select-none'>
							The <span className='text-green-500/70'>VIDA-S Plante</span>{' '}
							{currentState === 'Login' ? 'Accesso' : 'Registrazione'}
						</h1>
						<p className='text-gray-400 mb-8'>
							{currentState === 'Login'
								? 'Accedi al tuo account per continuare.'
								: 'Crea un nuovo account per iniziare.'}
						</p>
					</div>

					<form
						className='flex flex-col gap-5'
						onSubmit={onSubmitHandler}
						noValidate
					>
						{currentState === 'Sign Up' && (
							<div className='relative'>
								<input
									type='text'
									placeholder='Nome'
									className='w-full bg-[rgba(46,50,77,0.85)] text-white rounded-xl py-2.5 pl-10 pr-4 border border-transparent focus:border-green-500 focus:bg-[rgba(57,68,99,0.9)] transition'
									value={name}
									onChange={e => setName(e.target.value)}
									required
									disabled={loading}
								/>
								<svg
									className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none'
									xmlns='http://www.w3.org/2000/svg'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
								</svg>
							</div>
						)}

						<div className='relative'>
							<input
								type='email'
								placeholder='Email'
								className='w-full bg-[rgba(46,50,77,0.85)] text-white rounded-xl py-2.5 pl-10 pr-4 border border-transparent focus:border-green-500 focus:bg-[rgba(57,68,99,0.9)] transition'
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
								disabled={loading}
							/>
							<svg
								className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16z' />
							</svg>
						</div>

						<div className='relative'>
							<input
								type='password'
								placeholder='Password'
								className='w-full bg-[rgba(46,50,77,0.85)] text-white rounded-xl py-2.5 pl-10 pr-4 border border-transparent focus:border-green-500 focus:bg-[rgba(57,68,99,0.9)] transition'
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
								minLength={6}
								disabled={loading}
							/>
							<svg
								className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 pointer-events-none'
								xmlns='http://www.w3.org/2000/svg'
								fill='currentColor'
								viewBox='0 0 24 24'
							>
								<path d='M12 17a2 2 0 002-2v-2a2 2 0 10-4 0v2a2 2 0 002 2zm6-6h-1V7a5 5 0 10-10 0v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z' />
							</svg>
						</div>

						<div className='flex justify-between text-sm -mt-2'>
							<p className='cursor-pointer hover:underline'>
								Hai dimenticato la password?
							</p>
							{currentState === 'Login' ? (
								<p
									onClick={() => setCurrentState('Sign Up')}
									className='cursor-pointer hover:underline'
								>
									Crea un account
								</p>
							) : (
								<p
									onClick={() => setCurrentState('Login')}
									className='cursor-pointer hover:underline'
								>
									Hai già un account? Accedi
								</p>
							)}
						</div>

						<button
							type='submit'
							disabled={loading}
							className='mt-6 bg-green-600 hover:bg-green-700 transition rounded-xl py-3 font-semibold text-white disabled:opacity-70 disabled:cursor-not-allowed'
						>
							{loading
								? currentState === 'Login'
									? 'Accesso in corso...'
									: 'Registrazione in corso...'
								: currentState === 'Login'
								? 'Accedi'
								: 'Registrati'}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
