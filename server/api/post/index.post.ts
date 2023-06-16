import { AppDataSource } from "~/db/data-source";
import { Post, Visibility } from "~/db/entities/Post";
import { Role } from "~/db/entities/User";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	// Authenticate user (parse Authorization: Bearer TOKEN) header
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	if (user?.role !== Role.ADMIN) {
		throw createError({
			statusCode: 401,
		});
	}

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}
	const post = new Post();

	post.title = "New post";
	post.visibility = Visibility.PRIVATE;
	post.content = "";
	post.description = "";
	post.creator = user;
	post.slug = Math.floor(Math.random() * 10000000).toString();

	return await AppDataSource.getRepository(Post).save(post);
});
