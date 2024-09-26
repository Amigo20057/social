export interface IRegister {
	name: string
	email: string
	password: string
	avatar?: string
}

export interface ILogin {
	email: string
	password: string
}

export interface Payload {
	token?: string
}

export interface IUserData {
	name: string
	email: string
	avatar?: string
}

export interface AuthState {
	data: IUserData | null
	token?: string
	status: 'loading' | 'loaded' | 'error'
}
