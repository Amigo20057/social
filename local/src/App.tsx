import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Register } from './pages'
import { Login } from './pages/Auth/Login/Login'

export const App: React.FC = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}
