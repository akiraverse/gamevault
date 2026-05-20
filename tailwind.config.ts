import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
	'./app/**/*.{js,ts,jsx,tsx}',
	'./pages/**/*.{js,ts,jsx,tsx}',
	'./components/**/*.{js,ts,jsx,tsx}',
	'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			textColor: {
			},
			colors: {
				primary: "#3A0909",
				lightPrimary: "#491010",
				darkPrimary: "#0D0101",
				cred: "#AB0007",
				corange: "#FF6600",
				cyellow: "#FFBE3B",
				cblue: "#2ED6FF",
				cviolet: "#7892FB",
				cpurple: "#884FF6"
			},
			fontFamily: {
				// Map 'font-sans' to your Kufam variable
				sans: ["var(--font-kufam)", "sans-serif"],
				
				// Create a custom utility 'font-pixel' for your game font
				pixel: ["var(--font-press-start)", "cursive"],
			},
		},
	},
  	plugins: [],
}

export default config
