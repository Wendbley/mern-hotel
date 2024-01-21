import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, useActionData } from 'react-router-dom'
import { loginFailure, loginSuccess } from '../features/auth/authSlice'
import { storage } from '../firebase'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'
import DeleteAccount from '../components/DeleteAccount'

/**
 *
 * @returns
 */
const Profile = () => {
	const [image, setImage] = useState(null)
	const [photo, setPhoto] = useState(null)
	const [imagePercent, setImagePercent] = useState(0)
	const [imageError, setImageError] = useState(false)
	const data = useActionData()
	const { user } = useSelector((state) => state.auth)
	const { username, email, sessionToken: token } = user
	const dispatch = useDispatch()
	const fileRef = useRef(null)

	/**
	 *
	 */
	useEffect(() => {
		setPhoto(user?.photo)
		if (data?.user) {
			dispatch(loginSuccess(data.user))
		}
		if (data?.error) {
			dispatch(loginFailure())
		}
	}, [data, dispatch, user?.photo])

	/**
	 *
	 */
	useEffect(() => {
		if (image) {
			handleFileUpload(image)
		}
	}, [image])



	/**
	 *
	 * @param {*} image
	 */
	const handleFileUpload = async (image) => {
		const fileName = new Date().getTime() + image.name

		// Upload fle and metadata to the object
		const storageRef = ref(storage, fileName)
		const uploadTask = uploadBytesResumable(storageRef, image)

		// Listen for state changes, errors, and completion of the upload
		uploadTask.on(
			'state_changed',
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setImagePercent(Math.round(progress))
				// console.log('Upload is ' + progress + '% done')
			},
			() => {
				setImageError(true)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
					setPhoto(downloadURL)
				)
			}
		)
	}

	return (
		<main className=' max-w-lg mx-auto mt-12 space-y-5'>
			<h1 className='text-3xl font-bold text-center capitalize'>Profile</h1>
			<Form className='flex flex-col gap-4 max-w-lg mx-auto' method='put'>
				<input
					type='file'
					ref={fileRef}
					hidden
					accept='image/*'
					onChange={(e) => setImage(e.target.files[0])}
				/>
				{/* 
						firebase storage rules:  
						allow read;
						allow write: if
						request.resource.size < 2 * 1024 * 1024 &&
						request.resource.contentType.matches('image/.*') 
				*/}
				<img
					src={
						photo ||
						photo ||
						'https://cdn-icons-png.flaticon.com/512/149/149071.png'
					}
					alt=''
					className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
					onClick={() => fileRef.current.click()}
				/>
				<p className='text-sm self-center'>
					{imageError ? (
						<span className='text-red-700'>
							Error uploading image (file size must be less than 2 MB)
						</span>
					) : imagePercent > 0 && imagePercent < 100 ? (
						<span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
					) : imagePercent === 100 ? (
						<span className='text-green-700'>Image uploaded successfully</span>
					) : (
						''
					)}
				</p>

				<input
					type='text'
					className='hidden'
					name='token'
					defaultValue={token}
				/>
				<input
					type='text'
					className='hidden'
					name='photo'
					defaultValue={photo}
				/>
				<input
					type='text'
					placeholder='Enter your username'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg'
					name='username'
					defaultValue={username}
				/>
				<input
					type='email'
					placeholder='Enter your email'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg'
					name='email'
					defaultValue={email}
				/>
				<input
					type='password'
					placeholder='Enter your password'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg'
					name='password'
					defaultValue='password'
				/>
				<input
					type='text'
					placeholder='Enter your phone number'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg'
					name='phone'
					defaultValue='+(213) 555 555 555'
				/>
				<input
					type='text'
					placeholder='Enter your street address'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg'
					name='street'
					defaultValue='123 Main Street'
				/>
				<div className='flex justify-between gap-x-6'>
					<input
						type='text'
						placeholder='Enter your postal code'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg w-full'
						name='postalCode'
						defaultValue='12345'
					/>
					<input
						type='text'
						placeholder='Enter your city'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg w-full'
						name='city'
						defaultValue='Cape Town'
					/>
				</div>
				<input
					type='text'
					placeholder='Enter your country'
					className='cursor-pointer bg-slate-100 p-3  rounded-lg '
					name='country'
					defaultValue='South Africa'
				/>
				<button
					type='submit'
					name='_action'
					value='update'
					className='bg-slate-700 text-white px-2 p-3 rounded-lg uppercase cursor-pointer hover:opacity-95 disabled:opacity-80'>
					update
				</button>
			</Form>
			{data?.error && <p className='text-red-500'>{data.error}!</p>}
			{data?.message && <p className='text-red-500'>{data.message}!</p>}
			<DeleteAccount id={user._id} token={user.sessionToken} />
		</main>
	)
}

export default Profile
