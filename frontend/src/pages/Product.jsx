import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import { ShopContext } from '../context/ShopContext'

const Product = () => {
	const { productId } = useParams()
	const { products, currency, addToCart, token } = useContext(ShopContext)
	const [productData, setProductData] = useState(null)
	const [selectedImage, setSelectedImage] = useState('')

	// Căutăm produsul după ID și setăm imaginea principală
	useEffect(() => {
		const item = products.find(p => p._id === productId)
		if (item) {
			setProductData(item)
			setSelectedImage(item.image?.[0] || '')
		}
	}, [productId, products])

	if (!productData) {
		return (
			<div className='text-center py-20 text-gray-500 italic font-semibold'>
				Caricamento in corso...
			</div>
		)
	}

	return (
		<div className='border-t-2 pt-10 px-4 md:px-12 max-w-full mx-auto'>
			{/* ----------- Detalii produs ----------- */}
			<div className='flex flex-col sm:flex-row gap-12 sm:gap-16'>
				{/* Imagini produs */}
				<div className='flex-1 flex flex-col-reverse sm:flex-row gap-4'>
					<div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:w-[20%] w-full'>
						{productData.image.map((imgSrc, idx) => (
							<img
								key={idx}
								src={imgSrc}
								alt={`Anteprima immagine ${idx + 1}`}
								className={`cursor-pointer rounded-md border transition-colors duration-200 ${
									selectedImage === imgSrc
										? 'border-black shadow-lg'
										: 'border-transparent hover:border-gray-400'
								} w-[24%] sm:w-full sm:mb-3 flex-shrink-0`}
								onClick={() => setSelectedImage(imgSrc)}
							/>
						))}
					</div>

					<div className='w-full sm:w-[80%] rounded-lg overflow-hidden shadow-lg'>
						<img
							src={selectedImage}
							alt={productData.name}
							className='w-full h-auto object-cover'
							loading='lazy'
						/>
					</div>
				</div>

				{/* Informații produs */}
				<div className='flex-1 flex flex-col'>
					<h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
						{productData.name}
					</h1>

					<p className='mt-6 text-4xl font-bold text-gray-800'>
						{token ? (
							<>
								{currency}
								{productData.price.toFixed(2)}
							</>
						) : (
							<span className='text-red-600 italic font-semibold'>
								Accedi per visualizzare il prezzo
							</span>
						)}
					</p>

					{/* Afișare mărimi disponibile într-un card modern */}
					{productData.sizes && productData.sizes.length > 0 && (
						<div className='mt-6'>
							<p className='font-semibold text-gray-700 mb-3'>
								Taglie disponibili:
							</p>
							<div className='flex flex-wrap gap-3'>
								{productData.sizes.map((size, idx) => (
									<span
										key={idx}
										className='cursor-default select-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-shadow hover:shadow-md'
										title={`Taglia ${size}`}
									>
										{size}
									</span>
								))}
							</div>
						</div>
					)}

					<p className='mt-8 text-gray-700 leading-relaxed md:w-4/5 text-lg'>
						{productData.description}
					</p>

					<button
						onClick={() => addToCart(productData._id)}
						disabled={!token}
						className={`mt-10 px-12 py-4 rounded-lg text-white font-semibold transition-shadow duration-300 ${
							token
								? 'bg-black hover:bg-gray-900 active:bg-gray-800 shadow-lg'
								: 'bg-gray-400 cursor-not-allowed'
						}`}
					>
						{token ? 'AGGIUNGI AL CARRELLO' : 'Accedi per acquistare'}
					</button>

					<hr className='my-12 w-4/5 border-gray-300' />
				</div>
			</div>

			{/* Produse recomandate */}
			<RelatedProducts
				category={productData.category}
				subCategory={productData.subCategory}
			/>
		</div>
	)
}

export default Product
