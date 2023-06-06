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
	// const id = event.context.params?.id ?? "";

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

	/* if (body.index === undefined)
		throw createError({
			statusCode: 400,
			statusMessage: "Missing field: index",
		}); */

	// Initialize the AppDataSource and retrieve the block with the specified ID.

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	/* // If no blocks are found, return false.
	if (!blocks || blocks.length === 0) return false;

	// Iterate over each block and sanitize/update the slots and index.
	blocks = await Promise.all(
		blocks.map(async block => {
			const bodyElement = body.find(b => Number(b.id) === block.id);

			if (!bodyElement) return block;

			if (bodyElement.slots) {
				block.slots = bodyElement.slots.map(s => ({
					name: DOMPurify.sanitize(s.name),
					value: s.value ? DOMPurify.sanitize(s.value) : undefined,
				}));
			}
			if (bodyElement.index) block.index = Number(bodyElement.index);

			// Update the block in the query builder.
			return await AppDataSource.getRepository(Block).save(block);
		})
	); */

	const blocks = await Promise.all(
		body.map(async bodyBlock => {
			await AppDataSource.getRepository(Block)
				.createQueryBuilder("block")
				.update()
				.set(bodyBlock)
				.where("id = :id", { id: bodyBlock.id })
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
