// import { useDispatch, useSelector } from 'react-redux'
// import { Form, Link, Navigate, useActionData } from 'react-router-dom'
// import { loginFailure, loginSuccess } from '../features/auth/authSlice'
// import { useEffect } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth'
import { useForm } from 'react-hook-form'
import { useAppContext } from '../contexts/AppContext'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api/api-client'
// import OAuth from '../components/OAuth'

export type LoginFormData = {
	email: string
	password: string
}

const Login = () => {
	const { showToast } = useAppContext()
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>()

	const mutation = useMutation(apiClient.login, {
		onSuccess: async (data) => {
			showToast({ message: data.message, type: 'SUCCESS' })
			await queryClient.invalidateQueries('validateToken')
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
		<main className='flex-1 grid place-items-center bg-white'>
			<div className='min-w-[500px] flex flex-col mx-auto gap-4 p-3'>
				<h1 className='text-3xl font-bold text-center capitalize mt-2 mb-4'>
					Sign In
				</h1>

				<Form
					className='w-full flex flex-col gap-4 max-w-lg mx-auto'
					onSubmit={onSubmit}>
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

					<button
						type='submit'
						name='_action'
						value='login'
						className='bg-slate-700 text-white px-2 p-3 rounded-lg uppercase cursor-pointer hover:opacity-95 disabled:opacity-80'>
						Login
					</button>
					<OAuth />
				</Form>
				<div className='gap-2 flex mt-5'>
					<p>Don&apos;t have an account?</p>
					<Link to='/register'>
						<span className='text-blue-500'>Register</span>
					</Link>
				</div>
			</div>
		</main>
	)
}
export default Login
