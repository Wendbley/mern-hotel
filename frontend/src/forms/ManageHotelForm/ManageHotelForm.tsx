import { FormProvider, useForm } from 'react-hook-form'
import HotelDetails from './HotelDetails'
import HotelTypes from './HotelTypes'
import HotelFacilities from './HotelFacilities'
import HotelGuests from './HotelGuests'
import HotelImages from './HotelImages'
import { useEffect } from 'react'
import { HotelType } from '../../types'

export type HotelFormData = {
	name: string
	city: string
	country: string
	description: string
	type: string
	pricePerNight: number
	starRating: number
	facilities: string[]
	imageFiles: File[]
	imageUrls: string[]
	adultCount: number
	childCount: number
}
export type Hotel_FormData = {
	name: string
	city: string
	country: string
	description: string
	type: string
	pricePerNight: number
	starRating: number
	facilities: string[]
	imageFiles: File[]
	adultCount: number
	childCount: number
}
type Props = {
	hotel?: HotelType
	onSave: (data: FormData) => void
	isLoading: boolean
}

const ManageHotelForm = ({ hotel, onSave, isLoading }: Props) => {
	const formMethods = useForm<HotelFormData>() // form provider
	const { handleSubmit, reset } = formMethods

	// repopulate the form
	useEffect(() => {
		reset(hotel)
	}, [hotel, reset])

	const onSubmit = handleSubmit((data: HotelFormData) => {
		const formData = new FormData()

		if (hotel) {
			formData.append('id', hotel.id)
		}
		formData.append('name', data.name)
		formData.append('city', data.city)
		formData.append('country', data.country)
		formData.append('description', data.description)
		formData.append('type', data.type)
		formData.append('pricePerNight', data.pricePerNight.toString())
		formData.append('starRating', data.starRating.toString())
		formData.append('adultCount', data.adultCount.toString())
		formData.append('childCount', data.childCount.toString())

		data.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility)
		})

		if (data.imageUrls) {
			data.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url)
			})
		}

		Array.from(data.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile)
		})
		onSave(formData)
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
