import { PrismaClient } from '@prisma/client'
import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import path from 'path'
import { authRouter } from './auth/auth.controller'
import { pictureRouter } from './picture/picture.controller'
import { userRouter } from './user/user.controller'
import { corsOptions } from './utils/cors'
import { logger } from './utils/log'

const PORT = process.env.PORT
const app = express()
export const prisma = new PrismaClient()

async function main() {
	app.use(cors(corsOptions))
	app.use(helmet())
	app.use(compression())
	app.use(express.json())

	app.use((req, res, next) => {
		res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
		next()
	})

	app.use('/avatars', express.static(path.join(__dirname, 'avatars/')))
	app.use('/pictures', express.static(path.join(__dirname, 'pictures/')))

	app.use('/auth', authRouter)
	app.use('/user', userRouter)
	app.use('/picture', pictureRouter)

	app.all('*', (req: Request, res: Response) => {
		res.status(404).json({
			message: 'Not Found Route',
		})
	})

	app.use((err: Error, req: Request, res: Response) => {
		logger.error(err.stack)
		res.status(500).send('Error')
	})

	app.listen(PORT, () => {
		logger.info(`Server is running on PORT ${PORT}`)
	})
}

main()
	.catch(async err => {
		logger.error(err)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect
	})
