"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserDto = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserDto = zod_1.default.object({
    name: zod_1.default.string().min(3, 'Full name must have min 3 symbol').max(24),
    email: zod_1.default.string().min(5, 'Email must have min 5 symbol').max(24),
    password: zod_1.default.string().min(5, 'Password must have min 5 symbol').max(64),
});
