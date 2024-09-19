import { checkAuth } from '@/utils/auth.middleware'
import { uploadPictures } from '@/utils/multer'
import { Request, Response, Router } from 'express'
import { createPictureDto } from './dto/createPictureDto'
import { PictureService } from './picture.service'

const route = Router()
const pictureService = new PictureService()

route.post(
	'/create-picture',
	checkAuth,
	uploadPictures.single('picture'),
	async (req: Request & { _id?: string }, res: Response) => {
		try {
			if (!req.file) {
				return res.status(400).json({ message: 'No file uploaded' })
			}

			const validate = createPictureDto.safeParse(req.body)
			if (!validate.success) {
				return res.status(400).json({ message: validate.error })
			}
			const userId = req._id
			if (!userId) {
				return res.status(404).json({ message: 'User ID is missing' })
			}

			const pictureUrl = `../pictures/${req.file.filename}`

			const picture = await pictureService.createPicture(
				req.body,
				userId,
				pictureUrl
			)

			res.status(200).json(picture)
		} catch (err: unknown) {
			if (err instanceof Error) {
				res.status(500).json({ error: err.message })
			} else {
				res.status(500).json({ error: 'An unknown error occurred' })
			}
		}
	}
)

export const pictureRouter = route
