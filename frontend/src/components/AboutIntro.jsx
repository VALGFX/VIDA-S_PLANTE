import { assets } from '../assets/assets'

const AboutIntro = () => {
	return (
		<div className='my-10 flex flex-col md:flex-row gap-16'>
			<img
				className='w-full md:max-w-[450px]'
				src={assets.about_img}
				alt='Chi siamo'
			/>
			<div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
				<p>
					Siamo un’azienda appassionata della bellezza e dell’equilibrio degli
					ecosistemi acquatici. Specializzati nella vendita di piante per
					acquari e laghetti, offriamo una selezione accurata di specie sane e
					adatte a qualsiasi tipo di ambiente.
				</p>

				<b className='text-gray-800'> La nostra missione</b>
				<p>
					🌱 Qualità garantita <br /> Tutte le nostre piante sono coltivate e
					selezionate con cura per offrire vitalità e bellezza naturale al
					vostro habitat acquatico. <br /> <br />
					🤝 Supporto personalizzato <br />
					Il nostro team di esperti è sempre a vostra disposizione per aiutarvi
					a scegliere le piante ideali e fornirvi consigli pratici per la loro
					cura. <br /> <br /> 🌊 La nostra visione <br />
					Crediamo che ogni acquario o laghetto rappresenti un angolo di natura
					viva. Il nostro obiettivo è ispirarvi a creare spazi acquatici belli,
					sani e ricchi di vita.
				</p>
			</div>
		</div>
	)
}

export default AboutIntro
