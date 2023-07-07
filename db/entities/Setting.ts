import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

import { Setting as TypeSetting } from "~/types/types";

@Entity({
	name: "settings",
})
export class Setting {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	category: string;

	@Column("varchar")
	name: string;

	@Column("simple-json")
	value: {
		[key: string]: TypeSetting[];
	};

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
