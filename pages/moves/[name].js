/** @format */

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function Moves() {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [name, setName] = useState('');
	const [pp, setPp] = useState();
	const [power, setPower] = useState();
	const [priority, setPriority] = useState();
	const [meta, setMeta] = useState({});
	const [accuracy, setAccuracy] = useState();
	const [damage, setDamage] = useState({});
	const [effect_chance, setEffectChance] = useState();
	const [effect_changes, setEffectChanges] = useState([]);
	const [effect_entries, setEffectEntries] = useState([]);
	const [stat_changes, setStatChanges] = useState([]);
	const [contest_type, setContestType] = useState({});
	const [moveTarget, setMoveTarget] = useState({});
	const [learned_by_pokemon, setLearnedByPokemon] = useState([]);
	const [moveType, setMoveType] = useState({});
	const [game, setGame] = useState([]);

	useEffect(() => {
		movesDetail();
	}, []);

	const movesDetail = async () => {
		const { name } = router.query;
		const requestOptions = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};
		fetch(`https://pokeapi.co/api/v2/move/${name}`, requestOptions)
			.then((res) => res.json())
			.then((data) => {
				const { name, meta, power, pp, priority, accuracy, contest_type, damage_class, effect_entries, effect_chance, effect_changes, stat_changes, learned_by_pokemon, machines, target, type } = data;
				setPp(pp);
				setName(name);
				setPower(power);
				setMeta(meta);
				setDamage(damage_class);
				setPriority(priority);
				setAccuracy(accuracy);
				setMoveTarget(target);
				setMoveType(type);
				setContestType(contest_type);
				setGame(machines);
				setLearnedByPokemon(learned_by_pokemon);
				setStatChanges(stat_changes);
				setEffectChance(effect_chance);
				setEffectChanges(effect_changes);
				setEffectEntries(effect_entries);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	if (loading) {
		return <div className='w-full h-screen flex justify-center items-center text-2xl font-marker font-bold'>Loading...</div>;
	} else {
		return (
			<Layout headTitle={`Moves - ${name}`} headDesc={`All information about ${name}`}>
				<div>
					<h1 className='font-bold font-marker text-2xl my-8 text-center capitalize'>{name}</h1>
					<div className='space-y-4'>
						<div className='bg-slate-100 p-4'>
							<div className='bg-white p-4 border'>
								<h1 className='font-bold font-marker capitalize text-2xl border-b-2 border-slate-200 pb-4'>Status</h1>
								<div className='mt-4 space-y-2'>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>type :</h1>
										<span className='font-normal capitalize'>{moveType.name === null ? 'No Results' : moveType.name}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>contest type :</h1>
										<span className='font-normal capitalize'>{contest_type.name === null ? 'No Results' : contest_type.name}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>damage type :</h1>
										<span className='font-normal capitalize'>{damage.name === null ? 'No Results' : damage.name}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>pp :</h1>
										<span className='font-normal capitalize'>{pp === null ? 'No Results' : pp}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>priority :</h1>
										<span className='font-normal capitalize'>{priority === null ? 'No Results' : priority}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>power :</h1>
										<span className='font-normal capitalize'>{power === null ? 'No Results' : power}</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>accuracy :</h1>
										<span className='font-normal capitalize'>{accuracy === null ? 0 : accuracy}%</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>target :</h1>
										<span className='font-normal capitalize'>{moveTarget.name === null ? 0 : moveTarget.name}</span>
									</div>
									<div className='flex space-x-1'>
										<div className='font-semibold space-y-2'>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>ailment : </span>
												<span className='font-normal capitalize'>{meta.ailment.name}</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>Ailment chance : </span>
												<span className='font-normal capitalize'>{meta.ailment_chance === null ? 0 : meta.ailment_chance}%</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>flinch chance : </span>
												<span className='font-normal capitalize'>{meta.flinch_chance === null ? 0 : meta.flinch_chance}%</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>critical rate : </span>
												<span className='font-normal capitalize'>{meta.crit_rate === null ? 0 : meta.crit_rate}%</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>drain : </span>
												<span className='font-normal capitalize'>{meta.drain === null ? 0 : meta.drain}%</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>healihg : </span>
												<span className='font-normal capitalize'>{meta.healing === null ? 0 : meta.healing} hp</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>max hits : </span>
												<span className='font-normal capitalize'>{meta.max_hits === null ? 0 : meta.max_hits}</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>max turns : </span>
												<span className='font-normal capitalize'>{meta.max_turns === null ? 0 : meta.max_turns}</span>
											</p>
											<p className='font-semibold font-oswald'>
												<span className='capitalize'>stat chance : </span>
												<span className='font-normal capitalize'>{meta.stat_chance === null ? 0 : meta.stat_chance}</span>
											</p>
										</div>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>stat changes :</h1>
										<span className='font-normal capitalize'>
											{stat_changes.length > 0
												? 'None'
												: stat_changes &&
												  stat_changes.map((item, index) => {
														return (
															<p key={index} className='font-semibold font-oswald'>
																{item.stat.name} : {item.change}
															</p>
														);
												  })}
										</span>
									</div>
									<div className='flex space-x-1'>
										<h1 className='font-semibold font-oswald capitalize'>effect chance :</h1>
										<span className='font-normal capitalize'>{effect_chance === null ? 'None' : effect_chance}</span>
									</div>
									<div className='grid grid-cols-1 lg:grid-cols-12'>
										<h1 className='font-semibold font-oswald capitalize'>effect changes :</h1>
										<span className='font-normal capitalize col-span-11'>
											{effect_changes === null
												? 'None'
												: effect_changes &&
												  effect_changes.map((item, index) => {
														return (
															<div key={index}>
																{item.effect_entries.map((item, index) => {
																	return <p key={index}>{item.effect}</p>;
																})}
															</div>
														);
												  })}
										</span>
									</div>
									<div className='grid grid-cols-1 lg:grid-cols-12'>
										<h1 className='font-semibold font-oswald capitalize'>effect entries :</h1>
										<span className='font-normal capitalize col-span-11'>
											{effect_entries === null
												? 'None'
												: effect_entries.map((item, index) => {
														return <p key={index}>{item.effect}</p>;
												  })}
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='bg-white border p-4'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4 capitalize'>Games</h1>
								<ul className='mt-4'>
									{game.length > 0
										? game &&
										  game.map((item, index) => {
												return (
													<div key={index}>
														<li className='list-disc ml-8'>
															<a className='hover:text-blue-700 capitalize cursor-pointer' onClick={() => router.push(`/games/${item.version_group.name}`)}>
																{item.version_group.name.concat(' ')}
															</a>
														</li>
													</div>
												);
										  })
										: 'None'}
								</ul>
							</div>
						</div>
						<div className='bg-slate-100 p-4'>
							<div className='bg-white border p-4'>
								<h1 className='font-bold font-marker text-xl border-b-2 border-slate-200 pb-4 capitalize'>Learned by pokemon</h1>
								<ul className='mt-4'>
									{learned_by_pokemon &&
										learned_by_pokemon.map((item, index) => {
											return (
												<div key={index}>
													<li className='list-disc ml-8'>
														<a className='hover:text-blue-700 capitalize cursor-pointer' onClick={() => router.push(`/pokemon/${item.name}`)}>
															{item.name.concat(' ')}
														</a>
													</li>
												</div>
											);
										})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
