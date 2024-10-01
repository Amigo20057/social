export interface IPicture {
	id?: string
	name?: string
	url?: string
	description?: string
	likes?: number
	likesUsers?: [string]
}

export interface ICreatePicture {
	name: string
	picture: FileList
	description: string
}

export interface PictureState {
	items: IPicture[]
	status: 'loading' | 'loaded' | 'error'
}
