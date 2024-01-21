import { useMutation, useQueryClient } from "react-query"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api/api-client"
import { useNavigate } from "react-router-dom"

/**
 * 
 * @returns 
 */
const SingOut = () => {
    const { showToast } = useAppContext()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

	const mutation = useMutation(apiClient.logout, {
		onSuccess: async (data) => {
			showToast({ message: data.message, type: 'SUCCESS' })
			await queryClient.invalidateQueries('validateToken')
			navigate('/') // <Navigate to='/login' replace={true} /
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' })
		},
	})

    const handleClick = () => {
        mutation.mutate()
    }

	return (
		<button onClick={handleClick}
			className='bg-red-700 text-white font-bold py-2 px-3 rounded-md uppercase cursor-pointer hover:opacity-95 disabled:opacity-80'
			type='button'>
			Log out
		</button>
	)
}

export default SingOut
