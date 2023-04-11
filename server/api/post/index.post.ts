import { AppDataSource } from "~/db/data-source";
import { Post, Visibility } from "~/db/entities/Post";

export default defineEventHandler(async event => {
	// Authenticate user (parse Authorization: Bearer TOKEN) header
	if (
		event.node.req.headers.authorization?.split(" ")[1] !==
		process.env.TOKEN
	) {
		return abortNavigation({
			statusCode: 401,
		});
	}

	const post = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const post = new Post();

			post.title = "New post";
			post.visibility = Visibility.PRIVATE;
			post.content = "";
			post.description = "";
			post.slug = Math.floor(Math.random() * 10000000).toString();

			return await AppDataSource.manager.save(post);
		})
		.finally(() => {
			AppDataSource.destroy();
		});
	
	return post;
})