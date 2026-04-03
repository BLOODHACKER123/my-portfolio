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

function initContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  const submitBtn = form.querySelector("button[type='submit']");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Sending...";
    if (submitBtn) {
      submitBtn.disabled = true;
    }

    // Simulate async submission. Replace with your backend/API call.
    setTimeout(() => {
      status.textContent = "Thanks! I'll get back to you shortly.";
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
      }
    }, 1200);
  });

  form.addEventListener("input", () => {
    status.textContent = "";
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const reduceMotionQuery = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
  if (reduceMotionQuery && reduceMotionQuery.matches) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -60px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function initBackToTop() {
  const button = document.querySelector("#back-to-top");
  if (!button) return;

  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      button.classList.add("visible");
    } else {
      button.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  button.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initContactForm();
  initScrollReveal();
  initBackToTop();
});


