// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: [
		"@nuxtjs/robots",
		"@nuxt/image-edge",
		"@formkit/nuxt",
		"@unocss/nuxt",
		"@nuxtjs/eslint-module",
		"nuxt-delay-hydration",
		"nuxt-headlessui",
	],
	extends: ["nuxt-seo-kit"],
	app: {
		head: {
			link: [
				{
					rel: "icon",
					href: "/favicon.png",
					type: "image/png",
				},
			],
			htmlAttrs: { lang: "en-us" },
		},
	},
	nitro: {
		compressPublicAssets: true,
		routeRules: {
			"/_nuxt/**": {
				headers: {
					"cache-control": `public,max-age=${
						60 * 60 * 24 * 365
					},s-maxage=${60 * 60 * 24 * 365}`,
				},
			},
		},
	},
	image: {
		ipx: {
			maxAge: 60 * 60 * 24 * 365,
		},
	},
	eslint: {
		baseConfig: {
			parser: "vue-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser",
			},
			extends: [
				"@nuxtjs/eslint-config-typescript",
				"plugin:prettier/recommended",
			],
		},
	},
	runtimeConfig: {
		public: {
			siteUrl:
				process.env.NUXT_PUBLIC_SITE_URL || "https://cpluspatch.com",
			siteName: "CPlusPatch",
			siteDescription: "My blog, about me and how you can contact me!",
			language: "en-US", // prefer more explicit language codes like `en-AU` over `en`,
			titleSeparator: "·",
		},
	},
});
