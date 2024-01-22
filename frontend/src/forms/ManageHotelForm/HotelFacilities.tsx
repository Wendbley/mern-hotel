import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'
import { facilities } from '../../config/hotel-options-config'

const HotelFacilities = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>()
	return (
		<>
			<hr className='my-4' />
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Facilities</h1>

			<div className='flex gap-4 flex-wrap'>
				{facilities.map((facility, index) => (
					<div key={index} className='flex items-center justify-center  gap-1'>
						<input
							type='checkbox'
							value={facility}
							className=''
							{...register('facilities', {
								required: 'This field is required',
							})}
						/>
						<label className='cursor-pointer'>{facility}</label>
					</div>
				))}
				{errors?.facilities && (
					<p className='text-red-500 text-left '>
						{errors?.facilities?.message}
					</p>
				)}
			</div>
		</>
	)
}

export default HotelFacilities
