import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import Hero from './Hero'
import SingOut from './SingOut'
import { useAppContext } from '../hooks/useAppContext'

const Navbar = () => {
	const { isLoggedIn } = useAppContext()
	
	
	return (
		<div className='container mx-auto pt-4 bg-blue-900'>
			<header className='flex items-center justify-between text-white'>
				<h1 className='flex items-center gap-2'>
					<Link to='/'>
						<img src={logo} alt='logo' className='w-12 h-12 rounded-full ' />
					</Link>
					<span>Hotel</span>
				</h1>
				<nav className='flex items-center gap-2'>
					{isLoggedIn ? (
						<>
							<NavLink
								to='/my-bookings'
								className={({ isActive }) =>
									isActive
										? 'text-red-900 font-semibold py-2 bg-white px-3 rounded-md'
										: 'text-blue-600 font-semibold py-2 bg-white px-3 rounded-md'
								}>
								My Bookings
							</NavLink>
							<NavLink
								to='/my-hotels'
								className={({ isActive }) =>
									isActive
										? 'text-red-900 font-semibold py-2 bg-white px-3 rounded-md'
										: 'text-blue-600 font-semibold py-2 bg-white px-3 rounded-md'
								}>
								My Hotels
							</NavLink>
							<SingOut/>
						
					
						</>
					) : (
						<NavLink
							to='/login'
							className={({ isActive }) =>
								isActive
									? 'text-red-500 font-semibold py-2 bg-white px-3 rounded-md'
									: 'text-blue-600 font-semibold py-2 bg-white px-3 rounded-md'
							}>
							Login
						</NavLink>
					)}
				</nav>
			</header>

			{/* Hero section */}
			<Hero />
		</div>
	)
}

export default Navbar
