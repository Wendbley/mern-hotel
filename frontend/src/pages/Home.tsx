import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SearchBar from '../components/SearchBar'




const Home = () => {
	return (
		<div className='min-h-screen  flex flex-col'>
			<Navbar />
			<div className="container mx-auto">
				<SearchBar/>
			</div>
			<Outlet  />
			<Footer />
		</div>
	)
}

export default Home
