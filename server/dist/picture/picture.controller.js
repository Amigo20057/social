"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pictureRouter = void 0;
const auth_middleware_1 = require("@/utils/auth.middleware");
const multer_1 = require("@/utils/multer");
const express_1 = require("express");
const createPictureDto_1 = require("./dto/createPictureDto");
const picture_service_1 = require("./picture.service");
const route = (0, express_1.Router)();
const pictureService = new picture_service_1.PictureService();
route.post('/create-picture', auth_middleware_1.checkAuth, multer_1.uploadPictures.single('picture'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const validate = createPictureDto_1.createPictureDto.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({ message: validate.error });
        }
        const userId = req._id;
        if (!userId) {
            return res.status(404).json({ message: 'User ID is missing' });
        }
        const pictureUrl = `../pictures/${req.file.filename}`;
        const picture = await pictureService.createPicture(req.body, userId, pictureUrl);
        res.status(200).json(picture);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
route.get('/get-pictures', async (req, res) => {
    try {
        const pictures = await pictureService.getAll();
        res.status(200).json(pictures);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
route.get('/liked-pictures', auth_middleware_1.checkAuth, async (req, res) => {
    try {
        const userId = req._id;
        if (!userId) {
            return res.status(404).json({ message: 'User ID is missing' });
        }
        const pictures = await pictureService.getLikedPictures(userId);
        res.status(200).json(pictures);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
route.get('/get-pictures/:id', async (req, res) => {
    try {
        const pictureId = req.params.id;
        const picture = await pictureService.getOne(pictureId);
        res.status(200).json(picture);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
route.patch('/like/:id', auth_middleware_1.checkAuth, async (req, res) => {
    const userId = req._id;
    const pictureId = req.params.id;
    if (!userId) {
        return res.status(404).json({ message: 'User ID is missing' });
    }
    try {
        await pictureService.like(pictureId, userId);
        res.status(200).json({ message: 'successfully' });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
exports.pictureRouter = route;
