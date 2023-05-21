import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";
import { Comment } from "~/db/entities/Comment";

export default defineEventHandler(async event => {
	const slug = event.context.params?.slug ?? "";
	const isAdmin =
		event.node.req.headers.authorization?.split(" ")[1] ===
		process.env.TOKEN;

	const comments = await AppDataSource.initialize()
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

			if (!post) return false;

			const comments = await AppDataSource.getRepository(Comment).findBy({
				post_id: post.id,
			});
			return comments;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (comments) {
		return comments;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found",
		});
	}
});
