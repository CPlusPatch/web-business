import { randomBytes } from "crypto";
import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";
import { User } from "~/db/entities/User";

export default defineEventHandler(async event => {
	const body: {
		provider: string;
		userId: string;
	} = await readBody(event);

	if (!body.provider || !body.userId)
		throw createError({
			statusCode: 400,
			statusMessage: "Missing fields: provider and/or userId",
		});

	const user = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const user = await AppDataSource.getRepository(User)
				.createQueryBuilder("user")
				.where(
					`EXISTS(
						SELECT *
						FROM json_each(user.oauthAccounts)
						WHERE json_extract(value, '$.provider') = :provider
						AND json_extract(value, '$.id') = :userId
					)`,
					{ provider: body.provider, userId: body.userId }
				)
				.getOne();

			if (!user) return false;

			return user;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (!user)
		throw createError({
			statusCode: 401,
			statusMessage: "Incorrect username or password",
		});

	const token = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const token = new Token();

			token.user = user;
			token.token = randomBytes(128).toString("base64");
			token.expireDate = new Date(
				Date.now() +
					1000 /* sec */ *
						60 /* min */ *
						60 /* hour */ *
						24 /* day */ *
						7
			);

			await AppDataSource.getRepository(Token).save(token);

			if (!token) return false;
			return token;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (token) {
		return {
			token: token.token,
		};
	} else {
		throw createError({
			statusCode: 500,
		});
	}
});
