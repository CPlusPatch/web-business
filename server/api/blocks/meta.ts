import { readFileSync, readdirSync } from "fs";
import path from "path";
import { Role } from "~/db/entities/User";
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

	const allData = [];

	const directories = readdirSync(
		path.resolve(path.dirname(""), `./templates/`)
	);

	for (const directory of directories) {
		const directoryPath = path.join(
			path.resolve(path.dirname(""), `./templates/`),
			directory
		);

		for (const file of readdirSync(directoryPath)) {
			const filePath = path.join(
				path.resolve(path.dirname(""), `./templates/`, directory),
				file
			);

			if (path.extname(file) === ".json") {
				const fileContent = readFileSync(filePath, "utf-8");
				const jsonData = JSON.parse(fileContent);

				// Process the JSON data
				allData.push(jsonData);
			}
		}
	}

	return allData;
});
