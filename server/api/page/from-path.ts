import { AppDataSource } from "~~/db/data-source";
import { Page } from "~/db/entities/Page";

export default defineEventHandler(async event => {
	const body = (await readBody(event)) as Partial<Page>;
	/* const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	); */

	// const isAdmin = user?.role === Role.ADMIN;

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	await AppDataSource.getRepository(Page).find({
		where: {
			path: body.path === "" ? "index" : body.path,
		},
	});

	const page = await AppDataSource.getRepository(Page).find({
		where: {
			path: body.path === "" ? "index" : body.path,
		},
	});

	if (page) {
		return page;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
		});
	}
});
