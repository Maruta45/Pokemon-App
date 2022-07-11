/** @format */

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Detail() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [pokemonInfo, setPokemonInfo] = useState({});
	const [pokemonMoves, setPokemonMoves] = useState([]);
	const [types, setTypes] = useState([]);
	const [ability, setAbility] = useState([]);

	useEffect(() => {
		pokemonDetail();
	}, []);

	const pokemonDetail = async () => {
		const { name } = router.query;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setPokemonInfo(data);
				setTypes(data.types);
				setAbility(data.abilities);
				setPokemonMoves(data.moves);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	if (loading) {
		return <div className='w-full h-screen flex justify-center items-center text-2xl font-marker font-bold'>Loading...</div>;
	} else {
		return (
			<Layout headTitle={`Pokemon - ${pokemonInfo.name}`} headDesc={'Pokemon Detail'}>
				<div>
					<div className='flex flex-col items-center'>
						<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonInfo.id}.svg`} alt={pokemonInfo.name} width={300} height={350} />
						<h1 className='text-2xl font-marker font-bold uppercase'>{pokemonInfo.name}</h1>
					</div>
					<h1 className='font-semibold font-sans pt-8'>
						<span className='font-bold'>Type : </span>
						{types.length > 0
							? types &&
							  types.map((item) => {
									return (
										<Link href={`/type/${item.type.name}`} key={item.type.name}>
											<a className='hover:text-blue-700 capitalize'>{item.type.name.concat(' ')}</a>
										</Link>
									);
							  })
							: 'No Type'}
					</h1>
					<h1 className='font-semibold font-sans mt-4'>
						<span className='font-bold'>Abilities : </span>
						{ability.length > 0
							? ability &&
							  ability.map((item) => {
									return (
										<Link href={`/abilities/${item.ability.name}`} key={item.ability.name}>
											<a className='hover:text-blue-700 capitalize'>{item.ability.name.concat(' ')}</a>
										</Link>
									);
							  })
							: 'No Ability'}
					</h1>
					<h1 className='font-semibold font-sans mt-4 capitalize'>
						<span className='font-bold'>Game Indices : </span>
						{pokemonInfo.game_indices.length > 0
							? pokemonInfo.game_indices &&
							  pokemonInfo.game_indices
									.map((game) => {
										return game.version.name;
									})
									.join(', ')
							: 'None'}
					</h1>
					<h1 className='font-semibold font-sans mt-4'>
						<span className='font-bold'>Moves : </span>
						{pokemonMoves.length > 0
							? pokemonMoves &&
							  pokemonMoves.map((item) => {
									return (
										<Link href={`/moves/${item.move.name}`} key={item.move.name}>
											<a className='hover:text-blue-700 capitalize'>{item.move.name.concat(' ')}</a>
										</Link>
									);
							  })
							: 'None'}
					</h1>
				</div>
			</Layout>
		);
	}
}
