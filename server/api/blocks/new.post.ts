import DOMPurify from "isomorphic-dompurify";
import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { getUserByToken } from "~/utils/tokens";
import { Block } from "~/db/entities/Block";
import { TemplateMetadata } from "~/types/types";

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
	const body = (await readBody(event)) as Partial<Block>;

	if (!body.index)
		throw createError({
			statusCode: 400,
			statusMessage: "Missing field: index",
		});

	// Initialize the AppDataSource and retrieve the block with the specified ID.
	const block = await AppDataSource.initialize()
		.then(async AppDataSource => {
			const block = new Block();

			// Sanitize and update the slots of the block.
			/* if (body.slots)
				block.slots = body.slots.map(s => ({
					name: DOMPurify.sanitize(s.name),
					value: s.value ? DOMPurify.sanitize(s.value) : undefined,
				})); */
			if (body.component)
				block.component = DOMPurify.sanitize(body.component);
			if (body.category)
				block.category = DOMPurify.sanitize(body.category);
			block.index = Number(body.index);

			const meta = (
				await import(
					`../../templates/${block.category}/${block.component}.js`
				)
			).meta as TemplateMetadata;

			block.slots = meta.inputs.map(i => ({
				name: i.name,
			}));

			// Save the updated block.
			const newBlock = await AppDataSource.getRepository(Block).save(
				block
			);

			return newBlock;
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
			statusCode: 500,
		});
	}
});
