export interface IPicture {
	name?: string
	url?: string
	description?: string
	likes?: number
}

export interface PictureState {
	items: IPicture[]
	status: 'loading' | 'loaded' | 'error'
}
