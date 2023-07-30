import { AppDataSource } from "~/db/data-source";
import { User } from "~/db/entities/User";
import { User as OidcUser } from "oidc-client-ts";
import { getUserByToken } from "~/utils/tokens";
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
	
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	if (!user) throw createError({
		statusCode: 401,
	});

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	
	let userId: string;
	
	try {
		userId =
			(await validateToken(
				body.body,
				provider
			)) ?? "";
	} catch (err) {
		throw createError({
			statusCode: 401,
			statusMessage: (err as any).message as string,
		});
	}

	if (user.oauthAccounts?.find(account => account.provider === body.provider)) throw createError("Account already has this OIDC provider linked!");

	user.oauthAccounts = [
		...(user.oauthAccounts ?? []),
		{
			provider: body.provider,
			id: await userId,
		}
	];

	if (await AppDataSource.getRepository(User).save(user)) {
		return;
	} else {
		throw createError({
			statusCode: 500,
		});
	}
});
