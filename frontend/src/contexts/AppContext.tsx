import { ReactNode, createContext, useContext, useState } from 'react'
import Toast from '../components/Toast'
import { useQuery } from 'react-query'
import * as apiClient from '../api/api-client'

type ToastMessage = {
	message: string
	type: 'SUCCESS' | 'ERROR'
}

type AppContext = {
	showToast: (toastMessage: ToastMessage) => void
	isLoggedIn: boolean
}

const AppContext = createContext<AppContext>({} as AppContext)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
	const [toast, setToast] = useState<ToastMessage>()
	const { isError } = useQuery('validateToken', apiClient.validateToken, {
		retry: false,
	})

	return (
		<AppContext.Provider
			value={{
				showToast: (message) => {
					setToast(message)
				},
				isLoggedIn: !isError,
			}}>
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(undefined)}
				/>
			)}
			{children}
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
