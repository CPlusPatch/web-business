import DOMPurify from "isomorphic-dompurify";
import { User } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	// Authenticate user (parse Authorization: Bearer TOKEN) header
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	const id = event.context.params?.id ?? "";

	if (user?.id.toString() !== id) {
		throw createError({
			statusCode: 401,
		});
	}

	const body = (await readBody(event)) as Partial<User>;

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const dbUser = await AppDataSource.getRepository(User).findOneBy({
		id: Number.parseInt(id),
	});

	if (!dbUser) return false;

	if (body.display_name)
		dbUser.display_name = DOMPurify.sanitize(body.display_name);

	await AppDataSource.getRepository(User).save(dbUser);

	if (dbUser) {
		return {
			...dbUser,
			display_name: body.display_name ?? dbUser.display_name,
		};
	} else {
		throw createError({
			statusCode: 404,
		});
	}
});
