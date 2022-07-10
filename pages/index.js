/** @format */
import { useEffect, useState } from 'react';
import Link from 'next/link';

import Layout from '../components/Layout';
import Card from '../components/Card';

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [pokemon, setPokemon] = useState([]);

	const fetchPokemon = async () => {
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				const { results } = data;
				setPokemon(results);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		fetchPokemon();
	}, []);

	if (loading) {
		return <div className='w-full h-screen flex justify-center items-center text-2xl font-marker font-bold'>Loading...</div>;
	} else {
		return (
			<Layout headTitle={'PokeNext'} headDesc={'PokeNext App'}>
				<div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
					{pokemon.map((item, index) => {
						return (
							<Link href={`/pokemon/${item.name}`} key={index}>
								<a>
									<Card name={item.name} url={index + 1} />
								</a>
							</Link>
						);
					})}
				</div>
			</Layout>
		);
	}
}
