/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["'Inter'", "sans-serif"],
				poppins: ["'Poppins'", "sans-serif"],
			},
			animation: {
				"spin-once": "spin 1s ease-in-out 1",
				hithere: "hithere 1s ease infinite",
			},
			keyframes: {
				hithere: {
					"30%": {
						transform: "scale(1.2)",
					},
					"40%, 60%": {
						transform: "rotate(-20deg) scale(1.2)",
					},
					"50%": {
						transform: "rotate(20deg) scale(1.2)",
					},
					"70%": {
						transform: "rotate(0deg) scale(1.2)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
			colors: {
				dark: {
					DEFAULT: "#181A1B",
					50: "#AEB4B7",
					100: "#A3AAAD",
					200: "#8E969A",
					300: "#788287",
					400: "#656D71",
					500: "#52585C",
					600: "#3E4446",
					700: "#2B2F31",
					800: "#181A1B",
					900: "#000000",
				},
			},
		},
		nightwind: {
			typography: true,
		},
	},
	plugins: [
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/typography"),
	],
};
