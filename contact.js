// ========== CONTACT.JS ==========
// Contact page scripts

document.addEventListener("DOMContentLoaded", function () {
  // Form submission with Formspree
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector(".btn-primary");
      const originalText = submitBtn.textContent;

      // Animate button
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      });

      submitBtn.textContent = "SENDING...";
      submitBtn.disabled = true;

      // Remove any existing messages
      const existingMessages = contactForm.querySelectorAll(".form-message");
      existingMessages.forEach((msg) => msg.remove());

      // Get form data
      const formData = new FormData(contactForm);

      try {
        // Send to Formspree
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          // Success animation
          gsap.to(contactForm, {
            opacity: 0.5,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          });

          // Show success message
          const successMsg = document.createElement("div");
          successMsg.className = "form-message success-message";
          successMsg.textContent =
            "✨ Thank you! Your message has been sent. I'll respond within 24 hours.";
          successMsg.style.cssText = `
            background: rgba(184, 160, 124, 0.1);
            border: 1px solid var(--color-gold);
            padding: 20px;
            margin-top: 20px;
            text-align: center;
            color: var(--color-gold);
            border-radius: 4px;
            font-size: 14px;
            letter-spacing: 0.5px;
            animation: fadeIn 0.3s ease-out;
          `;

          contactForm.appendChild(successMsg);

          // Clear form
          contactForm.reset();

          // Remove success message after 5 seconds
          setTimeout(() => {
            if (successMsg && successMsg.parentNode) {
              gsap.to(successMsg, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => successMsg.remove(),
              });
            }
          }, 5000);
        } else {
          const data = await response.json();
          throw new Error(data.error || "Form submission failed");
        }
      } catch (error) {
        console.error("Form submission error:", error);

        // Error message
        const errorMsg = document.createElement("div");
        errorMsg.className = "form-message error-message";
        errorMsg.textContent =
          "❌ Something went wrong. Please try again or email me directly.";
        errorMsg.style.cssText = `
          background: rgba(255, 87, 87, 0.1);
          border: 1px solid #ff5757;
          padding: 20px;
          margin-top: 20px;
          text-align: center;
          color: #ff5757;
          border-radius: 4px;
          font-size: 14px;
          letter-spacing: 0.5px;
          animation: fadeIn 0.3s ease-out;
        `;

        contactForm.appendChild(errorMsg);

        // Remove error message after 5 seconds
        setTimeout(() => {
          if (errorMsg && errorMsg.parentNode) {
            gsap.to(errorMsg, {
              opacity: 0,
              duration: 0.3,
              onComplete: () => errorMsg.remove(),
            });
          }
        }, 5000);
      } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Hero animation
  gsap.from(".hero-subtitle", { opacity: 0, y: 30, duration: 1, delay: 0.2 });
  gsap.from(".title-line", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1.2,
    delay: 0.4,
  });

  // Contact section animation
  gsap.from(".contact-info", {
    scrollTrigger: { trigger: ".contact-section", start: "top bottom-=50" },
    opacity: 0,
    x: -50,
    duration: 1,
  });

  gsap.from(".contact-form", {
    scrollTrigger: { trigger: ".contact-section", start: "top bottom-=50" },
    opacity: 0,
    x: 50,
    duration: 1,
  });

  gsap.utils.toArray(".form-group").forEach((group, i) => {
    gsap.from(group, {
      scrollTrigger: { trigger: ".contact-form", start: "top bottom-=20" },
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: i * 0.1,
    });
  });

  // Parallax video
  const contactVideo = document.querySelector("#contactVideo");
  if (contactVideo) {
    window.addEventListener("scroll", () => {
      contactVideo.style.transform = `translateY(${window.scrollY * 0.1}px) scale(1.05)`;
    });
  }

  // Input focus animations
  document
    .querySelectorAll(
      ".form-group input, .form-group select, .form-group textarea",
    )
    .forEach((input) => {
      input.addEventListener("focus", () => {
        gsap.to(input, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      input.addEventListener("blur", () => {
        gsap.to(input, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
});
