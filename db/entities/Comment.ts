import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

/**
 * Represents a comment made by an authorized user on a page
 * Users are authenticated via OAuth via a Mastodon, Pleroma
 * or Misskey instance. The only information accessed is the
 * profile data.
 */
@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar", {
		length: 100 * 1000,
	})
	content: string;

	@Column("varchar")
	name: string;

	@Column("varchar")
	acct: string;

	@Column("integer", {
		nullable: true,
	})
	post_id: number;

	@Column("integer", {
		nullable: true,
	})
	in_reply_to: number;

	@Column("varchar", {
		nullable: true,
	})
	avatar: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	edited_at?: Date;
}
