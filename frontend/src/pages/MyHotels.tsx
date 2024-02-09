import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Banknote, Flag, Hotel, Star } from 'lucide-react'
import * as apiClient from '../api/api-client'

const MyHotels = () => {
	const { data } = useQuery('hotels', apiClient.fetchMyHotels, {
		onSuccess: (data) => {
			console.log(data)
		},
	})

	const { hotels: hotelData } = data || {}

	if (!hotelData) <h1>Loading...</h1>
	return (
		<div className='flex-1  bg-white  pt-8'>
			<div className='container mx-auto'>
				<div className='flex items-center justify-between'>
					<h1 className='text-3xl font-bold'>My Hotels</h1>
					<Link
						to='/add-hotel'
						className='text-xl px-3 py-2 rounded-md bg-blue-700 text-white font-semibold cursor-pointer'>
						Add Hotel
					</Link>
				</div>
				{/* <div className='flex flex-col  gap-4 mt-4 text-justify'>
					<h2 className='text-xl font-bold'>Your Hotels</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
						suscipit sit maxime placeat error! Excepturi, labore nobis, facilis
						porro mollitia ducimus beatae est aliquam repellendus ipsa deleniti
						deserunt eligendi aperiam autem odio accusantium tempora non dolor
						consectetur. Reiciendis odit neque, ut aliquid laboriosam aut
						necessitatibus dicta voluptatibus, consequuntur quae voluptate!
					</p>

					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
						eligendi libero quo laboriosam magni dolores rerum. Esse repellat
						aut odit!
					</p>

					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum
						nihil a veritatis, illo harum quaerat debitis, ex nemo blanditiis
						quod nam. Id ratione, ipsum tempore consectetur delectus praesentium
						atque dolores.
					</p>
				</div> */}
				<div className='grid  gap-8 mt-3'>
					{hotelData?.map((hotel) => (
						<div
							key={hotel.id}
							className='flex flex-col justify-between border border-slate-300 rounded-md p-3'>
							<h2 className='text-2xl font-bold'>{hotel.name}</h2>
							<div className='whitespace-pre-line m-2'>{hotel.description}</div>
							<div className='grid grid-cols-5 gap-2 p-2 mb-3'>
								<div className='border border-slate-300 rounded-sm p-3 flex items-center'>
									{hotel.city} , {hotel.country}
								</div>
								<div className='border border-slate-300 rounded-sm p-3 flex items-center'>
									<Hotel className='mr-2' />
									{hotel.type}
								</div>
								<div className='border border-slate-300 rounded-sm p-3 flex items-center'>
									<Banknote className='mr-2 whitespace-nowrap flex items-center' />
									R{hotel.pricePerNight} / Night
								</div>
								<div className='border border-slate-300 rounded-sm p-3 flex items-center'>
									<Flag className='mr-2 whitespace-nowrap flex items-center' />
									{hotel.adultCount} Adults, {hotel.childCount} Children
								</div>
								<div className='border border-slate-300 rounded-sm p-3 flex items-center'>
									<Star className='mr-2 whitespace-nowrap flex items-center' />
									{hotel.starRating} Star Rating
								</div>
							</div>
							<div className='flex justify-end'>
							<Link
						to={`/edit-hotel/${hotel.id}`} className='bg-blue-700 text-white font-bold mb-3 p-3 rounded-lg justify-end shrink-0'>
									View Details
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default MyHotels
