import { randomBytes } from "crypto";
import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";
import { User } from "~/db/entities/User";
import { User as OidcUser } from "oidc-client-ts";
import { validateToken } from "~/utils/tokens";
import { getConfig } from "~/utils/config";

export default defineEventHandler(async event => {
	const oidc = getConfig()?.oidc_providers ?? [];

	const body = await readBody<{
		body: OidcUser;
		provider: string;
	}>(event);

	const provider = oidc.find(o => o.id === body.provider);
	if (!provider) throw createError("Invalid OIDC provider!");

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	let userId: string;

	try {
		userId = (await validateToken(body.body, provider)) ?? "";
	} catch (err) {
		throw createError({
			statusCode: 401,
			statusMessage: (err as any).message as string,
		});
	}


	const user = await AppDataSource.getRepository(User)
		.createQueryBuilder("user")
		.where(
			`EXISTS(
					SELECT *
					FROM jsonb_array_elements(("user"."oauthAccounts")::jsonb)
					WHERE (value ->> 'provider') = :provider
					AND (value ->> 'id') = :userId
				)`,
			{ provider: body.provider, userId }
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
