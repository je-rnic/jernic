// Set the theme before the page paints to prevent a flash of the wrong theme.
(function () {
  var theme;

  try {
    theme = localStorage.getItem("jernic-theme");
  } catch {
    theme = null;
  }

  if (theme !== "light" && theme !== "dark") {
    theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.documentElement.dataset.theme = theme;
})();
