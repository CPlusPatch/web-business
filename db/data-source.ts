import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import "reflect-metadata";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./web.sqlite",
	synchronize: true,
	entities: [Post, Comment],
});
