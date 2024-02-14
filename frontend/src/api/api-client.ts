import { RegisterFormData } from '../pages/Register'
import { LoginFormData } from '../pages/Login'
import {  SearchParams } from '../types'
import { SearchHotelType, HotelType } from '../../../backend/shared'

/**
 *
 * @param formData
 * @returns
 */
export const register = async (formData: RegisterFormData) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/users/register`,
		{
			method: 'POST',
			credentials: 'include', // set cookies of the browser
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}
	)

	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

/**
 *
 * @param formData
 * @returns
 */
export const login = async (formData: LoginFormData) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/auth/login`,
		{
			method: 'POST',
			credentials: 'include', // set cookies of the browser
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		}
	)

	const data = await response.json()
	if (!response.ok) {
		throw new Error(data.message)
	}
	return data
}

/**
 *
 * @returns
 */
export const logout = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/auth/logout`,

		{ method: 'POST', credentials: 'include' }
	)
	const data = await response.json()
	if (!response.ok) {
		throw new Error('Error during sign out')
	}
	return data
}

/**
 *
 * @returns
 */
export const validateToken = async () => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/auth/validate-token`,
		{ credentials: 'include' }
	)

	if (!response.ok) {
		throw new Error('Token invalid')
	}
	return response.json()
}

// Hotels
/**
 *
 * @param formData
 * @returns
 */
export const addHotel = async (formData: FormData) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/my-hotels`,
		{
			method: 'POST',
			credentials: 'include', // set cookies of the browser
			body: formData,
		}
	)

	if (!response.ok) {
		throw new Error('Failed to add hotel')
	}
	return response.json()
}
// Hotels
/**
 *
 * @returns
 */
export const fetchMyHotels = async (): Promise<HotelType[]> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/my-hotels`,
		{
			credentials: 'include', // set cookies of the browser
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetch hotels')
	}
	return response.json()
}

/**
 *
 * @param hotelId
 * @returns
 */
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/my-hotels/${hotelId}`,
		{
			credentials: 'include', // set cookies of the browser
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetch hotel')
	}
	return response.json()
}

/**
 *
 * @param hotelId
 * @param formData
 * @returns
 */
export const UpdateMyHotelById = async (formData: FormData) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/my-hotels/${formData.get('id')}`,
		{
			method: 'PUT',
			credentials: 'include', // set cookies of the browser
			body: formData,
		}
	)

	if (!response.ok) {
		throw new Error('Failed to update hotel')
	}
	return response.json()
}

export const SearchHotels = async (searchParams: SearchParams): Promise<SearchHotelType> => {
	const queryParams = new URLSearchParams(searchParams)
	queryParams.append('destination', searchParams.destination || '')
	queryParams.append('checkIn', searchParams.checkIn || '')
	queryParams.append('checkOut', searchParams.checkOut || '')
	queryParams.append('adulCount', searchParams.adultCount || '')
	queryParams.append('childCount', searchParams.childCount || '')
	queryParams.append('page', searchParams.page || '')

	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/hotels/search?${queryParams.toString()}`,
		{

			credentials: 'include', // set cookies of the browser
			
		}
	)

	if (!response.ok) {
		throw new Error('Failed to fetching hotel')
	}
	return response.json()
}
