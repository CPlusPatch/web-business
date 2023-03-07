/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				inter: ["'Inter'", "sans-serif"],
				poppins: ["'Poppins'", "sans-serif"],
			},
		},
	},
	plugins: [],
};
