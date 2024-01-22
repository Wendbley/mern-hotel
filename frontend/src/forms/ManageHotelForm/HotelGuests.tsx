import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const HotelGuests = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>()
	return (
		<>
			<hr className='my-4' />
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Guests</h1>
			<div className='flex items-center justify-between gap-8 bg-slate-300 p-4'>
				<div className='flex-1 flex flex-col'>
					<label htmlFor='adultCount'>Adults</label>
					<input
						type='number'
						id='adultCount'
						min={0}
						placeholder='2'
						className=' cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('adultCount', { required: 'This field is required' })}
					/>
					{errors?.adultCount && (
						<p className='text-red-500 text-left '>
							{errors.adultCount.message}
						</p>
					)}
				</div>
				<div className='flex-1 flex flex-col'>
					<label htmlFor='adultCount'>Children</label>
					<input
						type='number'
						id='childCount'
						min={0}
						placeholder='2'
						className=' cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('childCount', { required: 'This field is required' })}
					/>
					{errors?.childCount && (
						<p className='text-red-500 text-left '>
							{errors.childCount.message}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default HotelGuests
