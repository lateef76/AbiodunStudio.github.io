// ========== MAIN.JS ==========
// Global scripts for Abiodun Studio

document.addEventListener("DOMContentLoaded", function () {
  // GSAP Registration
  gsap.registerPlugin(ScrollTrigger);

  // ========== SMOOTH SCROLL WITH LENIS ==========
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

  // ========== NAVIGATION SCROLL EFFECT ==========
  const nav = document.querySelector(".abiodun-nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        gsap.to(nav, {
          background: "rgba(10,10,10,0.95)",
          boxShadow: "0 2px 30px rgba(0,0,0,0.1)",
          duration: 0.3,
        });
      } else {
        gsap.to(nav, {
          background: "transparent",
          boxShadow: "none",
          duration: 0.3,
        });
      }
    });
  }

  // ========== MOBILE MENU TOGGLE - SIMPLIFIED & GUARANTEED ==========
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.getElementById("navLinks");

  console.log("Mobile menu toggle:", mobileMenuToggle); // Debug
  console.log("Nav links:", navLinks); // Debug

  if (mobileMenuToggle && navLinks) {
    console.log("Mobile menu found, adding event listener");

    // Toggle menu on hamburger click
    mobileMenuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log("Hamburger clicked");

      this.classList.toggle("open");
      navLinks.classList.toggle("active");

      // Prevent body scrolling when menu is open
      if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
        console.log("Menu opened");
      } else {
        document.body.style.overflow = "";
        console.log("Menu closed");
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function (e) {
        console.log("Nav link clicked");
        mobileMenuToggle.classList.remove("open");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !mobileMenuToggle.contains(e.target) &&
        !navLinks.contains(e.target) &&
        navLinks.classList.contains("active")
      ) {
        console.log("Clicked outside, closing menu");
        mobileMenuToggle.classList.remove("open");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // Handle window resize
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
        mobileMenuToggle.classList.remove("open");
        navLinks.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  } else {
    console.log("Mobile menu elements not found");
  }

  // ========== IMAGE MODAL FUNCTIONALITY ==========
  const modal = document.getElementById("imageModal");
  if (modal) {
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalClose = document.getElementById("modalClose");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalPrev = document.getElementById("modalPrev");
    const modalNext = document.getElementById("modalNext");

    let currentImages = [];
    let currentIndex = 0;

    // Get all clickable images
    const clickableImages = document.querySelectorAll(".clickable-image");
    console.log("Clickable images found:", clickableImages.length);

    // Open modal function
    function openModal(imgElement) {
      const parent =
        imgElement.closest("[data-src]") || imgElement.parentElement;

      if (parent) {
        const src = parent.dataset.src || imgElement.src;
        const title = parent.dataset.title || "Untitled";
        const category = parent.dataset.category || "Abiodun Studio";

        modalImage.src = src;
        modalTitle.textContent = title;
        modalCategory.textContent = category;

        // Get all images in current section for navigation
        const section = parent.closest("section") || document;
        currentImages = Array.from(section.querySelectorAll("[data-src]"));
        currentIndex = currentImages.indexOf(parent);

        modal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }

    // Add click event to all clickable images
    clickableImages.forEach((img) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        openModal(this);
      });
    });

    // Close modal functions
    function closeModal() {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) modalOverlay.addEventListener("click", closeModal);

    // Navigation
    function navigate(direction) {
      if (currentImages.length === 0) return;

      currentIndex =
        (currentIndex + direction + currentImages.length) %
        currentImages.length;
      const nextItem = currentImages[currentIndex];
      const nextImg = nextItem.querySelector("img");

      if (nextImg) {
        modalImage.style.opacity = "0";
        setTimeout(() => {
          modalImage.src = nextItem.dataset.src || nextImg.src;
          modalTitle.textContent = nextItem.dataset.title || "Untitled";
          modalCategory.textContent =
            nextItem.dataset.category || "Abiodun Studio";
          modalImage.style.opacity = "1";
        }, 200);
      }
    }

    if (modalPrev) modalPrev.addEventListener("click", () => navigate(-1));
    if (modalNext) modalNext.addEventListener("click", () => navigate(1));

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!modal.classList.contains("active")) return;

      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          // Use Lenis for smooth scroll if available
          if (lenis) {
            lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    });
  });

  // ========== NAVIGATION ACTIVE STATE ==========
  const currentLocation =
    window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentLocation) {
      link.classList.add("active");
    }
  });
});
