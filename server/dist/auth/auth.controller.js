"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const createUserDto_1 = require("@/user/dto/createUserDto");
const user_service_1 = require("@/user/user.service");
const express_1 = require("express");
const auth_service_1 = require("./auth.service");
const route = (0, express_1.Router)();
const userService = new user_service_1.UserService();
const authService = new auth_service_1.AuthService();
route.post('/register', async (req, res) => {
    try {
        const validate = createUserDto_1.createUserDto.safeParse(req.body);
        if (!validate.success) {
            return res.status(400).json({ message: validate.error });
        }
        const user = await userService.createUser(req.body);
        res.status(200).json(user);
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
route.post('/login', async (req, res) => {
    try {
        const user = await authService.login(req.body);
        res.status(200).json(user);
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
exports.authRouter = route;
