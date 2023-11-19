/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    './src/**/*.html', './node_modules/flowbite/**/*.js',
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  plugins: [ require("flowbite/plugin")],
  theme: {},
};