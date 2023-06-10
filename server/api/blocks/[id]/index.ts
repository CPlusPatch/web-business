import { AppDataSource } from "~~/db/data-source";
import { Block } from "~/db/entities/Block";

export default defineEventHandler(async () => {
	const blocks = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const blocks = (
				await AppDataSource.getRepository(Block).find()
			).sort((a, b) => a.index - b.index);

			return blocks;
		})
		.finally(() => {
			AppDataSource.destroy();
		});

	if (blocks) {
		return blocks;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Page not found",
		});
	}
});
