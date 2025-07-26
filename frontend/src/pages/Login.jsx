import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
	const [currentState, setCurrentState] = useState('Login')
	const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [company, setCompany] = useState('')
	const [verificationCode, setVerificationCode] = useState('')
	const [codeSent, setCodeSent] = useState(false)
	const [codeVerified, setCodeVerified] = useState(false)
	const [loading, setLoading] = useState(false)

	const sendCodeToEmail = async () => {
		if (!email.includes('@')) return

		try {
			await axios.post(backendUrl + '/api/send-code', { email })
			setCodeSent(true)
			toast.success('Il codice di verifica è stato inviato via email!')
		} catch (err) {
			console.error(err)
			toast.error("Errore nell'invio del codice")
		}
	}

	const verifyEmailCode = async () => {
		try {
			const response = await axios.post(backendUrl + '/api/verify-code', {
				email,
				code: verificationCode,
			})

			if (response.data.message.includes('success')) {
				setCodeVerified(true)
				toast.success('Il codice è stato verificato con successo!')
			} else {
				setCodeVerified(false)
				toast.error('Il codice è errato o scaduto')
			}
		} catch (err) {
			console.error(err)
			toast.error('Errore nella verifica del codice')
		}
	}

	const onSubmitHandler = async event => {
		event.preventDefault()
		setLoading(true)

		try {
			if (currentState === 'Sign Up') {
				if (!codeVerified) {
					toast.warn('Devi prima verificare la tua email!')
					setLoading(false)
					return
				}

				const response = await axios.post(backendUrl + '/api/user/register', {
					name,
					email,
					password,
					company,
				})

				if (response.data.success) {
					if (response.data.token) {
						setToken(response.data.token)
						localStorage.setItem('token', response.data.token)
						toast.success('Registrazione completata!')
						navigate('/')
					} else {
						toast.info(
							"Account creato. Attendi l'approvazione dell'amministratore."
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
						toast.error('Il tuo account non è ancora stato approvato.')
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
					'Qualcosa è andato storto.'
			)
		}

		setLoading(false)
	}

	useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [token])

	const Spinner = () => (
		<div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin' />
	)

	return (
		<>
			{/* Background image with dark overlay and subtle blur */}
			<div className="fixed inset-0 bg-[url('/mountains.jpg')] bg-cover bg-center z-[-2]" />
			<div className='fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-[-1]' />

			<div className='min-h-screen flex items-center justify-center px-6 font-sans text-white'>
				<div
					className='relative max-w-md w-full bg-[#121212cc] rounded-xl shadow-lg
					p-8
					backdrop-blur-md
					border border-gray-700'
				>
					<div className='mb-6 text-center'>
						<p className='uppercase tracking-widest text-xs font-semibold mb-1 text-gray-400'>
							VIDA-S Plante
						</p>
						<h1 className='text-3xl font-bold mb-2'>
							{currentState === 'Login' ? 'Accesso' : 'Registrazione'}
						</h1>
						<p className='text-gray-400 text-sm'>
							{currentState === 'Login'
								? 'Accedi al tuo account.'
								: 'Crea un account per continuare.'}
						</p>
					</div>

					<form
						className='flex flex-col gap-4'
						onSubmit={onSubmitHandler}
						noValidate
					>
						{currentState === 'Sign Up' && (
							<>
								<input
									type='text'
									placeholder='Nome completo'
									className='bg-[#222] rounded-md py-3 px-4 placeholder-gray-500 text-white
									focus:outline-none focus:ring-2 focus:ring-green-600'
									value={name}
									onChange={e => setName(e.target.value)}
									required
									disabled={loading}
								/>
								<input
									type='text'
									placeholder='Azienda'
									className='bg-[#222] rounded-md py-3 px-4 placeholder-gray-500 text-white
									focus:outline-none focus:ring-2 focus:ring-green-600'
									value={company}
									onChange={e => setCompany(e.target.value)}
									required
									disabled={loading}
								/>
							</>
						)}

						<input
							type='email'
							placeholder='Email'
							className='bg-[#222] rounded-md py-3 px-4 placeholder-gray-500 text-white
							focus:outline-none focus:ring-2 focus:ring-green-600'
							value={email}
							onChange={e => setEmail(e.target.value)}
							onBlur={sendCodeToEmail}
							required
							disabled={loading}
						/>

						{currentState === 'Sign Up' && (
							<div className='relative'>
								<input
									type='text'
									placeholder='Codice di verifica email'
									className='bg-[#222] rounded-md py-3 px-4 placeholder-gray-500 text-white pr-28
									focus:outline-none focus:ring-2 focus:ring-green-600'
									value={verificationCode}
									onChange={e => setVerificationCode(e.target.value)}
									disabled={!codeSent || loading}
								/>
								<button
									type='button'
									onClick={verifyEmailCode}
									className='absolute right-2 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700
									text-white text-xs rounded px-3 py-1 transition'
								>
									Verifica
								</button>
							</div>
						)}

						<input
							type='password'
							placeholder='Password'
							className='bg-[#222] rounded-md py-3 px-4 placeholder-gray-500 text-white
							focus:outline-none focus:ring-2 focus:ring-green-600'
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
							minLength={6}
							disabled={loading}
						/>

						{/* Responsive container for links */}
						<div className='flex flex-col sm:flex-row justify-between items-center gap-3 mt-[-8px] text-sm'>
							<p className='cursor-pointer hover:underline hover:text-green-400 transition text-center sm:text-left w-full sm:w-auto'>
								Hai dimenticato la password?
							</p>
							<p
								onClick={() =>
									setCurrentState(
										currentState === 'Login' ? 'Sign Up' : 'Login'
									)
								}
								className='cursor-pointer hover:underline hover:text-green-400 transition text-center sm:text-right w-full sm:w-auto'
							>
								{currentState === 'Login'
									? 'Non hai un account? Registrati'
									: 'Hai già un account? Accedi'}
							</p>
						</div>

						<button
							type='submit'
							disabled={loading}
							className='mt-6 bg-green-600 hover:bg-green-700 rounded-md py-3 font-semibold text-white
							disabled:opacity-70 disabled:cursor-not-allowed transition'
						>
							{loading ? (
								<span className='flex items-center justify-center gap-2'>
									<Spinner />
									{currentState === 'Login'
										? 'Accesso in corso...'
										: 'Registrazione in corso...'}
								</span>
							) : currentState === 'Login' ? (
								'Accesso'
							) : (
								'Registrazione'
							)}
						</button>

						{currentState === 'Sign Up' && !codeVerified && (
							<p className='text-xs text-gray-400 text-center mt-4'>
								Il codice è stato inviato. Controlla la tua casella di posta.
								Dopo la creazione, il tuo account sarà approvato manualmente.
								Puoi controllare lo stato{' '}
								<a
									href='/verificare-account'
									className='text-green-400 underline'
								>
									qui
								</a>
								.
							</p>
						)}
					</form>
				</div>
			</div>

			<ToastContainer />
		</>
	)
}

export default Login
