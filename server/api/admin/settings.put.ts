import { Role, User } from "~/db/entities/User";
import { AppDataSource } from "~~/db/data-source";
import { getUserByToken } from "~/utils/tokens";
import { UISetting } from "~/types/types";
import { Setting } from "~/db/entities/Setting";

export default defineEventHandler(async event => {
	// Authenticate user (parse Authorization: Bearer TOKEN) header
	const user = await getUserByToken(
		event.node.req.headers.authorization?.split(" ")[1] ?? ""
	);

	// Check if the user is not an admin, and throw an error if they are not authorized.
	if (user?.role !== Role.ADMIN) {
		throw createError({
			statusCode: 401,
		});
	}

	const body = await readBody<{
		[key: UISetting["name"]]: UISetting["value"];
	}>(event);

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const settings =
		(await AppDataSource.getRepository(Setting).findOneBy({
			name: "main",
		})) ?? new Setting();

	settings.name = "main";
	settings.value = {
		...settings.value,
		...body,
	};

	console.log(settings);

	if (await AppDataSource.getRepository(Setting).save(settings)) {
		return settings;
	} else {
		throw createError({
			statusCode: 500,
		});
	}
});
