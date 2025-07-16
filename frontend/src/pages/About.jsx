import AboutBenefits from '../components/AboutBenefits'
import AboutIntro from '../components/AboutIntro'
import Title from '../components/Title'

const About = () => {
	return (
		<div>
			<div className='text-2xl text-center pt-8 border-t'>
				<Title text1='CHI' text2='SIAMO' />
			</div>

			<AboutIntro />
			<AboutBenefits />
		</div>
	)
}

export default About
