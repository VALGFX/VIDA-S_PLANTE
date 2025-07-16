import { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {
	const { products } = useContext(ShopContext)
	const [latestProducts, setLatestProducts] = useState([])

	useEffect(() => {
		setLatestProducts(products.slice(0, 10))
	}, [products])

	return (
		<section className='latest-collection'>
			<header className='header'>
				<h2 className='title'>
					PRODOTTI <span className='highlight'>PIÙ RECENTI</span>
				</h2>
				<p className='subtitle'>
					Our most recent arrivals
					<br />
					<span className='week'>Updated Weekly</span>
				</p>
			</header>

			<hr className='divider' />

			<div className='grid'>
				{latestProducts.map(item => (
					<ProductItem
						key={item._id}
						id={item._id}
						image={item.image}
						name={item.name}
						price={item.price}
					/>
				))}
			</div>

			<style jsx>{`
				.latest-collection {
					background-color: #f2f3f2;
					max-width: 100%;
					margin: 3rem auto;
					padding: 2rem;
					border-radius: 1.25rem;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
				}

				.header {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 0.5rem;
					margin-bottom: 2.5rem;
					text-align: center;
				}

				@media (min-width: 768px) {
					.header {
						flex-direction: row;
						justify-content: space-between;
						text-align: left;
					}
				}

				.title {
					font-size: 30px;
					font-weight: 700;
					color: #111827;
					letter-spacing: 0.05em;
				}

				.highlight {
					font-weight: 400;
					color: #6b7280;
					margin-left: 0.25rem;
				}

				.subtitle {
					font-size: 1.125rem;
					color: #374151;
					font-weight: 600;
					line-height: 1.4;
					margin: 0;
				}

				.week {
					font-weight: 400;
					color: #9ca3af;
				}

				.divider {
					border: none;
					border-bottom: 1.5px solid #e5e7eb;
					margin-bottom: 2rem;
					width: 100%;
					max-width: 100%;
					opacity: 0.7;
				}

				.grid {
					display: grid;
					gap: 2rem;
					grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
				}

				@media (min-width: 640px) {
					.grid {
						grid-template-columns: repeat(3, 1fr);
					}
				}

				@media (min-width: 1024px) {
					.grid {
						grid-template-columns: repeat(5, 1fr);
					}
				}
			`}</style>
		</section>
	)
}

export default LatestCollection
