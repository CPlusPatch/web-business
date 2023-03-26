module.exports = {
	apps: [
		{
			name: "CPlusPatch Web",
			port: "2792",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",
		},
	],
};
