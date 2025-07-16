import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
	const { backendUrl, token, currency } = useContext(ShopContext)

	const [orderData, setOrderData] = useState([])

	const loadOrderData = async () => {
		try {
			if (!token) return

			const response = await axios.post(
				backendUrl + '/api/order/userorders',
				{},
				{ headers: { token } }
			)

			if (response.data.success) {
				const allOrdersItem = []
				response.data.orders.forEach(order => {
					order.items.forEach(item => {
						item.status = order.status
						item.payment = order.payment
						item.paymentMethod = order.paymentMethod
						item.date = order.date
						allOrdersItem.push(item)
					})
				})
				setOrderData(allOrdersItem.reverse())
			}
		} catch (error) {
			console.error('Errore nel caricamento degli ordini:', error)
		}
	}

	useEffect(() => {
		loadOrderData()
	}, [token])

	return (
		<div className='min-h-screen bg-gradient-to-b  via-white to-indigo-50 py-24 px-6'>
			<div className='max-w-full mx-auto'>
				<header className='text-left text-2xl'>
					<Title text1='I MIEI' text2='ORDINI' />
				</header>

				{orderData.length === 0 ? (
					<p className='text-center text-gray-400 italic text-xl'>
						Nessun ordine trovato.
					</p>
				) : (
					<div className='space-y-12'>
						{orderData.map((item, idx) => (
							<article
								key={idx}
								className='flex flex-col md:flex-row justify-between items-center bg-white rounded-3xl shadow-2xl border border-gray-100 transition-transform transform hover:-translate-y-1 hover:shadow-3xl duration-500 ease-in-out p-8 gap-8'
							>
								<div className='flex items-center gap-8 md:gap-12 flex-1'>
									<div className='w-28 h-28 rounded-2xl overflow-hidden shadow-lg flex-shrink-0'>
										<img
											src={item.image[0]}
											alt={item.name}
											className='object-cover w-full h-full transition-transform duration-500 hover:scale-110'
											loading='lazy'
										/>
									</div>
									<div>
										<h3 className='text-2xl font-semibold text-gray-900'>
											{item.name}
										</h3>
										<div className='mt-3 flex flex-wrap gap-6 text-gray-700 text-base font-medium'>
											<p>
												Prezzo:{' '}
												<span className='text-green-600 font-bold'>
													{currency}
													{item.price.toFixed(2)}
												</span>
											</p>
											<p>Quantità: {item.quantity}</p>
											<p>Taglia: {item.size}</p>
										</div>
										<p className='mt-4 text-sm text-gray-500'>
											📅{' '}
											<time dateTime={item.date}>
												Data ordine:{' '}
												{new Date(item.date).toLocaleDateString('it-IT')}
											</time>
										</p>
										<p className='mt-1 text-sm text-gray-500'>
											💳 Metodo pagamento:{' '}
											<span className='capitalize'>{item.paymentMethod}</span>
										</p>
									</div>
								</div>

								<div className='flex flex-col items-center gap-6 md:w-48'>
									<div className='flex items-center gap-3'>
										<span
											className={`inline-block w-4 h-4 rounded-full ${
												item.status.toLowerCase() === 'consegnato'
													? 'bg-green-500'
													: item.status.toLowerCase() === 'in elaborazione'
													? 'bg-yellow-400'
													: 'bg-gray-400'
											}`}
											aria-label={`Stato ordine: ${item.status}`}
										/>
										<p className='text-lg font-semibold text-gray-800 capitalize'>
											{item.status}
										</p>
									</div>
								</div>
							</article>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Orders
