import multer from 'multer'
import path from 'path'

const avatarsDir = path.join(__dirname, '../avatars')
const picturesDir = path.join(__dirname, '../pictures')

const storageAvatars = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, avatarsDir)
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, `${Date.now()}${ext}`)
	},
})

const storagePictures = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, picturesDir)
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname)
		cb(null, `${Date.now()}${ext}`)
	},
})

export const uploadAvatars = multer({ storage: storageAvatars })
export const uploadPictures = multer({ storage: storagePictures })

// export default  uploadAvatars uploadPictures
// export default uploadPictures
