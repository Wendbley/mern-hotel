import { FormEvent, useState } from 'react'
import { useSearchContext } from '../hooks/useSearchContex'
import { FileSearch } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
	const search = useSearchContext()
	const navigate = useNavigate()
	const [destination, setDestination] = useState<string>(search.destination)
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn)
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut)
	const [adultCount, setAdultCount] = useState<number>(search.adultCount)
	const [childCount, setChildCount] = useState<number>(search.childCount)
	const [hotelId, setHotelId] = useState<string>(search.hotelId)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		search.saveSearchValues(
			destination,
			checkIn,
			checkOut,
			adultCount,
			childCount,
			hotelId
		)

		navigate('/search')
	}

	const maxDate = new Date()
	const minDate = new Date()
	maxDate.setFullYear(maxDate.getFullYear() + 1)

	return (
		<form
			className='-mt-8 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 p-3 bg-orange-500 shadow-md items-center'
			onSubmit={handleSubmit}>
			<div className='flex items-center flex-1 bg-white px-2'>
				<FileSearch />
				<input
					type='text'
					placeholder='Where are you going?'
					className='p-2 focus:outline-none '
					value={destination}
					onChange={(e) => setDestination(e.target.value)}
				/>
			</div>
			<div className='flex bg-white p-2 overflow-hidden'>
				<label htmlFor='startDate' className=' items-center flex'>
					Adults:
					<input
						type='number'
						placeholder='adults'
						className='focus:outline-none font-semibold ml-1'
						min={1}
						max={20}
						value={adultCount}
						onChange={(e) => setAdultCount(+e.target.value)}
					/>
				</label>
				<label htmlFor='endDate' className='items-center flex'>
					Children:{' '}
					<input
						type='number'
						placeholder='children'
						className=' focus:outline-none font-semibold ml-1'
						min={0}
						max={20}
						value={childCount}
						onChange={(e) => setChildCount(+e.target.value)}
					/>
				</label>
			</div>
			<div className='flex items-center justify-center p-1 bg-white'>
				<DatePicker
					className='focus:outline-none'
					selected={checkIn}
					selectsStart
					showIcon
					placeholderText='Check-in'
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					onChange={(date: Date) => setCheckIn(date as Date)}
				/>
			</div>
			<div className='flex items-center justify-center p-1 bg-white'>
				<DatePicker
					showIcon
					className='focus:outline-none'
					selectsEnd
					placeholderText='Check-out'
					selected={checkOut}
					startDate={checkIn}
					endDate={checkOut}
					minDate={minDate}
					maxDate={maxDate}
					onChange={(date: Date) => setCheckOut(date as Date)}
					wrapperClassName='min-w-full'
				/>
			</div>

			<div className='flex gap-1'>
				<button className=' px-6 py-3 rounded-md  bg-blue-700 hover:bg-blue-500 text-white' type='submit'>
					Search
				</button>
				<button className=' px-6 py-3 rounded-md hover:bg-red-600 bg-red-700 text-white'>
					Clear
				</button>
			</div>
		</form>
	)
}

export default SearchBar
