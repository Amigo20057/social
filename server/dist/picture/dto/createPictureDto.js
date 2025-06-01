"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPictureDto = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createPictureDto = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Full name must have min 3 symbol').max(24),
    description: zod_1.default.string().min(5, 'Description must have min 5 symbol').max(24),
});
