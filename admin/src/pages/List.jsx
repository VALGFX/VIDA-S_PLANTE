import axios from 'axios'
import { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'

const List = ({ token }) => {
	const [list, setList] = useState([])
	const [subcategories, setSubcategories] = useState([])
	const [editingProduct, setEditingProduct] = useState(null)
	const [imagePreview, setImagePreview] = useState('')
	const [imageLink, setImageLink] = useState('')

	const fetchList = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list')
			if (response.data.success) {
				setList(response.data.products.reverse())
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	const fetchSubcategories = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/subcategory/list')
			if (response.data.success) {
				setSubcategories(response.data.subcategories)
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		}
	}

	const removeProduct = async id => {
		try {
			const response = await axios.post(
				backendUrl + '/api/product/remove',
				{ id },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			if (response.data.success) {
				toast.success(response.data.message)
				await fetchList()
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.log(error)
			toast.error(error.message)
		}
	}

	const startEditing = product => {
		setEditingProduct({ ...product })
		setImageLink(product.image?.[0] || '')
		setImagePreview('')
	}

	const handleImageChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result)
				setEditingProduct(prev => ({
					...prev,
					imageFile: file,
				}))
				setImageLink('')
			}
			reader.readAsDataURL(file)
		}
	}

	const submitEdit = async () => {
		try {
			if (!editingProduct || !editingProduct._id) {
				toast.error('ID-ul produsului lipsește!')
				console.warn('ID lipsă:', editingProduct)
				return
			}

			if (editingProduct.imageFile) {
				const formData = new FormData()
				formData.append('_id', editingProduct._id)
				formData.append('image', editingProduct.imageFile)
				formData.append('name', editingProduct.name)
				formData.append('category', editingProduct.category)
				formData.append('subcategory', editingProduct.subcategory || '')
				formData.append('price', Number(editingProduct.price))
				formData.append(
					'sizes',
					editingProduct.sizes
						? typeof editingProduct.sizes === 'string'
							? editingProduct.sizes
							: JSON.stringify(editingProduct.sizes)
						: JSON.stringify([])
				)
				formData.append(
					'bestseller',
					editingProduct.bestseller === true ||
						editingProduct.bestseller === 'true'
				)

				const response = await axios.post(
					backendUrl + '/api/product/update',
					formData,
					{
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'multipart/form-data',
						},
					}
				)

				if (response.data.success) {
					toast.success('Produs actualizat cu succes')
					resetEditing()
					await fetchList()
				} else {
					toast.error(response.data.message)
				}
				return
			}

			const finalImage = imageLink
				? [imageLink]
				: editingProduct.image && editingProduct.image.length > 0
				? editingProduct.image
				: []

			const payload = {
				...editingProduct,
				price: Number(editingProduct.price),
				sizes: editingProduct.sizes
					? typeof editingProduct.sizes === 'string'
						? editingProduct.sizes
						: JSON.stringify(editingProduct.sizes)
					: JSON.stringify([]),
				bestseller:
					editingProduct.bestseller === true ||
					editingProduct.bestseller === 'true',
				image: finalImage,
				subcategory: editingProduct.subcategory || '',
			}

			const response = await axios.post(
				backendUrl + '/api/product/update',
				payload,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.data.success) {
				toast.success('Produs actualizat cu succes')
				resetEditing()
				await fetchList()
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		}
	}

	const resetEditing = () => {
		setEditingProduct(null)
		setImagePreview('')
		setImageLink('')
	}

	useEffect(() => {
		fetchList()
		fetchSubcategories()
	}, [])

	return (
		<section className='w-full max-w-6xl mx-auto px-4 py-8'>
			<h2 className='text-2xl font-semibold text-gray-800 mb-4'>
				📦 Elenco completo dei prodotti
			</h2>

			<div className='flex flex-col gap-4'>
				<div className='hidden md:grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center py-3 px-4 bg-gray-100 text-sm rounded-md shadow-sm font-medium text-gray-700'>
					<span>Imagine</span>
					<span>Nume</span>
					<span>Categorie</span>
					{/* Am eliminat aici subcategoria */}
					<span>Preț</span>
					<span className='text-center'>Acțiuni</span>
				</div>

				{list.map((item, index) => (
					<div key={index} className='flex flex-col gap-2'>
						<div className='grid grid-cols-[80px_2fr_1fr_1fr_80px] items-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-md shadow-sm text-sm hover:shadow-md transition'>
							<img
								src={item.image?.[0] || '/images/default.jpg'}
								alt={item.name}
								className='w-24 h-24 object-contain rounded-md'
							/>
							<p className='font-medium text-gray-800 truncate'>{item.name}</p>
							<p className='text-gray-600'>{item.category}</p>
							{/* Am eliminat afișarea subcategoriei aici */}
							<p className='text-gray-700 font-semibold'>
								{currency}
								{item.price}
							</p>
							<div className='flex items-center gap-2 justify-center'>
								<button
									onClick={() => startEditing(item)}
									title='Editează'
									className='flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:bg-green-700 transition'
								>
									Edit
								</button>
								<button onClick={() => removeProduct(item._id)} title='Șterge'>
									<FaTrashAlt />
								</button>
							</div>
						</div>

						{/* Formular sub produs */}
						{editingProduct?._id === item._id && (
							<div className='p-6 bg-white border-2 border-purple-500 rounded-lg shadow-md'>
								<h3 className='text-lg font-semibold mb-4'>
									✏️ Editare produs
								</h3>
								<form
									onSubmit={e => {
										e.preventDefault()
										submitEdit()
									}}
									className='grid gap-5 md:grid-cols-2'
								>
									<input
										type='text'
										value={editingProduct.name || ''}
										onChange={e =>
											setEditingProduct({
												...editingProduct,
												name: e.target.value,
											})
										}
										placeholder='Nume produs'
										className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
										required
									/>

									<input
										type='text'
										value={editingProduct.category || ''}
										onChange={e =>
											setEditingProduct({
												...editingProduct,
												category: e.target.value,
											})
										}
										placeholder='Categorie'
										className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
										required
									/>

									{/* Input text liber pentru subcategorie */}
									<input
										type='text'
										value={editingProduct.subcategory || ''}
										onChange={e =>
											setEditingProduct({
												...editingProduct,
												subcategory: e.target.value,
											})
										}
										placeholder='Introdu subcategoria'
										className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
									/>

									<input
										type='number'
										step='0.01'
										value={editingProduct.price || ''}
										onChange={e =>
											setEditingProduct({
												...editingProduct,
												price: e.target.value,
											})
										}
										placeholder='Preț'
										className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
										required
									/>

									<input
										type='text'
										value={imageLink}
										onChange={e => {
											setImageLink(e.target.value)
											setEditingProduct(prev => {
												const copy = { ...prev }
												delete copy.imageFile
												return copy
											})
											setImagePreview('')
										}}
										placeholder='Sau introdu un link direct către imagine'
										className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 col-span-2'
									/>

									{(imagePreview || imageLink) && (
										<img
											src={imagePreview || imageLink}
											alt='Preview imagine'
											className='col-span-2 w-40 h-40 object-contain rounded-md mt-2'
										/>
									)}

									<div className='col-span-2 flex gap-4 justify-end'>
										<button
											type='submit'
											className='flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition'
										>
											Salvează
										</button>
										<button
											type='button'
											onClick={resetEditing}
											className='px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition'
										>
											Anulează
										</button>
									</div>
								</form>
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	)
}

export default List
