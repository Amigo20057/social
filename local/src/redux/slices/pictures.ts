import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { IPicture, PictureState } from '../../types/picture.types'

export const fetchPictures = createAsyncThunk(
	'pictures/fetchPictures',
	async () => {
		const { data } = await axios.get('/picture/get-pictures')
		return data
	}
)

export const fetchCreatePicture = createAsyncThunk(
	'picture/fetchCreatePicture',
	async (params: FormData) => {
		const { data } = await axios.post('/picture/create-picture', params)
		return data
	}
)

export const fetchLikePictures = createAsyncThunk(
	'pictures/fetchLikePictures',
	async (id: string | undefined) => {
		const response = await axios.patch(`/picture/like/${id}`)
		return response.data
	}
)

export const fetchLikedPictures = createAsyncThunk(
	'pictures/fetchLikedPictures',
	async () => {
		const { data } = await axios.get('/picture/liked-pictures')
		return data
	}
)

const initialState: PictureState = {
	items: [] as IPicture[],
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

			.addCase(fetchCreatePicture.pending, state => {
				state.items = []
				state.status = 'loading'
			})
			.addCase(fetchCreatePicture.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = 'loaded'
			})
			.addCase(fetchCreatePicture.rejected, state => {
				state.items = []
				state.status = 'error'
			})

			.addCase(fetchLikePictures.fulfilled, (state, action) => {
				const likedPicture = state.items.find(
					picture => picture.id === action.meta.arg
				)

				if (likedPicture && likedPicture.likes !== undefined) {
					likedPicture.likes += 1
				}
			})
			.addCase(fetchLikePictures.rejected, state => {
				state.status = 'error'
			})

			.addCase(fetchLikedPictures.pending, state => {
				state.items = []
				state.status = 'loading'
			})
			.addCase(fetchLikedPictures.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = 'loaded'
			})
			.addCase(fetchLikedPictures.rejected, state => {
				state.items = []
				state.status = 'error'
			})
	},
})

export const pictureReducer = pictureSlice.reducer
