export enum InputType {
	String = "string",
	Paragraph = "paragraph",
	Image = "image",
	Boolean = "boolean",
	Array = "array",
	Link = "link", // Link has text AND url
	Url = "url",
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
	names: {
		[key: string]: string;
	}
}

export enum UISettingType {
	Image = "image",
	Text = "text",
	Toggle = "toggle",
	Navbar = "navbar",
	Footer = "footer",
}

export interface UISetting {
	name: string;
	type: UISettingType;
	value: any;
	title: string;
	text: string;
	icon?: string;
}

export interface FooterUISetting {
	id: string;
	name: string;
	href: string;
	icon: string;
}

export interface NavbarUISetting {
	href: string;
	title: string;
	id: string;
};