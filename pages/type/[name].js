/** @format */

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function Types() {
	const router = useRouter();
	const [types, setTypes] = useState([]);
	const [generation, setGeneration] = useState([]);
	const [move_damage_class, setMoveDamageClass] = useState([]);
	const [damage_relations, setDamageRelations] = useState([]);
	const [names, setNames] = useState([]);
	const [pokemon, setPokemon] = useState([]);
	const [loading, setLoading] = useState(true);

	const typeDetail = async () => {
		const { name } = router.query;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(`https://pokeapi.co/api/v2/type/${name}`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				setTypes(data);
				setNames(data.name);
				setPokemon(data.pokemon);
				setGeneration(data.generation);
				setDamageRelations(data.damage_relations);
				setMoveDamageClass(data.move_damage_class.name);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	useEffect(() => {
		typeDetail();
	}, []);

	if (loading) {
		return <div className='w-full h-screen flex justify-center items-center text-2xl font-marker font-bold'>Loading...</div>;
	} else {
		return (
			<Layout headTitle={`Types - ${names}`} headDesc={`Information about ${names}`}>
				<div>
					<h1 className='capitalize font-bold text-2xl font-marker pb-2 text-center my-8'>{types.name.length > 0 ? types.name : 'None'}</h1>
					<div className='space-y-4'>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4'>Skill Generation</h1>
								<div className='font-normal mt-4 uppercase'>{generation.name.length > 0 ? generation.name : 'None'}</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4'>Damage Class</h1>
								<div className='font-normal mt-4 uppercase'>{move_damage_class.length > 0 ? move_damage_class : 'None'}</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='p-4 bg-white border'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4 flex'>
									Damage Relations<span className='text-orange-400 font-normal text-sm px-1'>*</span>
									<span className='font-normal text-sm text-slate-400'>Double click to visit page</span>
								</h1>
								<div className='font-normal mt-4 space-y-4'>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>Double damage from</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.double_damage_from.length > 0
												? damage_relations.double_damage_from.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>Double damage to</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.double_damage_to.length > 0
												? damage_relations.double_damage_to.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>Half damage from</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.half_damage_from.length > 0
												? damage_relations.half_damage_from.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>Half damage to</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.half_damage_to.length > 0
												? damage_relations.half_damage_to.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>No damage from</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.no_damage_from.length > 0
												? damage_relations.no_damage_from.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
									<div className='bg-slate-50 border p-4'>
										<h1 className='font-bold font-marker border-b-2 border-slate-200 pb-4 capitalize'>No damage to</h1>
										<ul className='mt-4' onClick={() => typeDetail()}>
											{damage_relations.no_damage_to.length > 0
												? damage_relations.no_damage_to.map((item) => {
														return (
															<li key={item.name} className='list-disc ml-8'>
																<a
																	className='hover:text-blue-500 cursor-pointer capitlize'
																	onClick={() => {
																		router.push(`${item.name}`);
																	}}>
																	{item.name}
																</a>
															</li>
														);
												  })
												: 'None'}
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='bg-white p-4'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4'>Related Pokemon</h1>
								<div className='mt-4'>
									{pokemon.map((item, index) => {
										return (
											<Link href={`/pokemon/${item.pokemon.name}`} key={index}>
												<ul>
													<li className='list-disc ml-8'>
														<a className='hover:text-blue-700 cursor-pointer'>{item.pokemon.name.concat(' ')}</a>
													</li>
												</ul>
											</Link>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
