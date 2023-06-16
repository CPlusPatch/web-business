import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { getUserByToken } from "~/utils/tokens";
import { Page } from "~/db/entities/Page";

/**
 * Define the event handler.
 *
 * @param {H3Event} event - The event object.
 * @returns {Promise<Block>} - A Promise that resolves to the block object.
 * @throws {NuxtError} - Throws an error if the user is not authorized or if the block is not found.
 */
export default defineEventHandler(async event => {
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
	const body = (await readBody(event)) as Partial<Page>;

	if (!body.path)
		throw createError({
			statusCode: 400,
			statusMessage: "Missing field: path",
		});

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	// Initialize the AppDataSource and save the page with the asked path
	const page = new Page();
	page.path = body.path ?? "";

	// Save the updated block.
	const newPage = await AppDataSource.getRepository(Page).save(page);

	// If the block is found, return it. Otherwise, throw an error.
	if (newPage) {
		return newPage;
	} else {
		throw createError({
			statusCode: 500,
		});
	}
});
