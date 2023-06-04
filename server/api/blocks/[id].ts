// import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
// import { Post, Visibility } from "~~/db/entities/Post";
// import { getUserByToken } from "~/utils/tokens";
import { Block } from "~/db/entities/Block";

export default defineEventHandler(async () => {
	// const slug = event.context.params?.slug ?? "";
	/* const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	); */

	const blocks = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const blocks = await AppDataSource.getRepository(Block).find();

			return blocks;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (blocks) {
		return blocks;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
		});
	}
});
