function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function initThemeToggle() {
  const toggles = document.querySelectorAll(".theme-toggle");
  if (!toggles.length) return;

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  });

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    toggles.forEach((btn) => {
      const darkMode = theme === "dark";
      btn.setAttribute("aria-pressed", darkMode);
      btn.textContent = darkMode ? "Light Mode" : "Dark Mode";
      btn.setAttribute("aria-label", darkMode ? "Switch to light mode" : "Switch to dark mode");
    });
  }
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
