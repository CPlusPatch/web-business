/**
 * Sign in with Mastodon
 * @returns {Promise<void>}
 */
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

/**
 * Create a Mastodon app
 * @param {URL} instanceUrl - The instance URL
 * @returns {Promise<{clientId: string, clientSecret: string, redirectUri: string, instanceUrl: string}>}
 */
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

/**
 * Get Mastodon access token
 * @param {string} code - The authorization code
 * @param {{clientSecret: string, instanceUrl: string, redirectUri: string, clientId: string}} oauthData - OAuth data
 * @returns {Promise<string>} - Access token
 */
export async function getMastodonAccessToken(
	code: string,
	oauthData: {
		clientSecret: string;
		instanceUrl: string;
		redirectUri: string;
		clientId: string;
	}
) {
	const tokenUrl = `${oauthData.instanceUrl}/oauth/token`;

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			client_id: oauthData.clientId,
			client_secret: oauthData.clientSecret,
			code,
			grant_type: "authorization_code",
			redirect_uri: oauthData.redirectUri,
		}),
	});

	const data = await response.json();
	return data.access_token;
}

/**
 * Get Mastodon account
 * @param {string} accessToken - The access token
 * @param {{clientSecret: string, instanceUrl: string, redirectUri: string, clientId: string}} oauthData - OAuth data
 * @returns {Promise<Object>} - Account data
 */
export async function getMastodonAccount(
	accessToken: string,
	oauthData: {
		clientSecret: string;
		instanceUrl: string;
		redirectUri: string;
		clientId: string;
	}
) {
	const accountUrl = `${oauthData.instanceUrl}/api/v1/accounts/verify_credentials`;

	const response = await fetch(accountUrl, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await response.json();
	return data;
}

/**
 * Sign in with Misskey
 * @returns {Promise<void>}
 */
export async function signInWithMisskey() {
	let instanceUrl = new URL("https://placeholder.com");
	try {
		const prompted = prompt("Instance domain:");
		instanceUrl = new URL(
			prompted?.includes("http") ? prompted : `https://${prompted}`
		);
	} catch {
		return alert("Invalid URL!");
	}

	// Create a new Misskey application
	const app = await createMisskeyApp(instanceUrl);

	// Store in localStorage for use later during the auth process
	localStorage.setItem("oauth_provider", "misskey");
	localStorage.setItem("oauth_misskey_client", JSON.stringify(app));

	const response = await fetch(`${instanceUrl}api/auth/session/generate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			appSecret: app.clientSecret,
		}),
	});

	// Redirect the user to the Misskey authorization URL
	window.location.href = (await response.json()).url;
}

/**
 * Create a Misskey app
 * @param {URL} instanceUrl - The instance URL
 * @returns {Promise<{clientId: string, clientSecret: string, redirectUri: string, instanceUrl: string}>}
 */
export async function createMisskeyApp(instanceUrl: URL) {
	const appName = "CPlusPatch CMS";
	const appDescription = "CPlusPatch CMS";
	const redirectUri = `${window.location.origin}/auth/login/`;
	const permission = ["read:account"];

	// Create a new Misskey application
	const response = await fetch(`${instanceUrl}api/app/create`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			name: appName,
			description: appDescription,
			callbackUrl: redirectUri,
			permission,
		}),
	});

	const data = await response.json();
	return {
		clientId: data.id,
		clientSecret: data.secret,
		redirectUri,
		instanceUrl: instanceUrl.origin,
	};
}

/**
 * Get Misskey access token
 * @param {string} code - The authorization code
 * @param {{clientSecret: string, instanceUrl: string, redirectUri: string, clientId: string}} oauthData - OAuth data
 * @returns {Promise<string>} - Access token
 */
export async function getMisskeyAccessToken(
	code: string,
	oauthData: {
		clientSecret: string;
		instanceUrl: string;
		redirectUri: string;
		clientId: string;
	}
) {
	const tokenUrl = `${oauthData.instanceUrl}/api/auth/session/userkey`;

	const response = await fetch(tokenUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			appSecret: oauthData.clientSecret,
			token: code,
		}),
	});

	const data = await response.json();
	return data.accessToken;
}

/**
 * Get Misskey account
 * @param {string} accessToken - The access token
 * @param {{clientSecret: string, instanceUrl: string, redirectUri: string, clientId: string}} oauthData - OAuth data
 * @returns {Promise<{id: string, username: string}>} - Account data
 */
export async function getMisskeyAccount(
	accessToken: string,
	oauthData: {
		clientSecret: string;
		instanceUrl: string;
		redirectUri: string;
		clientId: string;
	}
) {
	const accountUrl = `${oauthData.instanceUrl}/api/i`;

	const response = await fetch(accountUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await response.json();
	return { id: data.id, username: data.username };
}
