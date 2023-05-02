import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";

export default defineEventHandler(async event => {
	const isAdmin =
		event.node.req.headers.authorization?.split(" ")[1] ===
		process.env.TOKEN; 

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
