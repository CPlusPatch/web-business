import { randomBytes, pbkdf2 } from "crypto";

export function createSalt(length = 128) {
	return randomBytes(length).toString("base64");
}

export function createPasswordHash(
	password: string,
	salt = "",
	iterations = 10000
) {
	return new Promise<string>((resolve, reject) => {
		pbkdf2(password, salt, iterations, 100, "sha256", (err, derivedKey) => {
			if (err) return reject(err);
			return resolve(`${derivedKey.toString("hex")}:${salt}`);
		});
	});
}
