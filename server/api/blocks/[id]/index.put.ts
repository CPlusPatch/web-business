// import DOMPurify from "isomorphic-dompurify";
import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { getUserByToken } from "~/utils/tokens";
import { Block } from "~/db/entities/Block";

/**
 * Define the event handler.
 *
 * @param {H3Event} event - The event object.
 * @returns {Promise<Block>} - A Promise that resolves to the block object.
 * @throws {NuxtError} - Throws an error if the user is not authorized or if the block is not found.
 */
export default defineEventHandler(async event => {
	// Get the ID from the event context or assign an empty string as the default value.
	const id = event.context.params?.id ?? "";

	// Get the user by token.
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	// Check if the user is not an admin, and throw an error if they are not authorized.
	if (user?.role !== Role.ADMIN) {
		throw createError({
			statusCode: 401,
		});
	}

	// Read the body of the event and cast it to a Partial<Block> object.
	const body = (await readBody(event)) as Block[];

	// Initialize the AppDataSource and retrieve the block with the specified ID.

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const blocks = await Promise.all(
		body.map(async bodyBlock => {
			await AppDataSource.getRepository(Block)
				.createQueryBuilder("block")
				.update()
				.set(bodyBlock)
				.where("id = :id", { id: bodyBlock.id })
				.andWhere("page_id = :page_id", { page_id: Number(id) })
				.execute();

			return bodyBlock;
		})
	);

	AppDataSource.destroy();

	if (blocks) {
		return blocks;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Block not found",
		});
	}
});
