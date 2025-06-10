import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IUser } from "./user.types";

export class UserService {
	protected prisma = new PrismaClient();

	async findUserByEmail(email: string) {
		return await this.prisma.user.findUnique({ where: { email } });
	}

	async hashPassword(password: string) {
		return await bcrypt.hash(password, 10);
	}

	async createUser(dto: IUser): Promise<IUser & { id: string }> {
		return await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: dto.password,
				avatar: dto.avatar,
			},
		});
	}

	async updateUser(
		userId: string,
		updates: { avatar?: string; name?: string }
	) {
		return await this.prisma.user.update({
			where: { id: userId },
			data: updates,
		});
	}

	async getMe(userId: string) {
		const user = await this.prisma.user.findUnique({ where: { id: userId } });
		if (!user) {
			throw new Error("User does not exist");
		}

		return user;
	}
}
