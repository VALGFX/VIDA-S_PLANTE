import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {
	const [orders, setOrders] = useState([])
	const navigate = useNavigate()

	const fetchAllOrders = async () => {
		if (!token) {
			navigate('/login')
			return
		}

		try {
			const response = await axios.post(
				backendUrl + '/api/order/list',
				{},
				{ headers: { token } }
			)
			if (response.data.success) {
				setOrders(response.data.orders.reverse())
			} else {
				if (response.data.message.toLowerCase().includes('not authorized')) {
					navigate('/login')
				} else {
					toast.error(response.data.message)
				}
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				navigate('/login')
			} else {
				toast.error(error.message)
			}
		}
	}

	const statusHandler = async (event, orderId) => {
		try {
			const response = await axios.post(
				backendUrl + '/api/order/status',
				{ orderId, status: event.target.value },
				{ headers: { token } }
			)
			if (response.data.success) {
				await fetchAllOrders()
				toast.success('Stato aggiornato con successo.')
			} else {
				if (response.data.message.toLowerCase().includes('not authorized')) {
					navigate('/login')
				} else {
					toast.error(response.data.message)
				}
			}
		} catch (error) {
			if (error.response && error.response.status === 401) {
				navigate('/login')
			} else {
				toast.error(error.message)
			}
		}
	}

	useEffect(() => {
		if (token) {
			fetchAllOrders()
		} else {
			navigate('/login')
		}
	}, [token])

	return (
		<div className='max-w-6xl mx-auto px-4 py-8'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-6'>
				📦 Ordini recenti
			</h2>

			{orders.length === 0 ? (
				<p className='text-center text-gray-600'>Nessun ordine trovato.</p>
			) : (
				<div className='space-y-6'>
					{orders.map((order, index) => (
						<div
							key={index}
							className='bg-white border border-gray-200 rounded-xl shadow-sm p-5 md:p-6 grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:grid-cols-[0.5fr_2.5fr_1fr_1fr_1fr] gap-4 items-start hover:shadow-md transition'
						>
							<img
								src={assets.parcel_icon}
								alt='Parcel'
								className='w-12 h-12 object-contain mx-auto sm:mx-0'
							/>

							<div>
								{order.items.map((item, i) => (
									<p key={i} className='text-sm text-gray-700'>
										{item.name} x {item.quantity}{' '}
										{item.size && <span>({item.size})</span>}
										{i !== order.items.length - 1 ? ', ' : ''}
									</p>
								))}

								<div className='mt-4 text-sm text-gray-600 space-y-1'>
									<p className='font-medium text-gray-800'>
										{order.address.firstName} {order.address.lastName}
									</p>
									<p>{order.address.street}</p>
									<p>
										{order.address.city}, {order.address.state},{' '}
										{order.address.country}, {order.address.zipcode}
									</p>
									<p>📞 {order.address.phone}</p>
								</div>
							</div>

							<div className='text-sm text-gray-700 space-y-1'>
								<p>🛒 Articoli: {order.items.length}</p>
								<p>💳 Metodo: {order.paymentMethod}</p>
								<p>
									{order.payment ? '✅ Pagamento effettuato' : '⏳ In attesa'}
								</p>
								<p>📅 {new Date(order.date).toLocaleDateString()}</p>
							</div>

							<div className='text-lg font-semibold text-gray-800'>
								{currency}
								{order.amount}
							</div>

							<select
								value={order.status}
								onChange={e => statusHandler(e, order._id)}
								className='px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm'
							>
								<option value='Order Placed'>📌 Ordine ricevuto</option>
								<option value='Packing'>📦 In preparazione</option>
								<option value='Shipped'>🚚 Spedito</option>
								<option value='Out for delivery'>📍 In consegna</option>
								<option value='Delivered'>✅ Consegnato</option>
							</select>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Orders
