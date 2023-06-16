import DOMPurify from "isomorphic-dompurify";
import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	// Authenticate user (parse Authorization: Bearer TOKEN) header
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	if (user?.role !== Role.ADMIN) {
		throw createError({
			statusCode: 401,
		});
	}

	const slug = event.context.params?.slug ?? "";

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const post = await AppDataSource.getRepository(Post).findOneBy({
		slug,
	});

	if (!post) return false;

	const body = (await readBody(event)) as Partial<Post>;

	if (body.content) post.content = DOMPurify.sanitize(body.content);
	if (body.description)
		post.description = DOMPurify.sanitize(body.description);
	if (body.title) post.title = DOMPurify.sanitize(body.title);
	if (body.banner) post.banner = DOMPurify.sanitize(body.banner);
	if (body.slug) post.slug = DOMPurify.sanitize(body.slug);
	if (body.visibility)
		post.visibility = DOMPurify.sanitize(body.visibility) as Visibility;

	await AppDataSource.getRepository(Post).save(post);
	return post;

	if (post) {
		return post;
	} else {
		throw createError({
			statusCode: 404,
		});
	}
});
