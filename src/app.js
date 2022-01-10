 import { applyRouting } from "./routing.js";


// src/app.js

// Dès le chargement des élements du DOM
document.addEventListener("DOMContentLoaded", () => {
    applyRouting(window.location.pathname);
});