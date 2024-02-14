const SearchBarForm = () => {
	return (
		<div className='-mt-10 justify-self-center'>
			<form className='container flex justify-center items-center p-4 gap-3 bg-orange-600'>
				<input type='text' placeholder='Search' className='p-3 ' />
				<div className='bg-white px-3 flex  items-center'>
					Adults:{' '}
					<input
						type='text'
						placeholder='adults'
						defaultValue={1}
						className='p-3'
					/>
					Children:{' '}
					<input
						type='text'
						placeholder='children'
						defaultValue={0}
						className='p-3'
					/>
				</div>
				<input type='date' id='startDate' className='p-3' />
				<input type='date' id='endDate' className='p-3' />
				<button className='px-5 py-3 rounded-md  bg-blue-700 hover:bg-blue-500 text-white'>
					Search
				</button>
				<button className='px-5 py-3 rounded-md hover:bg-red-800 bg-red-500 text-white'>
					Clear
				</button>
			</form>
		</div>
	)
}

export default SearchBarForm
