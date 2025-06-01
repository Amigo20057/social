"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureService = void 0;
const client_1 = require("@prisma/client");
class PictureService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async createPicture(dto, id, pictureUrl) {
        return await this.prisma.picture.create({
            data: {
                name: dto.name,
                url: pictureUrl,
                description: dto.description,
                userId: id,
            },
        });
    }
    async getAll() {
        return await this.prisma.picture.findMany();
    }
    async getOne(pictureId) {
        return await this.prisma.picture.findUnique({ where: { id: pictureId } });
    }
    async getLikedPictures(userId) {
        return await this.prisma.picture.findMany({
            where: {
                likesUsers: {
                    has: userId,
                },
            },
        });
    }
    async like(pictureId, userId) {
        const picture = await this.prisma.picture.findUnique({
            where: { id: pictureId },
        });
        if (!picture) {
            throw new Error('Picture not found');
        }
        if (picture.likesUsers.includes(userId)) {
            return await this.prisma.picture.update({
                where: { id: pictureId },
                data: {
                    likes: picture.likes - 1,
                    likesUsers: {
                        set: picture.likesUsers.filter(user => user !== userId),
                    },
                },
            });
        }
        else {
            return await this.prisma.picture.update({
                where: { id: pictureId },
                data: {
                    likes: picture.likes + 1,
                    likesUsers: {
                        push: userId,
                    },
                },
            });
        }
    }
}
exports.PictureService = PictureService;
