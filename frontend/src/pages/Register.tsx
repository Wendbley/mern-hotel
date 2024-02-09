import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api/api-client'
import { useAppContext } from '../hooks/useAppContext'


export type RegisterFormData = {
	firstName: string
	lastName: string
	password: string
	confirmPassword: string
	email: string
}

const Register = () => {
	const queryClient = useQueryClient()
	const { showToast } = useAppContext()
	const navigate = useNavigate()

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>()

	/**
	 * Mutation: use-query Library
	 */
	const mutation = useMutation(apiClient.register, {
		onSuccess: async(data) => {
			showToast({ message: data.message, type: 'SUCCESS' })
			await queryClient.invalidateQueries("validateToken")
			navigate('/') // <Navigate to='/login' replace={true} /
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: 'ERROR' })
		},
	})

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data)
	})

	return (
		<main className='flex-1 bg-white  grid place-items-center'>
			<div className='min-w-[500px] flex flex-col mx-auto gap-4 p-3'>
				<h1 className='text-3xl font-bold text-center capitalize mt-2 mb-4'>
					Create an Account
				</h1>

				<form
					className='w-full flex flex-col gap-4 max-w-lg mx-auto'
					onSubmit={onSubmit}>
					<div className='flex flex-col md:flex-row items-center justify-between gap-2 '>
						<input
							type='firstName'
							placeholder='Enter your firstName'
							// defaultValue={firstName}
							className='w-full flex-1 cursor-pointer bg-slate-100 p-3  rounded-lg'
							{...register('firstName', { required: 'This field is required' })}
						/>

						<input
							type='lastName'
							placeholder='Enter your lastName'
							// defaultValue={lastName}
							className='w-full flex-1 cursor-pointer bg-slate-100 p-3  rounded-lg'
							{...register('lastName', { required: 'This field is required' })}
						/>
					</div>
					{errors?.firstName && (
						<p className='text-red-500 text-left '>
							{errors?.firstName?.message}
						</p>
					)}
					{errors?.lastName && (
						<p className='text-red-500 text-left '>
							{errors?.lastName?.message}
						</p>
					)}
					<input
						type='email'
						placeholder='Enter your email'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('email', { required: 'This field is required' })}
					/>
					{errors?.email && (
						<p className='text-red-500 text-left '>{errors?.email?.message}</p>
					)}
					<input
						type='password'
						placeholder='Enter your password'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('password', {
							required: 'This field is required',
							minLength: {
								value: 6,
								message: 'Password must be at least 6 characters',
							},
						})}
					/>
					{errors?.password && (
						<p className='text-red-500 text-left '>
							{errors?.password?.message}
						</p>
					)}
					<input
						type='password'
						placeholder='Confirm your password'
						className='cursor-pointer bg-slate-100 p-3  rounded-lg'
						{...register('confirmPassword', {
							validate: (value) =>
								value === watch('password') || 'The passwords do not match',
						})}
					/>
					{errors?.confirmPassword && (
						<p className='text-red-500 text-left '>
							{errors?.confirmPassword?.message}
						</p>
					)}
					<button
						type='submit'
						className='bg-slate-700 text-white px-2 p-3 rounded-lg uppercase cursor-pointer hover:opacity-95 disabled:opacity-80'
						name='_action'
						value='register'>
						Register
					</button>
					<OAuth />
				</form>
				<div className='gap-2 flex mt-5'>
					<p>Already have have an account?</p>
					<Link to='/login'>
						<span className='text-blue-500'>Login</span>
					</Link>
				</div>
			</div>
		</main>
	)
}

export default Register

// Actions on server (backend)
