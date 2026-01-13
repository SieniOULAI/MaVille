// Tailwind configuration extracted from index.html to avoid inline scripts
window.tailwind = window.tailwind || {};
window.tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#13ec92",
                "primary-dark": "#0bb870",
                "background-light": "#f8fcfa",
                "background-dark": "#10221a",
                "card-light": "#ffffff",
                "card-dark": "#1c3026",
                "text-main": "#0d1b16",
                "text-secondary": "#4c9a79",
            },
            fontFamily: {
                "display": ["Public Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.375rem",
                "md": "0.375rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "2xl": "1rem",
                "full": "9999px"
            },
            boxShadow: {
                'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 0 4px -2px rgba(0, 0, 0, 0.02)',
                'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }
        },
    },
};
