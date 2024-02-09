import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'


/**
 * 
 * @returns AppContext
 */
export const useAppContext = () => {
	return useContext(AppContext)
}
