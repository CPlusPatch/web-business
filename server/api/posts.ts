import { Role } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { Post, Visibility } from "~~/db/entities/Post";
import { getUserByToken } from "~/utils/tokens";

export default defineEventHandler(async event => {
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	const isAdmin = user?.role === Role.ADMIN;

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	return isAdmin
		? await AppDataSource.getRepository(Post).find({
				relations: {
					creator: true,
				},
				select: {
					creator: {
						avatar: true,
						banner: true,
						created_at: true,
						edited_at: true,
						id: true,
						role: true,
						username: true,
						display_name: true,
					},
				},
		  })
		: await AppDataSource.getRepository(Post).find({
				relations: {
					creator: true,
				},
				where: {
					visibility: Visibility.PUBLIC,
				},
		  });
});
