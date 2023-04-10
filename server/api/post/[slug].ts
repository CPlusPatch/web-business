import { AppDataSource } from "~~/db/data-source";
import { Post } from "~~/db/entities/Post";

export default defineEventHandler(async event => {
	const slug = event.context.params?.slug ?? "";

	const post = await AppDataSource.initialize().then(async AppDataSource => {
		const post = await AppDataSource.getRepository(Post).findOneBy({
			slug: slug,
		});

		AppDataSource.destroy();
		return post;
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
