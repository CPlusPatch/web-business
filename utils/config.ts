import { parse } from "smol-toml";
import { Config } from "types/config";
import { readFileSync } from "fs";

export const getConfig = () => {
	let config: Config = {
		oidc_providers: [],
	};

	try {
		config = parse(
			readFileSync("./config/config.toml")
				.toString("utf-8")
		) as unknown as Config;
	} catch (err) {
		console.error(err);
	}

	return config;
};
