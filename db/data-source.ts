import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { User } from "./entities/User";
import "reflect-metadata";
import { Token } from "./entities/Token";
import { Block } from "./entities/Block";
import { Page } from "./entities/Page";

export const AppDataSource = new DataSource({
	type: "better-sqlite3",
	database: "./web.sqlite",
	synchronize: true,
	entities: [Post, Comment, User, Token, Block, Page],
});
