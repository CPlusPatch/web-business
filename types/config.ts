export interface Config {
	oidc_providers: {
		id: string;
		authority: string;
		icon: string;
		client_id: string;
		scopes: string[];
		name: string;
	}[]
}