import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	const isAdmin = user?.role === Role.ADMIN;

	return await AppDataSource.initialize()
		.then(async AppDataSource => {
			const posts = isAdmin
				? await AppDataSource.manager.find(Post)
				: await AppDataSource.getRepository(Post).findBy({
						visibility: Visibility.PUBLIC,
				  });

			return posts;
		})
		.finally(() => {
			AppDataSource.destroy();
		});
});
