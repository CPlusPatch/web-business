// https://nuxt.com/docs/api/configuration/nuxt-config
import { nodePolyfills } from "vite-plugin-node-polyfills";
import "reflect-metadata";

export default defineNuxtConfig({
	modules: [
		"@nuxtjs/robots",
		"@nuxt/image-edge",
		"@formkit/nuxt",
		"@unocss/nuxt",
		"nuxt-headlessui",
		"nuxt-icon",
		"@vueuse/nuxt",
	],
	extends: ["nuxt-seo-kit"],
	components: ["~/templates", "~/components"],
	hooks: {
		"nitro:build:before": nitro => {
			nitro.options.moduleSideEffects.push("reflect-metadata");
		},
	},
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
		esbuild: {
			options: {
				tsconfigRaw: {
					compilerOptions: {
						experimentalDecorators: true,
					},
				},
			},
		},
		prerender: {
			ignore: ["/devices", "/projects", "/blog", "/"],
		},
	},
	image: {
		ipx: {
			maxAge: 60 * 60 * 24 * 365,
		},
	},
	runtimeConfig: {
		public: {
			siteUrl:
				process.env.NUXT_PUBLIC_SITE_URL || "https://cpluspatch.com",
			siteName: "",
			siteDescription: "My blog, about me and how you can contact me!",
			language: "en-US", // prefer more explicit language codes like `en-AU` over `en`,
			titleSeparator: "·",
			oidcAuthority: process.env.OIDC_AUTHORITY ?? "",
			oidcClientId: process.env.OIDC_CLIENT_ID ?? "",
			oidcScope: process.env.OIDC_SCOPE ?? "",
			oidcResponseType: process.env.OIDC_RESPONSE_TYPE ?? "",
		},
	},
	vite: {
		plugins: [
			nodePolyfills({
				// To exclude specific polyfills, add them to this list.
				exclude: [
					"fs", // Excludes the polyfill for `fs` and `node:fs`.
				],
				// Whether to polyfill `node:` protocol imports.
				protocolImports: true,
			}),
		],
		resolve: {
			extensions: [
				".mjs",
				".js",
				".mts",
				".ts",
				".jsx",
				".tsx",
				".json",
				".vue",
			],
		},
	},
});
