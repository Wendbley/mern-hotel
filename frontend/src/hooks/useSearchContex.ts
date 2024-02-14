import { useContext } from 'react'
import { SearchContext } from '../contexts/SearchContext'


/**
 * 
 * @returns 
 */
export const useSearchContext = () => {
	return useContext(SearchContext)
}
