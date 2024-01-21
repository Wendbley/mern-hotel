import { Link } from 'react-router-dom'

const Error404 = () => {
	return (
		<div className='h-screen bg-blue-700 grid place-items-center'>
			<div className='text-white flex flex-col items-center gap-5'>
				<h1 className='text-3xl font-semibold'>404 Page</h1>
				<span className='text-lg'>Something went wrong!!!</span>
				<Link to='/' className='bg-white px-4 py-2 rounded-lg text-gray-950 font-semibold'>
					Go Home
				</Link>
			</div>
		</div>
	)
}

export default Error404
