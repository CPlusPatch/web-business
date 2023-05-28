export async function signInWithMastodon() {
	let instanceUrl = new URL("https://placeholder.com");
	try {
		const prompted = prompt("Instance domain:");
		instanceUrl = new URL(
			prompted?.includes("http") ? prompted : `https://${prompted}`
		);
	} catch {
		return alert("Invalid URL!");
	}

	// Create a new Mastodon application
	const app = await createMastodonApp(instanceUrl);

	// Store in localStorage for use later during the auth process
	localStorage.setItem("oauth_provider", "mastodon");
	localStorage.setItem("oauth_mastodon_client", JSON.stringify(app));

	// Redirect the user to the Mastodon authorization URL
	const authorizationUrl = `${instanceUrl}/oauth/authorize?client_id=${app.clientId}&response_type=code&redirect_uri=${app.redirectUri}`;
	window.location.href = authorizationUrl;
}

export async function createMastodonApp(instanceUrl: URL) {
	const appName = "CPlusPatch CMS";
	const redirectUri = `${window.location.origin}/auth/login/`;
	const scopes = "read";
	const website = window.location.origin;

	// Create a new Mastodon application
	const response = await fetch(`${instanceUrl}/api/v1/apps`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			client_name: appName,
			redirect_uris: redirectUri,
			scopes,
			website,
		}),
	});

	const data = await response.json();
	return {
		clientId: data.client_id,
		clientSecret: data.client_secret,
		redirectUri,
		instanceUrl: instanceUrl.origin,
	};
}

export async function getMastodonAccessToken(code: string) {
	const { clientId, clientSecret, redirectUri, instanceUrl } = JSON.parse(
		localStorage.getItem("oauth_mastodon_client") ?? "{}"
	);
	const tokenUrl = `${instanceUrl}/oauth/token`;

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: clientId,
			client_secret: clientSecret,
			code,
			grant_type: "authorization_code",
			redirect_uri: redirectUri,
		}),
	});

	const data = await response.json();
	return data.access_token;
}

export async function getMastodonAccount(accessToken: string) {
	const { instanceUrl } = JSON.parse(
		localStorage.getItem("oauth_mastodon_client") ?? "{}"
	);

	const accountUrl = `${instanceUrl}/api/v1/accounts/verify_credentials`;

	const response = await fetch(accountUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await response.json();
	return data;
}
