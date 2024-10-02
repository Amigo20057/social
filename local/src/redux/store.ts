import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { pictureReducer } from './slices/pictures'
import { userReducer } from './slices/user'

const store = configureStore({
	reducer: {
		auth: authReducer,
		pictures: pictureReducer,
		user: userReducer,
	},
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
