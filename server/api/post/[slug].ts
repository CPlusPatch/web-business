import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const slug = event.context.params?.slug ?? "";
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	const isAdmin = user?.role === Role.ADMIN;

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

	if (post) {
		return post;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found",
		});
	}
});
