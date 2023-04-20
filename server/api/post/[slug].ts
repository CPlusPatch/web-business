import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";

export default defineEventHandler(async event => {
	const slug = event.context.params?.slug ?? "";
	const isAdmin =
		event.node.req.headers.authorization?.split(" ")[1] ===
		process.env.TOKEN;

	const post = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const post = await AppDataSource.getRepository(Post).findOneBy({
				slug,
			});

			if (
				post?.visibility === Visibility.PRIVATE ||
				post?.visibility === Visibility.HIDDEN
			) {
				if (!isAdmin) return false;
			}
			return post;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	console.log(isAdmin);

	if (post) {
		return post;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found",
		});
	}
});
