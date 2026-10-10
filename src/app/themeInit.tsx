/**
 * Runs before first paint: pin the saved (or OS) theme on <html> so there's
 * no flash of the wrong colours. Same storage key as ThemeToggle.tsx.
 */
export const themeInit = `(function(){var t;try{t=localStorage.getItem("jernic-theme")}catch(e){}if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t})();`;
