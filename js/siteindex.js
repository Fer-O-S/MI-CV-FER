let currentTheme = "light";

function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById("themeIcon");

  if (currentTheme === "light") {
    body.setAttribute("data-theme", "dark");
    themeIcon.className = "gg-moon";
    currentTheme = "dark";
  } else {
    body.removeAttribute("data-theme");
    themeIcon.className = "gg-sun";
    currentTheme = "light";
  }
}

function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Close mobile menu if open
    document.getElementById("navMenu").classList.remove("active");

    // Update active nav link
    document
      .querySelectorAll(".nav-link")
      .forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", function (e) {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all loading elements
document.querySelectorAll(".loading").forEach((el) => {
  observer.observe(el);
});

// Skills progress bar animation
const skillProgressBars = document.querySelectorAll(".skill-progress");
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const width = progressBar.style.width;
      progressBar.style.width = "0%";
      setTimeout(() => {
        progressBar.style.width = width;
      }, 200);
    }
  });
}, observerOptions);

skillProgressBars.forEach((bar) => {
  skillObserver.observe(bar);
});

// Initialize animations on load
window.addEventListener("load", function () {
  document.querySelectorAll(".loading").forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 100);
  });
});
