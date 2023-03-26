// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/robots", "@nuxt/image-edge"],
	app: {
		head: {
			link: [
				{
					rel: "icon",
					href: "/favicon.png",
					type: "image/png",
				},
			],
			title: "CPlusPatch",
			htmlAttrs: { lang: "en-us" },
		},
	},
	nitro: {
		compressPublicAssets: true,
	},
	image: {
		ipx: {
			maxAge: 60 * 60 * 24 * 365,
		},
	},
});
