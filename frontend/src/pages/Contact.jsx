import { assets } from '../assets/assets'
import Title from '../components/Title'

const Contact = () => {
	return (
		<div className='max-w-7xl mx-auto px-6 py-8'>
			<div className='flex flex-col lg:flex-row items-center'>
				{/* Parte sinistra: immagine */}
				<div className='flex-1 mb-8 lg:mb-0 lg:mr-8'>
					<img
						src={assets.contact_img} // Assicurati di avere l'immagine in questa cartella
						alt='Contattaci'
						className='w-full h-auto rounded-lg shadow-lg'
					/>
				</div>

				{/* Parte destra: dettagli di contatto */}
				<div className='flex-1'>
					<div className='text-2xl font-semibold mb-4'>
						<Title text1={'I NOSTRI'} text2={'CONTATTI'} />
					</div>
					<div className='flex flex-col space-y-4'>
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm'>
							<strong className='block text-lg font-bold'>Indirizzo</strong>
							<p className='text-lg text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</p>
						</div>
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm'>
							<strong className='block text-lg font-bold'>
								Numero di Telefono
							</strong>
							<p className='text-lg text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</p>
						</div>
						<div className='p-4 bg-gray-100 rounded-lg shadow-sm'>
							<strong className='block text-lg font-bold'>
								Indirizzo Email
							</strong>
							<p className='text-lg text-gray-700'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Contact
