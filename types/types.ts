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

export enum UISettingType {
	Image = "image",
	Text = "text",
	Toggle = "toggle",
	Navbar = "navbar",
}

export interface UISetting {
	name: string;
	type: UISettingType;
	value: any;
	title: string;
	text: string;
	icon?: string;
}

export interface NavbarUISetting {
	href: string;
	title: string;
	id: string;
};