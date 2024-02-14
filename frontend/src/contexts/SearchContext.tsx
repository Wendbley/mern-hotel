import { ReactNode, createContext, useState } from 'react'

type SearchContext = {
	destination: string
	checkIn: Date
	checkOut: Date
	adultCount: number
	childCount: number
	hotelId: string
	saveSearchValues: (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		adultCount: number,
		childCount: number,
		hotelId: string
	) => void
}
export const SearchContext = createContext<SearchContext | undefined>(undefined)


/**
 * 
 * @param param0 
 * @returns 
 */
export const SearchContextProvider = ({
	children,
}: {
	children: ReactNode
}) => {
	const [destination, setDestination] = useState<string>('')
	const [checkIn, setCheckIn] = useState<Date>(new Date())
	const [checkOut, setCheckOut] = useState<Date>(new Date())
	const [adultCount, setAdultCount] = useState<number>(1)
	const [childCount, setChildCount] = useState<number>(0)
	const [hotelId, setHotelId] = useState<string>('')

	const saveSearchValues = (
		destination: string,
		checkIn: Date,
		checkOut: Date,
		adultCount: number,
		childCount: number,
		hotelId: string
	) => {
		setDestination(destination)
		setCheckIn(checkIn)
		setCheckOut(checkOut)
		setAdultCount(adultCount)
		setChildCount(childCount)
		setHotelId(hotelId)
	}
	return (
		<SearchContext.Provider
			value={{
				destination,
				checkIn,
				checkOut,
				adultCount,
				childCount,
				saveSearchValues,
				hotelId,
			}}>
			{children}
		</SearchContext.Provider>
	)
}
