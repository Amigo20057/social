import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import {
	CreatePicture,
	FullPicture,
	Home,
	Login,
	NotFound,
	Register,
} from './pages'
import { Profile } from './pages/Profile/Profile'
import { fetchAuthMe } from './redux/slices/auth'
import { AppDispatch } from './redux/store'

export const App: React.FC = () => {
	const dispatch: AppDispatch = useDispatch<AppDispatch>()
	const [searchQuery, setSearchQuery] = useState<string>('')

	useEffect(() => {
		dispatch(fetchAuthMe())
	}, [dispatch])

	return (
		<>
			<Header setSearchQuery={setSearchQuery} />
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/' element={<Home searchQuery={searchQuery} />} />
				<Route path='/picture/:id' element={<FullPicture />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/create' element={<CreatePicture />} />
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}
