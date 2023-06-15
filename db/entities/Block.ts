import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity()
export class Block {
	@PrimaryGeneratedColumn()
	id: number;

	@Column("varchar")
	component: string;

	@Column("varchar")
	category: string;

	@Column("integer")
	index: number;

	@Column("simple-json")
	slots: {
		[key: string]: any;
	};

	@Column("integer")
	page_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
