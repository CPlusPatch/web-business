import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";

export async function getUserByToken(value: string) {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const token = await AppDataSource.getRepository(Token).findOne({
		relations: {
			user: true,
		},
		select: {
			user: {
				avatar: true,
				banner: true,
				created_at: true,
				edited_at: true,
				id: true,
				role: true,
				username: true,
				display_name: true,
				oauthAccounts: true,
			},
		},
		where: {
			token: value,
		},
	});

	if (token?.user) return token.user;
	else return null;
}
