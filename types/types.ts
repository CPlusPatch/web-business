export enum InputType {
	String = "string",
	Paragraph = "paragraph",
	Image = "image",
	Boolean = "boolean",
	Array = "array",
}
export interface TemplateMetadata {
	name: string;
	category: string;
	description: string;
	displayName: string;
	inputs: {
		[key: string]: InputType | any;
	};
	defaults: {
		[key: string]: any;
	};
}

export enum SettingType {
	Image = "image",
	Text = "text",
}

export interface Setting {
	id: string;
	name: string;
	type: SettingType;
	value: string;
	title: string;
	text: string;
	icon?: string;
}
