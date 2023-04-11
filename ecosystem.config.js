require("dotenv").config();

module.exports = {
	apps: [
		{
			name: "CPlusPatch Web",
			port: "2792",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",
			env: {
				TOKEN: process.env.TOKEN,
				S3_ENDPOINT: process.env.S3_ENDPOINT,
				S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
				S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
				S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
				CDN_URL: process.env.CDN_URL,
			},
		},
	],
};
