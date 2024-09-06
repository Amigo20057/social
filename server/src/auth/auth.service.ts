import { UserService } from '@/user/user.service'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ILogin } from './auth.types'

export class AuthService extends UserService {
	async login(dto: ILogin): Promise<ILogin & { token: string }> {
		const user = await this.findUserByEmail(dto.email)
		if (!user) {
			throw new Error('User does not exist')
		}

		const validatePassword = await bcrypt.compare(dto.password, user.password)
		if (!validatePassword) {
			throw new Error('Incorrect login or password')
		}

		const token = jwt.sign({ _id: user.id }, process.env.SECRET || '', {
			expiresIn: '30d',
		})

		return { ...user, token }
	}
}
