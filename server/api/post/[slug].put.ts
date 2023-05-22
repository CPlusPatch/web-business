import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { Post } from "~~/db/entities/Post";
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

	const slug = event.context.params?.slug ?? "";

	const post = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const post = await AppDataSource.getRepository(Post).findOneBy({
				slug,
			});

			if (!post) return false;

			const body = (await readBody(event)) as Partial<Post>;

			if (body.content) post.content = body.content;
			if (body.description) post.description = body.description;
			if (body.title) post.title = body.title;
			if (body.banner) post.banner = body.banner;
			if (body.slug) post.slug = body.slug;
			if (body.visibility) post.visibility = body.visibility;

			await AppDataSource.getRepository(Post).save(post);
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
		});
	}
});
