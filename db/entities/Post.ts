import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Visibility {
	PUBLIC = "public",
	UNLISTED = "unlisted",
	PRIVATE = "private",
	HIDDEN = "hidden"
}

@Entity()
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", {
		length: 100 * 1000,
	})
	content: string;

	@Column("varchar")
	title: string;

	@Column("varchar", {
		length: 500,
	})
	description: string;

	@Column("varchar")
	slug: string;

	@Column({
		type: "enum",
		enum: Visibility,
		default: Visibility.HIDDEN,
	})
	visibility: Visibility;

	@Column("varchar", {
		nullable: true,
	})
	banner?: string;
}