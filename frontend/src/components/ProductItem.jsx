import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image, name, price }) => {
	const { currency, token } = useContext(ShopContext)
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/product/${id}`)
		window.scrollTo(0, 0)
	}

	return (
		<div
			onClick={handleClick}
			className='group relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200 cursor-pointer max-w-sm mx-auto block'
			role='button'
			tabIndex={0}
			onKeyDown={e => {
				if (e.key === 'Enter' || e.key === ' ') handleClick()
			}}
		>
			<div className='w-full aspect-[1/1] overflow-hidden rounded-t-2xl bg-gray-50 relative'>
				<img
					src={image && image.length > 0 ? image[0] : '/images/default.jpg'}
					alt={name}
					className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
				/>
			</div>
			<div className='p-4 flex flex-col gap-2'>
				<h3 className='text-lg font-semibold text-gray-800 break-words whitespace-normal'>
					{name}
				</h3>

				{token ? (
					<p className='text-sm font-medium text-gray-600'>
						{currency}
						{price.toFixed(2)}
					</p>
				) : (
					<p className='text-sm font-medium text-gray-400 italic'>
						Login to see the price
					</p>
				)}
			</div>
		</div>
	)
}

export default ProductItem
