import { useState } from 'react'
import Title from '../components/Title'
import AboutCard from './AboutCard'

const AboutBenefits = () => {
	const [hoveredCard, setHoveredCard] = useState(null)

	const cards = [
		{
			icon: '🌱',
			title: 'Crescente',
			description:
				'Coltiviamo in condizioni ottimali per offrirti piante splendide e un assortimento completo in ogni stagione.',
		},
		{
			icon: '📦',
			title: 'Imballaggi',
			description:
				'Imballaggi studiati per proteggere al meglio ogni pianta e prodotto, dalla nostra serra a casa tua.',
		},
		{
			icon: '🚚',
			title: 'Trasporto',
			description:
				'Consegniamo i nostri prodotti con i nostri mezzi per fornirvi un servizio veloce e affidabile.',
		},
	]

	return (
		<section className='bg-white py-20'>
			<div className='max-w-screen-xl mx-auto px-6 md:px-10 lg:px-20'>
				{/* Titlu frumos, aliniat natural */}
				<div className='mb-12'>
					<h2 className=' text-2xl text-center pt-8 '>
						<Title text1='PERCHÉ' text2='SCEGLIERE NOI?' />
					</h2>
				</div>

				{/* Carduri elegante */}
				<div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center text-xs sm:text-sm md:text-base text-gray-700'>
					{cards.map((card, i) => (
						<AboutCard
							key={i}
							icon={card.icon}
							title={card.title}
							description={card.description}
							hovered={hoveredCard === i}
							onMouseEnter={() => setHoveredCard(i)}
							onMouseLeave={() => setHoveredCard(null)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default AboutBenefits
