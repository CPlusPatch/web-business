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

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const post = await AppDataSource.getRepository(Post).findOne({
		relations: {
			creator: true,
		},
		select: {
			creator: {
				avatar: true,
				banner: true,
				created_at: true,
				edited_at: true,
				id: true,
				role: true,
				username: true,
				display_name: true,
			},
		},
		where: {
			slug,
		},
	});

	if (
		post?.visibility === Visibility.PRIVATE ||
		post?.visibility === Visibility.HIDDEN
	) {
		if (!isAdmin) return false;
	}

	if (post) {
		return {
			...post,
			creator: {
				...post?.creator,
				password: undefined, // Don't leak password hashes to client, even if they're secure
			},
		};
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Post not found",
		});
	}
});
