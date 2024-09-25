import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from '../../axios.ts'
import { AuthState, ILogin, IRegister } from '../../types/auth.types'
import { RootState } from '../store.ts'

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: IRegister) => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (params: ILogin) => {
		const { data } = await axios.post('/auth/login', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
	const { data } = await axios.get('/user/me')
	return data
})

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
			//REGISTER
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

			//LOGIN
			.addCase(fetchLogin.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchLogin.fulfilled,
				(state, action: PayloadAction<{ token: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchLogin.rejected, state => {
				state.status = 'error'
				state.data = null
			})

			//ME
			.addCase(fetchAuthMe.pending, state => {
				state.status = 'loading'
				state.data = null
			})
			.addCase(
				fetchAuthMe.fulfilled,
				(state, action: PayloadAction<{ token?: string }>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchAuthMe.rejected, state => {
				state.status = 'error'
				state.data = null
			})
	},
})

export const selectIsAuth = (state: RootState) => {
	return state.auth.data?.token || window.localStorage.getItem('token')
}
export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
