// ========== ARCHIVE.JS ==========
// Archive page scripts

document.addEventListener("DOMContentLoaded", function () {
  // Modal functionality (same as index.js)
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalClose = document.getElementById("modalClose");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let currentImages = [];
  let currentIndex = 0;

  function openModal(src, title, category, allImages, index) {
    modalImage.src = src;
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    currentImages = allImages;
    currentIndex = index;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  }

  function closeModal() {
    gsap.to(modal, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      },
    });
  }

  function prevImage() {
    if (currentImages.length) {
      currentIndex =
        (currentIndex - 1 + currentImages.length) % currentImages.length;
      updateModalImage(currentImages[currentIndex]);
    }
  }

  function nextImage() {
    if (currentImages.length) {
      currentIndex = (currentIndex + 1) % currentImages.length;
      updateModalImage(currentImages[currentIndex]);
    }
  }

  function updateModalImage(imgData) {
    gsap.to(modalImage, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        modalImage.src = imgData.src;
        modalTitle.textContent = imgData.title;
        modalCategory.textContent = imgData.category;
        gsap.to(modalImage, { opacity: 1, duration: 0.3 });
      },
    });
  }

  document.querySelectorAll(".clickable-image").forEach((img) => {
    const parent =
      img.closest("[data-src]") || img.parentElement.closest("[data-src]");
    if (parent && parent.dataset.src) {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        const section = parent.closest("section");
        const sectionImages = section
          ? Array.from(section.querySelectorAll("[data-src]")).map((el) => ({
              src: el.dataset.src,
              title: el.dataset.title || "Untitled",
              category: el.dataset.category || "",
            }))
          : [];

        openModal(
          parent.dataset.src,
          parent.dataset.title || "Untitled",
          parent.dataset.category || "",
          sectionImages.length
            ? sectionImages
            : [
                {
                  src: parent.dataset.src,
                  title: parent.dataset.title || "Untitled",
                  category: parent.dataset.category || "",
                },
              ],
          0,
        );
      });
    }
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  if (modalPrev)
    modalPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      prevImage();
    });
  if (modalNext)
    modalNext.addEventListener("click", (e) => {
      e.stopPropagation();
      nextImage();
    });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "ArrowRight") nextImage();
  });

  // Hero animation
  gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.2 });
  gsap.from(".title-line", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    delay: 0.4,
  });

  // Archive items animation
  gsap.utils.toArray(".archive-item").forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: "top bottom-=30" },
      opacity: 0,
      y: 30,
      duration: 0.6,
      delay: i * 0.05,
    });
  });

  // Parallax video
  const archiveVideo = document.querySelector("#archiveVideo");
  if (archiveVideo) {
    window.addEventListener("scroll", () => {
      archiveVideo.style.transform = `translateY(${window.scrollY * 0.1}px) scale(1.05)`;
    });
  }
});
