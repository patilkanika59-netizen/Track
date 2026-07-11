/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#16213A',        // deep dusk-blue, primary
        dawn: '#FF8A5B',       // coral-amber accent (sunrise)
        sage: '#9FB8A8',       // soft green-grey (steadiness)
        paper: '#F6F3EC',      // warm off-white background
        charcoal: '#22242A',   // body text
        line: '#DCD6C8',       // hairline borders
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sig: '999px',
      }
    },
  },
  plugins: [],
}
