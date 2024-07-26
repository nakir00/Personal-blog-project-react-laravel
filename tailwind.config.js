/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#6D72B4", // Couleur principale
                primaryDark: "#4a5a8a", // Couleur sombre pour le survol
                primaryHover: "#7d8bb6", // Couleur pour le survol des boutons
            },
        },
    },
    plugins: [],
};
