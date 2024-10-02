import { checkAuth } from '@/utils/auth.middleware'
import { uploadAvatars } from '@/utils/multer'
import { Request, Response, Router } from 'express'
import { UserService } from './user.service'

const route = Router()
const userService = new UserService()

route.post(
	'/update-user',
	checkAuth,
	uploadAvatars.single('avatar'),
	async (req: Request & { _id?: string }, res: Response) => {
		try {
			const userId = req._id
			if (!userId) {
				return res.status(401).json({ message: 'User ID is missing' })
			}

			const updates: { avatar?: string; name?: string } = {}

			if (req.file) {
				const avatarUrl = `../avatars/${req.file.filename}`
				updates.avatar = avatarUrl
			}

			if (req.body.name && req.body.name.trim() !== '') {
				updates.name = req.body.name
			}

			if (Object.keys(updates).length === 0) {
				return res.status(400).json({ message: 'No updates provided' })
			}

			await userService.updateUser(userId, updates)

			res.status(200).json({
				message: 'User updated successfully',
				updates,
			})
		} catch (err) {
			console.error('Error updating user:', err)
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
