import { PrismaClient } from '@prisma/client'
import { IPicture } from './picture.types'

export class PictureService {
	private prisma = new PrismaClient()

	async createPicture(dto: IPicture, id: string): Promise<IPicture> {
		this.prisma.picture.create({
			data: {
				name: dto.name,
				url: dto.url,
				description: dto.description,
				userId: id,
			},
		})
		return dto
	}
}
