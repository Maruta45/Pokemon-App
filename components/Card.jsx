/** @format */
import Image from 'next/image';

const Card = (props) => {
	return (
		<div className='bg-slate-200 p-4 rounded-sm flex flex-col items-center'>
			<Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.url}.svg`} alt={props.name} width={300} height={350} />
			<a className='text-xl py-4 font-oswald font-bold border-slate-700'>{props.name}</a>
		</div>
	);
};

export default Card;
