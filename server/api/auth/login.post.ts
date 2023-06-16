import { randomBytes } from "crypto";
import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";
import { User } from "~/db/entities/User";
import { createPasswordHash } from "~/utils/passwords";

export default defineEventHandler(async event => {
	const body: {
		username?: string;
		password: string;
	} = await readBody(event);

	if (!body.username || !body.password)
		throw createError({
			statusCode: 400,
			statusMessage: "Missing fields: username and/or password",
		});

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const user = await AppDataSource.getRepository(User).findOneBy({
		username: body.username,
	});

	if (
		!(
			user &&
			(await createPasswordHash(
				body.password,
				user.password.split(":")[1]
			)) === user.password
		)
	)
		throw createError({
			statusCode: 401,
			statusMessage: "Incorrect username or password",
		});

	const token = new Token();

	token.user = user;
	token.token = randomBytes(128).toString("base64");
	token.expireDate = new Date(
		Date.now() +
			1000 /* sec */ * 60 /* min */ * 60 /* hour */ * 24 /* day */ * 7
	);

	await AppDataSource.getRepository(Token).save(token);

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
