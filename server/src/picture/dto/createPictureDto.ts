import z from 'zod'

export const createPictureDto = z.object({
	name: z.string().min(3, 'Full name must have min 3 symbol').max(24),
	description: z.string().min(5, 'Description must have min 5 symbol').max(24),
})
