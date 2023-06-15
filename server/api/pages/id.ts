import { AppDataSource } from "~~/db/data-source";
import { Page } from "~/db/entities/Page";

export default defineEventHandler(async event => {
	const body = (await readBody(event)) as Partial<Page>;
	/* const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	); */

	// const isAdmin = user?.role === Role.ADMIN;

	const page = await AppDataSource.initialize()
		.then(async AppDataSource => {
			return await AppDataSource.getRepository(Page).findOneBy({
				path: body.path,
			});
		})
		.finally(() => {
			AppDataSource.destroy();
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