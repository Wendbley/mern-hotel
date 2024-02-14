import { useQuery } from 'react-query'
import { useSearchContext } from '../hooks/useSearchContex'
import * as apiClient from '../api/api-client'
import { SearchParams } from '../types'

const Search = () => {
	const search = useSearchContext()
	console.log(search)

	const searchParams: SearchParams = {
		destination: search?.destination,
		checkIn: search?.checkIn.toLocaleDateString(),
		checkOut: search?.checkIn.toLocaleDateString(),
		adultCount: search?.adultCount.toString(),
		childCount: search?.childCount.toString(),
	}

	const { data } = useQuery(['searchHotels', searchParams], () =>
		apiClient.SearchHotels(searchParams )
	)

	console.log(data)
	return (
		<div className='flex-1  bg-white '>
			<h1>Search</h1>
		</div>
	)
}

export default Search
