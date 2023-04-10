import { AppDataSource } from "~~/db/data-source";
import { Post } from "~~/db/entities/Post";

export default defineEventHandler(async () => {
	return await AppDataSource.initialize().then(async AppDataSource => {
		const posts = await AppDataSource.manager.find(Post);

		AppDataSource.destroy();
		return posts;
	});
});
