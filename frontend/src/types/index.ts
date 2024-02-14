export type HotelType = {
	id: string
	userId: string
	name: string
	city: string
	country: string
	description: string
	type: string
	adultCount: number
	chidlCount: number
	facilities: string[]
	pricePerNight: number
	starRating: number
	imageUrls: string[]
	lastUpdated: Date
}

export type SearchParams = {
	destination?: string
	checkIn?: string
	checkOut?: string
	adultCount?: string
	childCount?: string
	page?: string
}