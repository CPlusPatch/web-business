import { DataSource } from "typeorm";
import { Post } from "./entities/Post";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./web.sqlite",
	synchronize: true,
	entities: [Post],
});
