import { checkAuth } from '@/utils/auth.middleware'
import { Request, Response, Router } from 'express'
import { createPictureDto } from './dto/createPictureDto'
import { PictureService } from './picture.service'

const route = Router()
const pictureService = new PictureService()

route.post(
	'/create-picture',
	checkAuth,
	async (req: Request, res: Response) => {
		try {
			const validate = createPictureDto.safeParse(req.body)
			if (!validate.success) {
				return res.status(400).json({ message: validate.error })
			}

			const picture = await pictureService.createPicture(req.body)

			res.status(201).json(picture)
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
