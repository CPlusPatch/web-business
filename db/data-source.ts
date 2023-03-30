import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

export const AppDataSource = new DataSource({
	host: "fediback-db-db-1",
	username: "fediback",
	password: "fediback",
	database: "cms",
	type: "postgres",
	entities: [Post],
});
