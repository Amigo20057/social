import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Register } from './pages'

export const App: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path='/register' element={<Register />} />
			</Routes>
		</>
	)
}
