"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPictures = exports.uploadAvatars = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const avatarsDir = path_1.default.join(__dirname, '../avatars');
const picturesDir = path_1.default.join(__dirname, '../pictures');
const storageAvatars = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, avatarsDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});
const storagePictures = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, picturesDir);
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});
exports.uploadAvatars = (0, multer_1.default)({ storage: storageAvatars });
exports.uploadPictures = (0, multer_1.default)({ storage: storagePictures });
// export default  uploadAvatars uploadPictures
// export default uploadPictures
