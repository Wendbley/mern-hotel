import { RegisterFormData } from '../pages/Register'
import { LoginFormData } from '../pages/Login'
import { HotelFormData } from '../forms/ManageHotelForm/ManageHotelForm'

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

/***
 *
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
export const addHotel = async (formData: HotelFormData) => {
	
	const response = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}/my-hotels`,
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
