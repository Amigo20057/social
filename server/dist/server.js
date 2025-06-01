"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const auth_controller_1 = require("./auth/auth.controller");
const picture_controller_1 = require("./picture/picture.controller");
const user_controller_1 = require("./user/user.controller");
const cors_2 = require("./utils/cors");
const log_1 = require("./utils/log");
const PORT = process.env.PORT;
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
async function main() {
    app.use((0, cors_1.default)(cors_2.corsOptions));
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use((req, res, next) => {
        res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        next();
    });
    app.use('/avatars', express_1.default.static(path_1.default.join(__dirname, 'avatars/')));
    app.use('/pictures', express_1.default.static(path_1.default.join(__dirname, 'pictures/')));
    app.use('/auth', auth_controller_1.authRouter);
    app.use('/user', user_controller_1.userRouter);
    app.use('/picture', picture_controller_1.pictureRouter);
    app.all('*', (req, res) => {
        res.status(404).json({
            message: 'Not Found Route',
        });
    });
    app.use((err, req, res) => {
        log_1.logger.error(err.stack);
        res.status(500).send('Error');
    });
    app.listen(PORT, () => {
        log_1.logger.info(`Server is running on PORT ${PORT}`);
    });
}
main()
    .catch(async (err) => {
    log_1.logger.error(err);
    process.exit(1);
})
    .finally(async () => {
    await exports.prisma.$disconnect;
});
