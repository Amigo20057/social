import { PrismaClient } from '@prisma/client'
import { IPicture } from './picture.types'

export class PictureService {
	private prisma = new PrismaClient()

	async createPicture(dto: IPicture): Promise<IPicture> {
		return dto
	}
}
