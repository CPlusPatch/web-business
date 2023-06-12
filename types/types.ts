export enum InputType {
	String = "string",
	Paragraph = "paragraph",
	Image = "image",
}
export interface TemplateMetadata {
	name: string;
	category: string;
	description: string;
	displayName: string;
	inputs: {
		name: string;
		type: InputType;
	}[];
}
