// ========== MAIN.JS ==========
// Global scripts for Abiodun Studio

document.addEventListener("DOMContentLoaded", function () {
  // GSAP Registration
  gsap.registerPlugin(ScrollTrigger);

  // Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Navigation Scroll Effect
  const nav = document.querySelector(".abiodun-nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        gsap.to(nav, {
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 2px 30px rgba(0,0,0,0.02)",
          duration: 0.3,
        });
      } else {
        gsap.to(nav, {
          background: "rgba(255,255,255,0.9)",
          boxShadow: "none",
          duration: 0.3,
        });
      }
    });
  }

  // Active Navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});
