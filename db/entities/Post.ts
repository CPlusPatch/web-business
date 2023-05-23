import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

export enum Visibility {
	PUBLIC = "public",
	UNLISTED = "unlisted",
	PRIVATE = "private",
	HIDDEN = "hidden",
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

	@Column("varchar", {
		unique: true,
	})
	slug: string;

	@Column("varchar", {
		default: Visibility.PRIVATE,
	})
	visibility: Visibility;

	@Column("varchar", {
		nullable: true,
	})
	banner?: string;

	@ManyToOne(() => User)
	@JoinColumn()
	creator: User;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	edited_at?: Date;
}
