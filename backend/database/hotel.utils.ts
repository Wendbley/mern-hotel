import { HotelType } from '../shared'
import { db } from './db'

/****************************************** Search Hotel ******************************************** */
/**
 *
 * @param hotel
 * @returns
 */
export const CreateHotel = async (hotel: any) => {
	console.log(hotel)
	const newHotel = await db.hotel.create({
		data: { ...hotel },
	})

	return newHotel
}
/**
 *
 * @param userId
 * @returns
 */
export const GetAllMyHotels = async (userId: string) => {
	const hotels = await db.hotel.findMany({
		where: {
			userId,
		},
	})
	return hotels
}

/**
 *
 * @param userId
 * @returns
 */
export const GetHotel = async (id: string, userId: string) => {
	const hotels = await db.hotel.findUnique({
		where: {
			id,
			userId,
		},
	})
	return hotels
}

/**
 *
 * @param id
 * @param hotel
 * @returns
 */
export const UpdateHotel = async (
	id: string,
	userId: string,
	hotel: HotelType
) => {
	const hotels = await db.hotel.update({
		where: {
			id,
			userId,
		},
		data: { ...hotel },
	})
	return hotels
}

/****************************************** Search Hotel ******************************************** */
export const GetAllHotels = async () => {
	const hotels = await db.hotel.findMany({})
	const total = await db.hotel.count()
	return { hotels, total }
}
