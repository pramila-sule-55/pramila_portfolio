/* ===============================
   FIREBASE (MODULE MODE)
=============================== */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0dFxccwsg7TqqxlmckgyS6MWpIHOKAVg",
  authDomain: "portfoliocontactform-3464c.firebaseapp.com",
  databaseURL: "https://portfoliocontactform-3464c-default-rtdb.firebaseio.com",
  projectId: "portfoliocontactform-3464c",
  storageBucket: "portfoliocontactform-3464c.appspot.com",
  messagingSenderId: "338733918049",
  appId: "1:338733918049:web:0b08caa8aec596b2098720"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* ===============================
   DOM READY
=============================== */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== THEME TOGGLE ===== */
  const themeToggle = document.getElementById("theme-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 100);
  });

  /* ===== FADE-IN ON SCROLL ===== */
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeEls.forEach(el => observer.observe(el));

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  /* ===== CONTACT FORM (FIREBASE) ===== */
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      phone: document.getElementById("contact").value.trim(),
      message: document.getElementById("message").value.trim(),
      timestamp: Date.now()
    };

    push(ref(db, "contactMessages"), data)
      .then(() => {
        alert("Message sent successfully!");
        form.reset();
      })
      .catch(err => alert(err.message));
  });

});

/* ===============================
   PROJECT MODAL FUNCTIONS
   (GLOBAL – REQUIRED)
=============================== */
window.openProject = function (id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

window.closeModal = function (id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

/* ===== CLOSE MODAL BY CLICKING BACKGROUND ===== */
document.addEventListener("click", e => {
  if (e.target.classList.contains("project-modal")) {
    e.target.style.display = "none";
    e.target.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
});

/* ===== CLOSE MODAL WITH ESC ===== */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".project-modal").forEach(m => {
      m.style.display = "none";
      m.setAttribute("aria-hidden", "true");
    });
    document.body.style.overflow = "";
  }
});
