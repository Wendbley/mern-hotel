import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'



const Home = () => {
	return (
		<div className='min-h-screen bg-blue-900 flex flex-col'>
			<Navbar />
			<Outlet  />
			<Footer />
		</div>
	)
}

export default Home
