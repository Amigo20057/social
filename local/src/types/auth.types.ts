export interface IRegister {
	name: string
	email: string
	password: string
	avatar?: string
}

export interface Payload {
	token?: string
}

export interface AuthState {
	data: {
		token?: string
		[key: string]: unknown
	} | null
	status: 'loading' | 'loaded' | 'error'
}
