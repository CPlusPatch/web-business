import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";

export async function getUserByToken(value: string) {
	const token = await AppDataSource.initialize()
		.then(async AppDataSource => {
			return await AppDataSource.getRepository(Token).findOne({
				relations: {
					user: true,
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
