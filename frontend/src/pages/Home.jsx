import AboutBenefits from '../components/AboutBenefits'
import AboutIntro from '../components/AboutIntro'
import BestSeller from '../components/BestSeller'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Title from '../components/Title'

const Home = () => {
	return (
		<>
			<Hero />
			<LatestCollection />
			<BestSeller />

			<section className='pt-12 border-t'>
				<div className='text-center text-2xl md:text-3xl font-semibold mb-6'>
					<Title text1='CHI' text2='SIAMO' />
				</div>
				<AboutIntro />
				<AboutBenefits />
			</section>
		</>
	)
}

export default Home
