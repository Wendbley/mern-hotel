import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import * as apiClient from '../api/api-client'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import { useAppContext } from '../hooks/useAppContext'

/**
 *
 * @returns
 */
const EditHotel = () => {
	const { hotelId } = useParams()
	const { showToast } = useAppContext()

	const { data } = useQuery(
		'fetchHotelById',
		() => apiClient.fetchMyHotelById(hotelId || ''),
		{
			enabled: !!hotelId,
		}
	)

	const { mutate, isLoading } = useMutation(apiClient.UpdateMyHotelById, {
		onSuccess:  () => {
			showToast({ message: 'Record successfully updated', type: 'SUCCESS' })
			// <Navigate to='/login' replace={true}
		},
		onError: () => {
			showToast({ message: 'Error Updating Hotel', type: 'ERROR' })
		},
	})

	/**
	 * 
	 * @param data 
	 */
	const onSave = (data: FormData) => {
		mutate(data)
	}

	// if (isLoading) {
	// 	return (
	// 		<button type='button' className='bg-indigo-500 ...' disabled>
	// 			<svg
	// 				className='animate-spin h-5 w-5 mr-3 ...'
	// 				viewBox='0 0 24 24'></svg>
	// 			Processing...
	// 		</button>
	// 	)
	// }

	return <ManageHotelForm hotel={data} isLoading={isLoading} onSave={onSave} />
}

export default EditHotel
