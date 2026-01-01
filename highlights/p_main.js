// ==========================================
// MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const body = document.body;

  mobileToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    mobileToggle.setAttribute(
      "aria-expanded",
      navMenu.classList.contains("active")
    );

    body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "auto";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      body.style.overflow = "auto";
    });
  });

  // ==========================================
  // 2. SCROLL ANIMATIONS (INTERSECTION OBSERVER)
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));

  // ==========================================
  // 3. STICKY HEADER SHADOW ON SCROLL
  // ==========================================
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 50
      ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      : "0 1px 3px rgba(0,0,0,0.05)";
  });

  // ==========================================
  // 4. FORM SUBMISSION HANDLING (AJAX)
  // ==========================================
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("sendMessageButton");
  const successMsg = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
      form.reset();
      successMsg.style.display = "block";
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);
    }, 1500);
  });

  // ==========================================
  // 5. SMOOTH SCROLL FOR ANCHOR LINKS
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // ==========================================
  // 6. IMAGE LAZY LOADING (Fallback Safe)
  // ==========================================
  function initLazyLoading() {
    const images = document.querySelectorAll("img");
    images.forEach(img => img.setAttribute("loading", "lazy"));
  }
  initLazyLoading(); // Run after DOM loaded
});
