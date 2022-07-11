/** @format */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/Card';

import Layout from '../../components/Layout';

export default function Abilities() {
	const router = useRouter();
	const [abilities, setAbilities] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const [generation, setGeneration] = useState({});
	const [effect, setEffect] = useState([]);
	const [names, setNames] = useState([]);
	const [loading, setLoading] = useState(true);

	const getAbilities = async () => {
		const { name } = router.query;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(`https://pokeapi.co/api/v2/ability/${name}`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setAbilities(data);
				setNames(data.names);
				setGeneration(data.generation);
				setEffect(data.effect_entries[1].effect);
				setPokemon(data.pokemon);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		getAbilities();
	}, []);

	if (loading) {
		return <div className='w-full h-screen flex justify-center items-center text-2xl font-marker font-bold'>Loading...</div>;
	} else {
		return (
			<Layout headTitle={`Ability - ${abilities.name}`}>
				<div>
					<h1 className='capitalize font-bold text-2xl font-marker pb-2 text-center my-8'>{abilities.name}</h1>
					<div className='space-y-4'>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4 capitalize'>Skill generation</h1>
								<div className='font-normal mt-4 uppercase'>{generation.name.length > 0 ? generation.name : 'None'}</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4'>Ability</h1>
								<div className='font-normal mt-4'>{effect.length > 0 ? effect : 'None'}</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4'>Related Pokemon</h1>
								<div className='mt-4'>
									{pokemon.length > 0
										? pokemon.map((item, index) => {
												return (
													<Link href={`/pokemon/${item.pokemon.name}`} key={index}>
														<ul>
															<li className='list-disc ml-8'>
																<a className='hover:text-blue-700 cursor-pointer'>{item.pokemon.name.concat(' ')}</a>
															</li>
														</ul>
													</Link>
												);
										  })
										: 'No Results'}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
