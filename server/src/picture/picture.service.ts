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

	async like(pictureId: string, userId: string) {
		const picture = await this.prisma.picture.findUnique({
			where: { id: pictureId },
		})
		if (!picture) {
			throw new Error('Picture not found')
		}

		if (picture.likesUsers.includes(userId)) {
			throw new Error('User has already liked this picture')
		}

		return await this.prisma.picture.update({
			where: { id: pictureId },
			data: {
				likes: picture.likes + 1,
				likesUsers: {
					push: userId,
				},
			},
		})
	}
}
