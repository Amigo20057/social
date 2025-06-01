"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
    async createUser(dto) {
        const existUser = await this.findUserByEmail(dto.email);
        if (existUser) {
            throw new Error('User already exists');
        }
        dto.password = await this.hashPassword(dto.password);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: dto.password,
                avatar: dto.avatar,
            },
        });
        const token = jsonwebtoken_1.default.sign({ _id: user.id }, process.env.SECRET || '', {
            expiresIn: '30d',
        });
        return { ...user, token };
    }
    async updateUser(userId, updates) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: updates,
        });
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error('User does not exist');
        }
        return user;
    }
}
exports.UserService = UserService;
