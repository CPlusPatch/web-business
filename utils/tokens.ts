import { JwksClient } from "jwks-rsa";
import jwt from "jsonwebtoken";
import { User } from "oidc-client-ts";
import { AppDataSource } from "~/db/data-source";
import { Token } from "~/db/entities/Token";

export async function getUserByToken(value: string) {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const token = await AppDataSource.getRepository(Token).findOne({
		relations: {
			user: true,
		},
		select: {
			user: {
				avatar: true,
				banner: true,
				created_at: true,
				edited_at: true,
				id: true,
				role: true,
				username: true,
				display_name: true,
				oauthAccounts: true,
			},
		},
		where: {
			token: value,
		},
	});

	if (token?.user) return token.user;
	else return null;
}


export async function validateToken(body: User) {
	if (!AppDataSource.isInitialized) {
		await AppDataSource.initialize();
	}

	const { jwks_uri } = await (
		await fetch(useRuntimeConfig().public.oidcAuthority)
	).json();

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
		throw new Error("Invalid JSON Web Token");
	}

	return decoded.sub
}