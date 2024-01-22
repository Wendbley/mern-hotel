import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { hotelTypes } from '../../config/hotel-options-config'

const HotelTypes = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<HotelFormData>()
	const typeWatch = watch('type')
	return (
		<>
			<hr className='my-4' />
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Type</h1>

			<div className='flex gap-2 flex-wrap'>
				{hotelTypes.map((type, index) => (
					// <div key={index} className='flex items-center justify-center'>
					<label
						key={index}
						className={
							typeWatch !== type
								? 'cursor-pointer px-3 py-2 bg-slate-300 rounded-2xl font-semibold '
								: 'cursor-pointer px-3 py-2 bg-blue-300 rounded-2xl font-semibold '
						}>
						<input
							type='radio'
							value={type}
							className='hidden'
							{...register('type', { required: 'This field is required' })}
						/>
						{type}
					</label>
					// </div>
				))}
			</div>
			{errors?.type && (
				<p className='text-red-500 text-left  block '>
					{errors?.type?.message}
				</p>
			)}
		</>
	)
}

export default HotelTypes
