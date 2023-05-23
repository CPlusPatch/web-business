import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Token {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User)
	@JoinColumn()
	user: User;

	@Column("varchar")
	token: string;

	@Column("varchar", {
		nullable: true,
	})
	client_name: string;

	@Column("datetime")
	expireDate: Date; // In UTC time, should be 7 days by default
}
