import { db } from './db'


/**
 * 
 * @param user 
 * @returns 
 */
export const CreateUser = async (user: any) => { 
    const newUser = await db.user.create({
        data: {...user},
    })
    
    return newUser
}
/**
 * 
 * @param email 
 * @returns 
 */
export const GetUserByEmail = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email,
		},
	})
 
	return user ? user : null
}

/**
 * 
 * @param id 
 * @returns 
 */
export const GetUserById = async (id: string) => {
	const user = await db.user.findUnique({
		where: {
			id,
		},
	})
	return user ? user : null
}

export const GetAllUsers = async () => {
	const users = await db.user.findMany({})
	return users
}
