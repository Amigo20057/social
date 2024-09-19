import { createUserDto } from '@/user/dto/createUserDto'
import { UserService } from '@/user/user.service'
import { Request, Response, Router } from 'express'
import { AuthService } from './auth.service'

const route = Router()
const userService = new UserService()
const authService = new AuthService()

route.post('/register', async (req: Request, res: Response) => {
	try {
		const validate = createUserDto.safeParse(req.body)

		if (!validate.success) {
			return res.status(400).json({ message: validate.error })
		}

		const user = await userService.createUser(req.body)

		res.status(200).json(user)
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
})

route.post('/login', async (req: Request, res: Response) => {
	try {
		const user = await authService.login(req.body)
		res.status(200).json(user)
	} catch (err: unknown) {
		if (err instanceof Error) {
			res.status(500).json({ error: err.message })
		} else {
			res.status(500).json({ error: 'An unknown error occurred' })
		}
	}
})

export const authRouter = route
