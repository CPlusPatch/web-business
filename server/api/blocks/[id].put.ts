import DOMPurify from "isomorphic-dompurify";
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

	// Initialize the AppDataSource and retrieve the block with the specified ID.
	const block = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const block = await AppDataSource.getRepository(Block).findOneBy({
				id: Number(id),
			});

			// If the block is not found, return false.
			if (!block) return false;

			// Read the body of the event and cast it to a Partial<Block> object.
			const body = (await readBody(event)) as Partial<Block>;

			// Sanitize and update the slots of the block.
			if (body.slots)
				block.slots = body.slots.map(s => ({
					name: DOMPurify.sanitize(s.name),
					value: DOMPurify.sanitize(s.value),
				}));

			// Save the updated block.
			await AppDataSource.getRepository(Block).save(block);

			return block;
		})
		.finally(() => {
			// Destroy the AppDataSource connection.
			AppDataSource.destroy();
		});

	// If the block is found, return it. Otherwise, throw an error.
	if (block) {
		return block;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Block not found",
		});
	}
});
