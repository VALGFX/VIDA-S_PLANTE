import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
	const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

	return (
		<div className='w-full'>
			<div className='text-2xl'>
				<Title text1={'TOTALE'} text2={'CARRELLO'} />
			</div>

			<div className='flex flex-col gap-2 mt-2 text-sm'>
				<div className='flex justify-between'>
					<p>Subtotale</p>
					<p>
						{currency} {getCartAmount()}
					</p>
				</div>
				<hr />
				<div className='flex justify-between'>
					<p>Spese di spedizione</p>
					<p>
						{currency} {delivery_fee}
					</p>
				</div>
				<hr />
				<div className='flex justify-between'>
					<b>Totale</b>
					<b>
						{currency}{' '}
						{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
					</b>
				</div>
			</div>
		</div>
	)
}

export default CartTotal
