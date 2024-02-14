const Footer = () => {
	return (
		<footer className='bg-blue-900 text-center text-white tracking-tighter p-2 py-5'>
			<div className='container mx-auto flex justify-between items-center'>
				<span className='text-3xl-text-white font-bold tracking-tight'>
					JFK Hotel
				</span>
				<p className="text-lg capitalize">All rights reserved &copy; {new Date().getFullYear()}</p>
				<span className='text-white font-bold tracking-tight flex gap-4'>
					<p className='cursor-pointer'>Privacy Policy</p>
					<p className='cursor-pointer'>Terms of Service</p>
				</span>
			</div>
		</footer>
	)
}

export default Footer
