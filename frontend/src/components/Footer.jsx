import { assets } from '../assets/assets'

const Footer = () => {
	return (
		<div>
			<div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14  mt-40 text-sm'>
				<div>
					<img src={assets.logo} className='mb-5 w-32' alt='' />
					<p className='w-full md:w-2/3 text-gray-600'>
						Siamo un’azienda appassionata della bellezza e dell’equilibrio degli
						ecosistemi acquatici. Specializzati nella vendita di piante per
						acquari e laghetti, offriamo una selezione accurata di specie sane e
						adatte a qualsiasi tipo di ambiente.
					</p>
				</div>

				<div>
					<p className='text-xl font-medium mb-5'>Compagnia</p>
					<ul className='flex flex-col gap-1 text-gray-600'>
						<li>Home</li>
						<li>Chi siamo</li>
						<li>Distribuzione</li>
						<li>Informativa sulla privacy</li>
					</ul>
				</div>

				<div>
					<p className='text-xl font-medium mb-5'>I NOSTRI CONTATTI</p>
					<ul className='flex flex-col gap-1 text-gray-600'>
						<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
						<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
					</ul>
				</div>
			</div>

			<div>
				<hr />
				<p className='py-5 text-sm text-center'>
					COPYRIGHT © 2025 <b>VIDA - S PLANTE </b> - All Right Reserved.
				</p>
			</div>
		</div>
	)
}

export default Footer
