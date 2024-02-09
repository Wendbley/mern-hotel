import { useFormContext } from 'react-hook-form'
import { HotelFormData } from './ManageHotelForm'


/**
 * 
 * @returns 
 */
const HotelImages = () => {
	const {
		register,
		watch,
		setValue,
		formState: { errors },
	} = useFormContext<HotelFormData>()

	const existingImages = watch('imageUrls')

	/**
	 *
	 * @param e
	 * @param url
	 */
	const handleDelete = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		url: string
	) => {
		e.preventDefault()
		setValue(
			'imageUrls',
			existingImages.filter((image) => image !== url)
		)
	}

	return (
		<div>
			<hr className='my-4' />
			<h1 className='text-3xl font-bold  capitalize mt-2 mb-4'>Images</h1>
			<div className='flex-1 flex flex-col'>
				{existingImages && (
					<div className='grid grid-cols-6 gap-4 mb-3'>
						{existingImages &&
							existingImages.map((image, index) => (
								<div className='relative group' key={index}>
									<img src={image} alt='' className='min-h-full object-cover' />
									<button
										type='button'
										className='inset-0 absolute flex items-center justify-center rounded-md bg-black bg-opacity-20 text-white font-semibold px-3 py-2 opacity-0 group-hover:opacity-100'
										onClick={(e) => handleDelete(e, image)}>
										Delete
									</button>
								</div>
							))}
					</div>
				)}
				<input
					type='file'
					multiple
					accept='image/*'
					placeholder='Select images here'
					className='mt-4 cursor-pointer bg-slate-100 p-3  rounded-lg'
					{...register('imageFiles', {
						validate: (imageFiles) => {
							const totalLength = imageFiles.length + (existingImages?.length || 0)
							console.log(totalLength)

							if (totalLength === 0) {
								return 'At least one image should be added'
							}
							if (totalLength > 6) {
								return 'Total number of images should be less  than 6'
							}
							return true
						},
					})}
				/>
				{errors?.imageFiles && (
					<p className='text-red-500 text-left '>{errors.imageFiles.message}</p>
				)}
			</div>
		</div>
	)
}

export default HotelImages
