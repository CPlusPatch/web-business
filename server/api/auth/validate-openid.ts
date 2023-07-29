import { AppDataSource } from "~/db/data-source";
import { User as OidcUser } from "oidc-client-ts";
import jwt from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";

export default defineEventHandler(async event => {
	const body = await readBody<OidcUser>(event);

	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const jwks_uri = (
		await (await fetch(useRuntimeConfig().public.OIDC_AUTHORITY)).json()
	)["jwks_uri"];

	const client = new JwksClient({
		jwksUri: jwks_uri,
	});

	const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
		client.getSigningKey(header.kid, function (err, key) {
			const signingKey = key?.getPublicKey();
			callback(null, signingKey);
		});
	};

	let decoded: jwt.JwtPayload;

	// Verify the ID token
	try {
		decoded = await new Promise((res, reject) => {
			jwt.verify(
				body.id_token ?? "",
				getKey,
				{ algorithms: ["RS256"] },
				function (err, decoded) {
					if (err) {
						reject(err);
						// Handle error
					} else {
						res(decoded as any);
						// ID token is valid, create session for user
					}
				}
			);
		});
	} catch {
		throw createError({
			statusCode: 401,
			statusMessage: "Invalid JSON Web Token",
		});
	}

	// TODO: Add pluggable system with configurable provider names
	if (
		decoded.iss == "https://id.cpluspatch.com/application/o/cpluspatch-cms/"
	) {
		return decoded.sub;
	} else {
		throw createError({
			statusCode: 401,
			statusMessage:
				"Invalid OpenID authority, only CPlusPatch ID is supported for the moment",
		});
	}
});
