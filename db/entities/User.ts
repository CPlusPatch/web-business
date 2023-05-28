import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export enum Role {
	ADMIN = "admin",
	GUEST = "guest",
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	username: string;

	@Column("varchar")
	display_name: string;

	@Column("varchar")
	password: string; // In the format hashedpassword:salt

	@Column("varchar", {
		default: Role.GUEST,
	})
	role: Role;

	@Column("varchar", {
		nullable: true,
	})
	avatar?: string;

	@Column("varchar", {
		nullable: true,
	})
	banner?: string;

	@CreateDateColumn()
	created_at?: Date;

	@UpdateDateColumn()
	edited_at?: Date;

	@Column("simple-json", { nullable: true })
	oauthAccounts?: { provider: string; id: string }[];
}
