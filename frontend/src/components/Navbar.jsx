import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
	const [showDropdown, setShowDropdown] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const {
		setShowSearch,
		getCartCount,
		navigate,
		token,
		setToken,
		setCartItems,
	} = useContext(ShopContext)

	const logout = () => {
		localStorage.removeItem('token')
		setToken('')
		setCartItems({})
		navigate('/login')
	}

	const navItems = [
		{ name: 'Home', path: '/' },
		{ name: 'Prodotti', path: '/collection' },
		{ name: 'Chi siamo', path: '/about' },
		{ name: 'Contatto', path: '/contact' },
	]

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '20px',
				backgroundColor: '#F2F3F2',
				borderRadius: '20px',
				maxWidth: '100%',
				margin: '40px auto 0',
				position: 'relative',
				zIndex: 1000,
			}}
		>
			{/* Logo */}
			<Link to='/' style={{ flexShrink: 0 }}>
				<img src={assets.logo} alt='Logo' style={{ width: '120px' }} />
			</Link>

			{/* Desktop Menu */}
			<div
				className='desktop-menu'
				style={{ display: 'none', gap: '20px', alignItems: 'center' }}
			>
				{navItems.map(item => (
					<NavLink
						key={item.name}
						to={item.path}
						style={({ isActive }) => ({
							textDecoration: 'none',
							color: isActive ? '#000' : '#1E1E1E',
							fontWeight: isActive ? '700' : '500',
						})}
					>
						{item.name}
					</NavLink>
				))}
			</div>

			{/* Right Icons */}
			<div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
				{/* Search */}
				<img
					onClick={() => {
						setShowSearch(true)
						navigate('/collection')
					}}
					src={assets.search_icon}
					alt='Search'
					style={{ width: '20px', cursor: 'pointer' }}
				/>

				{/* Profile Dropdown */}
				<div
					style={{ position: 'relative' }}
					onMouseEnter={() => setShowDropdown(true)}
					onMouseLeave={() => setShowDropdown(false)}
				>
					<img
						onClick={() => {
							if (!token) navigate('/login')
						}}
						src={assets.profile_icon}
						alt='Profile'
						style={{ width: '20px', cursor: 'pointer' }}
					/>

					{token && showDropdown && (
						<div
							style={{
								position: 'absolute',
								top: '110%',
								right: 0,
								backgroundColor: '#f0f0f0',
								padding: '10px',
								borderRadius: '8px',
								boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
								zIndex: 2000,
								display: 'flex',
								flexDirection: 'column',
								gap: '6px',
								minWidth: '150px',
							}}
						>
							<p
								onClick={() => navigate('/orders')}
								style={{ cursor: 'pointer', color: '#555' }}
							>
								Orders
							</p>
							<p onClick={logout} style={{ cursor: 'pointer', color: '#555' }}>
								Logout
							</p>
						</div>
					)}
				</div>

				{/* Cart */}
				<Link to='/cart' style={{ position: 'relative' }}>
					<img src={assets.cart_icon} alt='Cart' style={{ width: '20px' }} />
					{getCartCount() > 0 && (
						<span
							style={{
								position: 'absolute',
								right: '-5px',
								bottom: '-5px',
								width: '16px',
								height: '16px',
								fontSize: '10px',
								lineHeight: '16px',
								textAlign: 'center',
								backgroundColor: '#000',
								color: '#fff',
								borderRadius: '50%',
							}}
						>
							{getCartCount()}
						</span>
					)}
				</Link>

				{/* Mobile menu toggle */}
				<img
					src={assets.menu_icon}
					alt='Menu'
					style={{ width: '20px', cursor: 'pointer' }}
					className='mobile-menu-icon'
					onClick={() => setMobileMenuOpen(true)}
				/>
			</div>

			{/* Mobile Sidebar */}
			<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					height: '100%',
					width: '100%',
					backgroundColor: 'rgba(0, 0, 0, 0.95)',
					display: mobileMenuOpen ? 'flex' : 'none',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
					fontSize: '24px',
					zIndex: 3000,
					transition: 'transform 0.3s ease',
				}}
			>
				<img
					src={assets.close_icon}
					alt='Close'
					style={{
						position: 'absolute',
						top: 20,
						right: 20,
						width: '30px',
						cursor: 'pointer',
					}}
					onClick={() => setMobileMenuOpen(false)}
				/>

				<nav
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '30px',
						textAlign: 'center',
					}}
				>
					{navItems.map(item => (
						<NavLink
							key={item.name}
							to={item.path}
							style={{ color: 'white', textDecoration: 'none' }}
							onClick={() => setMobileMenuOpen(false)}
						>
							{item.name}
						</NavLink>
					))}
				</nav>
			</div>

			<style>{`
				@media (min-width: 640px) {
					.desktop-menu {
						display: flex !important;
					}
					.mobile-menu-icon {
						display: none !important;
					}
				}
				@media (max-width: 639px) {
					.desktop-menu {
						display: none !important;
					}
					.mobile-menu-icon {
						display: inline-block !important;
					}
				}
			`}</style>
		</div>
	)
}

export default Navbar
