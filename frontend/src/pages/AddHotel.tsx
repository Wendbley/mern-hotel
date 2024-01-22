import { useMutation } from 'react-query'
import ManageHotelForm, {
	HotelFormData,
} from '../forms/ManageHotelForm/ManageHotelForm'
import * as apiClient from '../api/api-client'
import { useAppContext } from '../contexts/AppContext'

const AddHotel = () => {
	const { showToast } = useAppContext()

	const { mutate, isLoading } = useMutation(apiClient.addHotel, {
		onSuccess: async () => {
			showToast({ message: 'Hotel Saved!', type: 'SUCCESS' })
			// <Navigate to='/login' replace={true}
		},
		onError: () => {
			showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
		},
	})

	const onSave = (data: HotelFormData) => {
		mutate(data)
	}

	return <ManageHotelForm onSave={ onSave } isLoading={ isLoading } />
}

export default AddHotel
