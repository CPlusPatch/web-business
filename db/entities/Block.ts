import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

/**
 * Represents a Block entity. Blocks are page elements
 * that can be modified using slots to customize the page
 */
@Entity()
export class Block {
	/**
	 * The unique identifier for the block.
	 * @type {number}
	 */
	@PrimaryGeneratedColumn()
	id: number;

	/**
	 * The component of the block.
	 * @type {string}
	 */
	@Column("varchar")
	component: string;

	/**
	 * The category of the block.
	 * @type {string}
	 */
	@Column("varchar")
	category: string;

	/**
	 * The index of the block.
	 * @type {number}
	 */
	@Column("integer")
	index: number;

	/**
	 * The slots of the block.
	 * @type {{ [key: string]: any }}
	 */
	@Column("simple-json")
	slots: {
		[key: string]: any;
	};

	/**
	 * The page ID associated with the block.
	 * @type {number}
	 */
	@Column("integer")
	page_id: number;

	/**
	 * The date and time the block was created.
	 * @type {Date}
	 */
	@CreateDateColumn()
	created_at: Date;

	/**
	 * The date and time the block was last updated.
	 * @type {Date}
	 */
	@UpdateDateColumn()
	updated_at: Date;
}
