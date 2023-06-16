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

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const result = await AppDataSource.getRepository(Block).delete({
		id: Number(id),
	});

	// If the block is deleted, return it. Otherwise, throw an error.
	if ((result.affected ?? 0) > 0) {
		return true;
	} else {
		throw createError({
			statusCode: 404,
			statusMessage: "Block not found",
		});
	}
});
