module.exports = {
  content: [    "./src/**/*.{js,jsx,ts,tsx}",  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6517',
        dark: '#2b2b2b',

      },
      backgroundImage: {
        'chat-pattern': "url('https://i.pinimg.com/originals/8f/ba/cb/8fbacbd464e996966eb9d4a6b7a9c21e.jpg')",        
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
    screens: {
			dxl: { max: "1279px" },
			// => @media (max-width: 1279px) { ... }

			dlg: { max: "1023px" },
			// => @media (max-width: 1023px) { ... }

			dmd: { max: "767px" },
			// => @media (max-width: 767px) { ... }

			dsm: { max: "639px" },
			// => @media (max-width: 639px) { ... }
		},
  },
  plugins: [],
}
