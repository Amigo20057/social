import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from './pages'
import { Login } from './pages/Auth/Login/Login'

export const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}
