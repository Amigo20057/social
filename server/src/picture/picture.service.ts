import { PrismaClient } from '@prisma/client'
import { IPicture } from './picture.types'

export class PictureService {
	private prisma = new PrismaClient()

	async createPicture(
		dto: IPicture,
		id: string,
		pictureUrl: string
	): Promise<IPicture> {
		return await this.prisma.picture.create({
			data: {
				name: dto.name,
				url: pictureUrl,
				description: dto.description,
				userId: id,
			},
		})
	}

	async getAll() {
		return await this.prisma.picture.findMany()
	}
}
