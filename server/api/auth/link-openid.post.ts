import { AppDataSource } from "~/db/data-source";
import { User } from "~/db/entities/User";
import { User as OidcUser } from "oidc-client-ts";
import { getUserByToken } from "~/utils/tokens";
import { validateToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const body = await readBody<OidcUser>(event);

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
		userId = await validateToken(body) ?? "";
	} catch (err) {
		throw createError({
			statusCode: 401,
			statusMessage: (err as any).message as string,
		});
	}

	user.oauthAccounts = [
		...(user.oauthAccounts ?? []),
		{
			provider: "cpluspatch-id",
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
