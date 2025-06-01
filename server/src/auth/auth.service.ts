import { UserService } from "@/user/user.service";
import { IUser } from "@/user/user.types";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ILogin } from "./auth.types";

export class AuthService extends UserService {
	async login(dto: ILogin): Promise<ILogin & { token: string }> {
		const user = await this.findUserByEmail(dto.email);
		if (!user) {
			throw new Error("User does not exist");
		}

		const validatePassword = await bcrypt.compare(dto.password, user.password);
		if (!validatePassword) {
			throw new Error("Incorrect login or password");
		}

		const token = jwt.sign({ _id: user.id }, process.env.SECRET || "", {
			expiresIn: "30d",
		});

		return { ...user, token };
	}

	async register(dto: IUser): Promise<IUser & { token: string }> {
		const existsUser = await this.findUserByEmail(dto.email);
		if (existsUser) {
			throw new Error("User already exists");
		}
		dto.password = await this.hashPassword(dto.password);
		const user = await this.createUser(dto);
		const token = jwt.sign({ _id: user.id }, process.env.SECRET || "", {
			expiresIn: "30d",
		});
		return { ...user, token } as IUser & { token: string };
	}
}
