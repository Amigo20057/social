import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { FullPicture, Home, Login, Register } from './pages'
import { Profile } from './pages/Profile/Profile'
import { fetchAuthMe } from './redux/slices/auth'
import { AppDispatch } from './redux/store'

export const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [dispatch])

	return (
		<>
			<Header />
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<Home />} />
				<Route path='/picture/:id' element={<FullPicture />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</>
	)
}
