import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { IUserData } from '../../types/auth.types'

export const fetchUpdateUser = createAsyncThunk(
	'user/fetchUpdateUser',
	async (params: FormData) => {
		const { data } = await axios.post('/user/update-user', params)
		return data
	}
)

const initialState: {
	data: IUserData | null
	status: 'loading' | 'loaded' | 'error'
} = {
	data: null,
	status: 'loading',
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser: state => {
			state.data = null
			state.status = 'loading'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUpdateUser.pending, state => {
				state.data = null
				state.status = 'loading'
			})
			.addCase(fetchUpdateUser.fulfilled, (state, action) => {
				state.data = action.payload
				state.status = 'loaded'
			})
			.addCase(fetchUpdateUser.rejected, state => {
				state.data = null
				state.status = 'error'
			})
	},
})

export const userReducer = userSlice.reducer
