import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const ShopContext = createContext()

const ShopContextProvider = props => {
	// Valori fixe
	const currency = '$'
	const delivery_fee = 10
	const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'

	// State-uri
	const [search, setSearch] = useState('')
	const [showSearch, setShowSearch] = useState(false)
	const [products, setProducts] = useState([])
	const [token, setToken] = useState(localStorage.getItem('token') || '')

	const [cartItems, setCartItems] = useState(() => {
		try {
			const stored = localStorage.getItem('cartItems')
			return stored ? JSON.parse(stored) : {}
		} catch {
			return {}
		}
	})

	const navigate = useNavigate()

	// Sincronizare localStorage cartItems la schimbare
	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

	// Funcție login (poți muta în alt fișier/componentă)
	const loginUser = async (email, password) => {
		try {
			const response = await axios.post(backendUrl + '/api/auth/login', {
				email,
				password,
			})
			if (response.data.success) {
				const receivedToken = response.data.token
				localStorage.setItem('token', receivedToken)
				setToken(receivedToken)
				toast.success('Autentificare reușită')
				navigate('/')
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			toast.error(error.response?.data?.message || error.message)
		}
	}

	// Funcție logout
	const logoutUser = () => {
		localStorage.removeItem('token')
		setToken('')
		setCartItems({})
		navigate('/login')
		toast.info('Te-ai deconectat')
	}

	// Adaugă produs în coș
	const addToCart = async itemId => {
		const updatedCart = {
			...cartItems,
			[itemId]: (cartItems[itemId] || 0) + 1,
		}
		setCartItems(updatedCart)

		if (!token) {
			toast.error('Te rugăm să te autentifici pentru a adăuga produse în coș.')
			return
		}

		try {
			await axios.post(
				backendUrl + '/api/cart/add',
				{ itemId },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		} catch (error) {
			console.error(error)
			toast.error(error.response?.data?.message || 'Eroare la adăugarea în coș')
		}
	}

	// Numărul total produse în coș
	const getCartCount = () =>
		Object.values(cartItems).reduce((acc, qty) => acc + qty, 0)

	// Suma totală a coșului
	const getCartAmount = () => {
		let total = 0
		for (const itemId in cartItems) {
			const product = products.find(p => p._id === itemId)
			if (product) {
				total += product.price * cartItems[itemId]
			}
		}
		return total
	}

	// Actualizează cantitatea produsului
	const updateQuantity = async (itemId, quantity) => {
		const updated = { ...cartItems, [itemId]: quantity }
		setCartItems(updated)

		if (!token) {
			toast.error('Te rugăm să te autentifici pentru a modifica coșul.')
			return
		}

		try {
			await axios.post(
				backendUrl + '/api/cart/update',
				{ itemId, quantity },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
		} catch (error) {
			console.error(error)
			toast.error(error.response?.data?.message || error.message)
		}
	}

	// Preia produsele
	const getProductsData = async () => {
		try {
			const response = await axios.get(backendUrl + '/api/product/list')
			if (response.data.success) {
				setProducts(response.data.products.reverse())
			} else {
				toast.error(response.data.message)
			}
		} catch (error) {
			console.error(error)
			toast.error(error.message)
		}
	}

	// Preia coșul utilizatorului
	const getUserCart = async currentToken => {
		if (!currentToken) return
		try {
			const response = await axios.post(
				backendUrl + '/api/cart/get',
				{},
				{ headers: { Authorization: `Bearer ${currentToken}` } }
			)
			if (response.data.success) {
				setCartItems(response.data.cartData)
			}
		} catch (error) {
			console.error(error)
			toast.error(error.response?.data?.message || error.message)
		}
	}

	// La montare: încarcă produsele
	useEffect(() => {
		getProductsData()
	}, [])

	// La schimbarea token-ului: încarcă coșul utilizatorului sau golește-l
	useEffect(() => {
		if (token) {
			getUserCart(token)
		} else {
			setCartItems({})
		}
	}, [token])

	const value = {
		products,
		currency,
		delivery_fee,
		search,
		setSearch,
		showSearch,
		setShowSearch,
		cartItems,
		setCartItems,
		addToCart,
		updateQuantity,
		getCartCount,
		getCartAmount,
		loginUser,
		logoutUser,
		navigate,
		backendUrl,
		setToken,
		token,
	}

	return (
		<ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
	)
}

export default ShopContextProvider
