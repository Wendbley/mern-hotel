import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'

const HotelImages = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>()
	return (
		<div>
			<hr className='my-4' />
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Images</h1>
			<div className='flex-1 flex flex-col'>
				<input
					type='file'
					multiple
					accept='image/*'
					placeholder='Select images here'
					className=' cursor-pointer bg-slate-100 p-3  rounded-lg'
					{...register('imageFiles', {
						validate: (imageFiles) => {
							const totalLength = imageFiles.length

							if (totalLength === 0) {
								return 'At least one image should be added'
							}
							if (totalLength > 6) {
								return 'Total number of images should be less  than 7'
							}
							return true
						},
					})}
					
				/>
				{errors?.imageFiles && (
					<p className='text-red-500 text-left '>
						{errors.imageFiles.message}
					</p>
				)}
			</div>
		</div>
	)
}

export default HotelImages
