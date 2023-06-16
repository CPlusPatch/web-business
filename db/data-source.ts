import { DataSource } from "typeorm";
import { Post } from "./entities/Post";
import { Comment } from "./entities/Comment";
import { User } from "./entities/User";
import "reflect-metadata";
import { Token } from "./entities/Token";
import { Block } from "./entities/Block";
import { Page } from "./entities/Page";

const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.POSTGRES_HOST || "localhost",
	port: Number(process.env.POSTGRES_PORT) || 5432,
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	// database: "./web.sqlite",
	database: "cms",
	synchronize: true,
	entities: [Post, Comment, User, Token, Block, Page],
	logging: true,
});

export { AppDataSource };
