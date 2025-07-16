const AboutCard = ({
	icon,
	title,
	description,
	hovered,
	onMouseEnter,
	onMouseLeave,
}) => {
	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={`bg-white rounded-xl p-7 flex flex-col items-center gap-5 cursor-pointer
    transition-shadow duration-300
    ${hovered ? 'shadow-2xl shadow-gray-400' : 'shadow-md shadow-gray-200'}
    w-full max-w-sm mx-auto
  `}
			style={{ minHeight: '250px' }}
		>
			<span className='text-5xl'>{icon}</span>
			<b className='text-lg font-bold text-gray-900 text-center'>{title}</b>
			<p className='text-gray-600 text-center text-sm leading-relaxed'>
				{description}
			</p>
		</div>
	)
}

export default AboutCard
