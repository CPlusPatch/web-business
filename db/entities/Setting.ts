import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

import { UISetting } from "~/types/types";

@Entity({
	name: "settings",
})
export class Setting {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	name: string;

	@Column("simple-json")
	value: {
		[key: UISetting["name"]]: UISetting["value"];
	};

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
