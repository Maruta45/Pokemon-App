/** @format */
import { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';

import Layout from '../components/Layout';
import Card from '../components/Card';
import fetchApi from '../utils/fetchApi';

export default function Home() {
	const [loading, setLoading] = useState(true);
	// const [limit, setLimit] = useState(20);
	const [pokemon, setPokemon] = useState([]);

	const fetchPokemon = async () => {
		// const extendLimit = limit + 20;
		fetchApi(`pokemon?limit=150`, 'get', {})
			.then((res) => {
				const results = res.results;
				const clonePokemon = results.slice();
				clonePokemon.push(...results);
				setPokemon(clonePokemon);
				setLimit(extendLimit);
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
				{/* <div className='flex p-4 w-full'>
					<button onClick={() => fetchPokemon()} className='mx-auto text-2xl dark:text-white transition duration-500'>
						<IoIosArrowDown className='mx-auto text-5xl animate-bounce' />
					</button>
				</div> */}
			</Layout>
		);
	}
}
