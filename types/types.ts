export enum InputType {
	String = "string",
	Paragraph = "paragraph",
}
export interface TemplateMetadata {
	name: string;
	category: "headers" | "navbars";
	inputs: {
		name: string;
		type: InputType;
	}[];
}
