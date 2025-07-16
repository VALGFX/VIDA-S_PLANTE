import { useContext, useEffect, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {
	const { products, currency, cartItems, updateQuantity, navigate } =
		useContext(ShopContext)
	const [cartData, setCartData] = useState([])

	useEffect(() => {
		if (products.length > 0) {
			const tempData = Object.entries(cartItems)
				.filter(([_, quantity]) => quantity > 0)
				.map(([productId, quantity]) => ({
					_id: productId,
					quantity: quantity,
				}))
			setCartData(tempData)
		}
	}, [cartItems, products])

	const handleCheckout = () => {
		navigate('/place-order')
	}

	return (
		<div className='py-16 px-4 sm:px-6 lg:px-8 bg'>
			<div
				className='max-w-full
			 mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12'
			>
				<div className='flex-1'>
					<div className='text-3xl font-extrabold mb-8'>
						<Title text1='Il tuo' text2='Carrello' />
					</div>

					{cartData.length === 0 ? (
						<p className='text-center text-gray-500 text-lg italic mt-16'>
							Il tuo carrello è vuoto.
						</p>
					) : (
						<div className='space-y-8'>
							{cartData.map((item, index) => {
								const product = products.find(p => p._id === item._id)
								if (!product) return null

								return (
									<div
										key={index}
										className='flex flex-col sm:flex-row items-center justify-between border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300'
									>
										<div className='flex items-start gap-6 w-full sm:w-auto'>
											<img
												src={product.image[0]}
												alt={product.name}
												className='w-24 h-24 object-cover rounded-lg shadow-sm'
											/>
											<div>
												<h3 className='font-semibold text-xl text-gray-900 leading-snug'>
													{product.name}
												</h3>
												{product.sizes && product.sizes.length > 0 && (
													<div className='flex flex-wrap gap-2 mt-1'>
														{product.sizes.map((size, idx) => (
															<span
																key={idx}
																className='inline-block px-3 py-0.5 rounded-full bg-gray-200 text-gray-700 text-sm font-medium select-none'
															>
																{size}
															</span>
														))}
													</div>
												)}
												<p className='text-gray-600 mt-3 text-base font-medium'>
													{currency}
													{product.price.toFixed(2)}
												</p>
											</div>
										</div>

										<div className='flex items-center gap-5 mt-6 sm:mt-0'>
											<input
												type='number'
												min={1}
												value={item.quantity}
												onChange={e => {
													const val = Number(e.target.value)
													if (val > 0) {
														updateQuantity(item._id, val)
													}
												}}
												className='w-20 border border-gray-300 rounded-md px-3 py-2 text-center font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-black transition'
											/>
											<button
												onClick={() => updateQuantity(item._id, 0)}
												aria-label='Rimuovi articolo'
												className='text-red-600 hover:text-red-800 text-3xl font-extrabold leading-none transition-colors'
											>
												&times;
											</button>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>

				<aside className='w-full md:w-96 bg-gray-100 p-8 rounded-2xl shadow-lg flex flex-col gap-8'>
					<CartTotal />
					<button
						disabled={cartData.length === 0}
						onClick={handleCheckout}
						className={`w-full py-4 rounded-lg font-bold text-white transition ${
							cartData.length === 0
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-black hover:bg-gray-900 active:bg-gray-800'
						}`}
					>
						Procedi al Checkout
					</button>
				</aside>
			</div>
		</div>
	)
}

export default Cart
