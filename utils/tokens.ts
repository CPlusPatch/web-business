import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";

export async function getUserByToken(value: string) {
	const token = await AppDataSource.initialize()
		.then(async AppDataSource => {
			return await AppDataSource.getRepository(Token).findOne({
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
					},
				},
				where: {
					token: value,
				},
			});
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (token && token.user) return token.user;
	else return null;
}
