import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { PictureState } from '../../types/picture.types'

export const fetchPictures = createAsyncThunk(
	'pictures/fetchPictures',
	async () => {
		const { data } = await axios.get('/picture/get-pictures')
		return data
	}
)

const initialState: PictureState = {
	items: [],
	status: 'loading',
}

const pictureSlice = createSlice({
	name: 'picture',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPictures.pending, state => {
				state.items = []
				state.status = 'loading'
			})
			.addCase(fetchPictures.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = 'loaded'
			})
			.addCase(fetchPictures.rejected, state => {
				state.items = []
				state.status = 'error'
			})
	},
})

export const pictureReducer = pictureSlice.reducer
