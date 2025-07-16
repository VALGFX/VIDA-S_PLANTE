import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AdminPanel = () => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL
	const [token, setToken] = useState(localStorage.getItem('token') || '')
	const navigate = useNavigate()
	const [waitingUsers, setWaitingUsers] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!token) {
			navigate('/login')
			return
		}

		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					`${backendUrl}/api/admin/waiting-users`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				if (response.data.success) {
					setWaitingUsers(response.data.users)
				} else {
					toast.error('Impossibile caricare gli utenti')
				}
			} catch (error) {
				console.error(error)
				toast.error('Errore nel caricamento degli utenti')
			} finally {
				setLoading(false)
			}
		}

		fetchUsers()
	}, [token, backendUrl, navigate])

	const approveUser = async userId => {
		try {
			const response = await axios.post(
				`${backendUrl}/api/admin/approve-user`,
				{ userId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			if (response.data.success) {
				toast.success('Utente approvato con successo')
				setWaitingUsers(prev => prev.filter(u => u._id !== userId))
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.error(error)
			toast.error("Errore durante l'approvazione")
		}
	}

	const deleteUser = async userId => {
		try {
			const response = await axios.delete(
				`${backendUrl}/api/admin/delete-user/${userId}`,
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			if (response.data.success) {
				toast.success('Utente eliminato con successo')
				setWaitingUsers(prev => prev.filter(u => u._id !== userId))
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.error(error)
			toast.error("Errore durante l'eliminazione")
		}
	}

	if (loading)
		return (
			<p style={{ padding: 20, textAlign: 'center', fontSize: 18 }}>
				Caricamento utenti in corso...
			</p>
		)

	return (
		<div
			style={{
				maxWidth: 1000,
				margin: '40px auto',
				padding: '0 24px',
				fontFamily: 'Inter, sans-serif',
				color: '#1e1e1e',
			}}
		>
			<h1
				style={{
					fontSize: 36,
					fontWeight: 700,
					marginBottom: 32,
					textAlign: 'center',
					color: '#1a202c',
				}}
			>
				👤 Pannello Amministrazione — Utenti in Attesa
			</h1>

			{waitingUsers.length === 0 ? (
				<p style={{ textAlign: 'center', fontSize: 18, color: '#777' }}>
					Nessun utente in attesa di approvazione.
				</p>
			) : (
				<ul
					style={{
						listStyle: 'none',
						padding: 0,
						display: 'flex',
						flexDirection: 'column',
						gap: 20,
					}}
				>
					{waitingUsers.map(user => (
						<li
							key={user._id}
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								background: 'linear-gradient(to right, #f9fafb, #f1f5f9)',
								padding: '20px 28px',
								borderRadius: 12,
								boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
								transition: 'transform 0.2s ease',
							}}
							onMouseEnter={e =>
								(e.currentTarget.style.transform = 'scale(1.015)')
							}
							onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
						>
							<div>
								<p style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>
									{user.name}
								</p>
								<p style={{ fontSize: 14, color: '#444' }}>{user.email}</p>
								<span
									style={{
										marginTop: 8,
										display: 'inline-block',
										backgroundColor: '#eab308',
										color: '#fff',
										padding: '4px 12px',
										borderRadius: 20,
										fontSize: 12,
										fontWeight: 600,
										marginTop: 6,
									}}
								>
									In attesa di approvazione
								</span>
							</div>

							<div style={{ display: 'flex', gap: 12 }}>
								<button
									onClick={() => approveUser(user._id)}
									style={{
										backgroundColor: '#10b981',
										color: '#fff',
										border: 'none',
										borderRadius: 8,
										padding: '10px 20px',
										fontWeight: 600,
										cursor: 'pointer',
										transition: 'background-color 0.2s ease',
									}}
									onMouseEnter={e =>
										(e.currentTarget.style.backgroundColor = '#059669')
									}
									onMouseLeave={e =>
										(e.currentTarget.style.backgroundColor = '#10b981')
									}
								>
									Approva
								</button>
								<button
									onClick={() => deleteUser(user._id)}
									style={{
										backgroundColor: '#ef4444',
										color: '#fff',
										border: 'none',
										borderRadius: 8,
										padding: '10px 20px',
										fontWeight: 600,
										cursor: 'pointer',
										transition: 'background-color 0.2s ease',
									}}
									onMouseEnter={e =>
										(e.currentTarget.style.backgroundColor = '#dc2626')
									}
									onMouseLeave={e =>
										(e.currentTarget.style.backgroundColor = '#ef4444')
									}
								>
									Elimina
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default AdminPanel
