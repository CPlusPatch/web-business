export interface Config {
	oidc_providers: {
		id: string;
		authority: string;
		icon: string;
		client_id: string;
		scopes: string[];
		name: string;
	}[];

	s3: {
		endpoint: string;
		access_key: string;
		secret_access_key: string;
		bucket_name: string;
		public_url: string;
	}
}