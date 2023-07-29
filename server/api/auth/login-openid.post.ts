import { randomBytes } from "crypto";
import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";
import { User } from "~/db/entities/User";
import { User as OidcUser } from "oidc-client-ts";

export default defineEventHandler(async event => {
	const body = await readBody<OidcUser>(event);
	

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const userId = await useFetch("/api/auth/validate-openid", {
		body
	});

	if (!userId.data.value) {
		throw userId.error.value;
	}


	const user = await AppDataSource.getRepository(User)
		.createQueryBuilder("user")
		.where(
			`EXISTS(
					SELECT *
					FROM json_each(user.oauthAccounts)
					WHERE json_extract(value, '$.provider') = :provider
					AND json_extract(value, '$.id') = :userId
				)`,
			{ provider: "cpluspatch-id", userId: userId.data.value }
		)
		.getOne();

	if (!user)
		throw createError({
			statusCode: 401,
			statusMessage: "You do not have an account, please register for one.",
		});
	
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
