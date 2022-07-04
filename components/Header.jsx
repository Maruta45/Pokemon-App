/** @format */
import Link from 'next/link';

const Header = () => {
	return (
		<nav className='flex px-2 sm:px-6 py-4 bg-sky-500 text-white'>
			<Link href='/'>
				<a className='font-bold text-xl font-marker'>PokeNext</a>
			</Link>
			<div className='flex items-center ml-auto space-x-6 '>
				<Link href='/pokedex'>
					<a>Pokedex</a>
				</Link>
				<Link href='/favorites'>
					<a>Favorites</a>
				</Link>
			</div>
		</nav>
	);
};

export default Header;
