"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const auth_middleware_1 = require("@/utils/auth.middleware");
const multer_1 = require("@/utils/multer");
const express_1 = require("express");
const user_service_1 = require("./user.service");
const route = (0, express_1.Router)();
const userService = new user_service_1.UserService();
route.post('/update-user', auth_middleware_1.checkAuth, multer_1.uploadAvatars.single('avatar'), async (req, res) => {
    try {
        const userId = req._id;
        if (!userId) {
            return res.status(401).json({ message: 'User ID is missing' });
        }
        const updates = {};
        if (req.file) {
            const avatarUrl = `../avatars/${req.file.filename}`;
            updates.avatar = avatarUrl;
        }
        if (req.body.name && req.body.name.trim() !== '') {
            updates.name = req.body.name;
        }
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ message: 'No updates provided' });
        }
        await userService.updateUser(userId, updates);
        res.status(200).json({
            message: 'User updated successfully',
            updates,
        });
    }
    catch (err) {
        console.error('Error updating user:', err);
        res
            .status(500)
            .json({ error: err.message || 'An unknown error occurred' });
    }
});
route.get('/me', auth_middleware_1.checkAuth, async (req, res) => {
    try {
        if (!req._id) {
            return res.status(401).json({ message: 'User ID is missing' });
        }
        const user = await userService.getMe(req._id);
        res.status(200).json(user);
    }
    catch (err) {
        res
            .status(500)
            .json({ error: err.message || 'An unknown error occurred' });
    }
});
exports.userRouter = route;
