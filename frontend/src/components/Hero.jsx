import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const ArrowIcon = ({ hovered }) => (
	<svg
		className={`transition-transform duration-300 ${
			hovered ? 'translate-x-1' : 'translate-x-0'
		}`}
		xmlns='http://www.w3.org/2000/svg'
		fill='none'
		viewBox='0 0 24 24'
		stroke='currentColor'
		width={16}
		height={16}
		aria-hidden='true'
	>
		<path
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M5 12h14m-6-6l6 6-6 6'
		/>
	</svg>
)

const Hero = () => {
	const [hoverPrimary, setHoverPrimary] = useState(false)
	const [hoverSecondary, setHoverSecondary] = useState(false)

	return (
		<div className='w-full bg-white py-12 md:py-20 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-12'>
			{/* Text Section */}
			<div className='text-center md:text-left flex-1'>
				<h1 className='text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-6'>
					Prodotti e soluzioni complete
					<br />
					per il vostro acquario da sogno
				</h1>
				<p className='text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl'>
					Esplora la nostra selezione di prodotti di qualità, beneficia di
					prezzi speciali dopo il login e comunica direttamente in chat con il
					nostro team.
				</p>
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start'>
					<Link to='/collection'>
						<button
							onMouseEnter={() => setHoverPrimary(true)}
							onMouseLeave={() => setHoverPrimary(false)}
							className={`px-6 py-3 rounded-xl font-semibold transition-colors duration-300 ${
								hoverPrimary ? 'bg-gray-900' : 'bg-black'
							} text-white`}
						>
							Vedi i prodotti
						</button>
					</Link>
					<Link to='/about'>
						<button
							onMouseEnter={() => setHoverSecondary(true)}
							onMouseLeave={() => setHoverSecondary(false)}
							className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 transition-colors duration-300 ${
								hoverSecondary ? 'bg-gray-100' : 'bg-transparent'
							} border-black text-black`}
						>
							Scopri di più
							<ArrowIcon hovered={hoverSecondary} />
						</button>
					</Link>
				</div>
			</div>

			{/* Image Section */}
			<div className='flex-1 w-full rounded-2xl overflow-hidden shadow-lg'>
				<img
					src={assets.hero_img}
					alt='Acquario'
					className='w-full h-auto object-cover rounded-2xl'
					loading='eager'
				/>
			</div>
		</div>
	)
}

export default Hero
