import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Error404 from './pages/Error404'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './layout/Main'
import { useAppContext } from './contexts/AppContext'
import AddHotel from './pages/AddHotel'

function App() {
	const { isLoggedIn } = useAppContext()


	const router = createBrowserRouter([
		{
			path: '/',
			element: <Home />,
			// errorElement: <Error404 />,
			children: [
				{
					index: true,
					element: <Main />,
				},
				{
					path: '/add-hotel',
					element: isLoggedIn ? <AddHotel /> : <Main />,
				},
				{
					path: '/login',
					element: <Login />,
				},
				{
					path: '/register',
					element: <Register />,
				},
			],
		},

		{
			path: '*',
			element: <Error404 />,
		},
	])

	return <RouterProvider router={router} />
}

export default App
