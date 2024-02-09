import { useMutation } from 'react-query'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import * as apiClient from '../api/api-client'
import { useAppContext } from '../hooks/useAppContext'


const AddHotel = () => {
	const { showToast } = useAppContext()

	const { mutate, isLoading } = useMutation(apiClient.addHotel, {
		onSuccess: async (res) => {
			showToast({ message: res.message, type: 'SUCCESS' })
			// <Navigate to='/login' replace={true}
		},
		onError: () => {
			showToast({ message: 'Error Saving Hotel', type: 'ERROR' })
		},
	})

	const onSave = (data: FormData) => {
		mutate(data)
	}

	return <ManageHotelForm onSave={ onSave } isLoading={ isLoading }  hotel={{}}/>
}

export default AddHotel
