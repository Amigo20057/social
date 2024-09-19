import { checkAuth } from '@/utils/auth.middleware'
import { uploadAvatars } from '@/utils/multer'
import { Request, Response, Router } from 'express'
import { UserService } from './user.service'

const route = Router()
const userService = new UserService()

route.post(
	'/upload-avatar',
	checkAuth,
	uploadAvatars.single('avatar'),
	async (req: Request & { _id?: string }, res: Response) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: 'No file uploaded' })
			}
			const userId = req._id
			if (!userId) {
				return res.status(401).json({ message: 'User ID is missing' })
			}
			const avatarUrl = `../avatars/${req.file.filename}`

			await userService.updateUserAvatar(userId, avatarUrl)

			res
				.status(200)
				.json({ message: 'Avatar uploaded successfully', avatarUrl })
		} catch (err) {
			res
				.status(500)
				.json({ error: (err as Error).message || 'An unknown error occurred' })
		}
	}
)

route.get(
	'/me',
	checkAuth,
	async (req: Request & { _id?: string }, res: Response) => {
		try {
			if (!req._id) {
				return res.status(401).json({ message: 'User ID is missing' })
			}

			const user = await userService.getMe(req._id)
			res.status(200).json(user)
		} catch (err) {
			res
				.status(500)
				.json({ error: (err as Error).message || 'An unknown error occurred' })
		}
	}
)

export const userRouter = route
