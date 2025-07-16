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
		<div className='max-w-screen-xl mx-auto px-6 md:px-20'>
			<div className='text-left text-2xl md:text-3xl font-semibold py-6 mb-10'>
				<Title text1='PERCHÉ' text2='SCEGLIERE NOI?' />
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12'>
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
	)
}

export default AboutBenefits
