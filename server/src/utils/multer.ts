import multer from 'multer'
import path from 'path'

const uploadsDir = path.join(__dirname, '../uploads')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadsDir)
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, `${Date.now()}${ext}`)
	},
})

const upload = multer({ storage })
export default upload
