import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const HotelDetails = () => {
	const {
		register,

		formState: { errors },
	} = useFormContext<HotelFormData>()

	return (
		<>
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Add Hotel</h1>
			<input
				type='text'
				placeholder='Enter your name'
				className='cursor-pointer bg-slate-100 p-3  rounded-lg'
				{...register('name', { required: 'This field is required' })}
			/>
			{errors?.name && (
				<p className='text-red-500 text-left '>{errors?.name?.message}</p>
			)}
			<div className='flex gap-2'>
				<input
					type='text'
					placeholder='Enter your city'
					className='flex-1 cursor-pointer bg-slate-100 p-3  rounded-lg'
					{...register('city', { required: 'This field is required' })}
				/>
				<input
					type='text'
					placeholder='Enter country'
					className='flex-1 cursor-pointer bg-slate-100 p-3  rounded-lg'
					{...register('country', { required: 'This field is required' })}
				/>
			</div>
			{errors?.city && (
				<p className='text-red-500 text-left '>{errors?.city?.message}</p>
			)}
			{errors?.country && (
				<p className='text-red-500 text-left '>{errors?.country?.message}</p>
			)}
			<textarea
				rows={5}
				placeholder='Description'
				className='cursor-pointer bg-slate-100 p-3  rounded-lg'
				{...register('description', { required: 'This field is required' })}
			/>
			{errors?.description && (
				<p className='text-red-500 text-left '>
					{errors?.description?.message}
				</p>
			)}
			<div className='flex space-x-4'>
				<div>
					<input
						type='text'
						placeholder='Price per Night'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('pricePerNight', {
							required: 'This field is required',
						})}
					/>
					{errors?.pricePerNight && (
						<p className='text-red-500 text-left '>
							{errors?.pricePerNight?.message}
						</p>
					)}
				</div>
				<div>
					<select
						className='px-4 py-3 bg-slate-200 rounded-lg'
						{...register('starRating', {
							required: 'This field is required',
						})}>
						<option>Star Rating</option>
						{[1, 2, 3, 4, 5].map((num, i) => (
							<option  key={i} value={num}>{num}</option>
						))}
					</select>
					{errors?.starRating && (
						<p className='text-red-500 text-left '>
							{errors?.starRating?.message}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default HotelDetails
