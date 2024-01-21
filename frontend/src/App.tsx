import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Error404 from './pages/Error404'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './layout/Main'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext'

function App() {
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
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 0 } },
	})
	return (
		<QueryClientProvider client={queryClient}>
			<AppContextProvider>
				<RouterProvider router={router} />
			</AppContextProvider>
		</QueryClientProvider>
	)
}

export default App
