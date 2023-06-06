export enum InputType {
	String = "string",
	Paragraph = "paragraph",
	Image = "image",
}
export interface TemplateMetadata {
	name: string;
	category: "headers" | "navbars";
	inputs: {
		name: string;
		type: InputType;
	}[];
}
