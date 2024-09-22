import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios.ts'
import { AuthState, IRegister } from '../../types/auth.types'

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: IRegister) => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

const initialState: AuthState = {
	data: null,
	status: 'loading',
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: state => {
			state.data = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchRegister.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchRegister.fulfilled,
				(state, action: PayloadAction<{ token?: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchRegister.rejected, state => {
				state.status = 'error'
				state.data = null
			})
	},
})

// export const selectIsAuth = (state: { auth: AuthState }) => {
// 	Boolean(state.auth.data)
// }

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
