import { AppDataSource } from "~~/db/data-source";
import { Post } from "~~/db/entities/Post";

export default defineEventHandler(async (event) => {
	const slug = event.context.params?.slug ?? "";

	const post = await AppDataSource.initialize().then(async (AppDataSource) => {
		const post = await AppDataSource.getRepository(Post).findOneBy({
			slug: slug,
		});

		console.log(post);

		AppDataSource.destroy();
		return post;
	});

	if (post) {
		return post;
	} else {
		setResponseStatus(404, "Post not found");
		return;
	}
});
