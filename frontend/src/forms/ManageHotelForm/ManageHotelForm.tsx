import { FormProvider, useForm } from 'react-hook-form'
import HotelDetails from './HotelDetails'
import HotelTypes from './HotelTypes'
import HotelFacilities from './HotelFacilities'
import HotelGuests from './HotelGuests'
import HotelImages from './HotelImages'

export type HotelFormData = {
	name: string
	city: string
	country: string
	description: string
	type: string
	pricePerNight: number
	starRating: number
	facilities: string[]
	imageFiles: FileList
	imageUrls: string[]
	adultCount: number
	childCount: number
}
type Props = {
	onSave: (data: HotelFormData) => void
	isLoading: boolean
}

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
	const formMethods = useForm<HotelFormData>() // form provider
	const { handleSubmit } = formMethods

	const onSubmit = handleSubmit((data: HotelFormData) => {
		if (data.imageFiles) {
			Array(data.imageFiles).forEach((imageFile,i) => {
				data.imageUrls[i] = (imageFile.item(i)!).toString()
				console.log(data.imageUrls[i])
			})
		}
		onSave(data)
	})

	return (
		<FormProvider {...formMethods}>
			<form className='bg-white  flex-1 p-8 ' onSubmit={onSubmit}>
				<div className='container mx-auto flex flex-col gap-2'>
					<HotelDetails />
					<HotelTypes />
					<HotelFacilities />
					<HotelGuests />
					<HotelImages />
					<button
						disabled={isLoading}
						className='self-end mt-6 bg-red-700 text-white font-bold py-2 px-3 rounded-md uppercase cursor-pointer  hover:opacity-80'
						type='submit'>
						{isLoading ? 'Saving...' : 'Save'}
					</button>
				</div>
			</form>
		</FormProvider>
	)
}

export default ManageHotelForm
