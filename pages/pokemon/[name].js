/** @format */

import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import fetchApi from '../../utils/fetchApi';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Detail() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [pokemonInfo, setPokemonInfo] = useState({});

	useEffect(() => {
		pokemonDetail();
	}, []);

	const pokemonDetail = async () => {
		const { name } = router.query;
		fetchApi(`pokemon/${name}`, 'get', {})
			.then((res) => {
				console.log(res);
				setPokemonInfo(res);
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
						{pokemonInfo.types &&
							pokemonInfo.types
								.map((type) => {
									return type.type.name;
								})
								.join(', ')}
					</h1>
					<h1 className='font-semibold font-sans mt-4'>
						<span className='font-bold'>Abilities : </span>
						{pokemonInfo.abilities &&
							pokemonInfo.abilities
								.map((ability) => {
									return ability.ability.name;
								})
								.join(', ')}
					</h1>
					<h1 className='font-semibold font-sans mt-4'>
						<span className='font-bold'>Game Indices : </span>
						{pokemonInfo.game_indices &&
							pokemonInfo.game_indices
								.map((game) => {
									return game.version.name;
								})
								.join(', ')}
					</h1>
					<h1 className='font-semibold font-sans mt-4'>
						<span className='font-bold'>Moves : </span>
						{pokemonInfo.moves &&
							pokemonInfo.moves
								.map((move) => {
									return move.move.name;
								})
								.join(', ')}
					</h1>
				</div>
			</Layout>
		);
	}
}
