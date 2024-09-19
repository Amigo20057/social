import multer from 'multer'
import path from 'path'

const avatarsDir = path.join(__dirname, '../avatars')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, avatarsDir)
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, `${Date.now()}${ext}`)
	},
})

const upload = multer({ storage })
export default upload
