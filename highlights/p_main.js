// ----------------------------------------------------
// Main JavaScript for DavieFolio Project Page
// ----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {

  // =========================================
  // 1. UNIFY BACKGROUND COLORS
  // =========================================
  // This ensures all sections share the same professional dark gradient,
  // removing the white/grey variations from specific project themes.

  const sectionsToUnify = document.querySelectorAll('.project-hero-section, .project-detail-section, .daviefolio-contact');
  const bodyStyle = window.getComputedStyle(document.body);

  sectionsToUnify.forEach(section => {
    // Apply the same gradient as the body for consistency
    section.style.background = 'transparent';
    // Optional: Add a subtle glassmorphism effect to project containers
    section.style.position = 'relative';
    section.style.zIndex = '1';
  });


  // =========================================
  // 2. MOBILE MENU TOGGLE
  // =========================================

  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('is-active');
      navMenu.classList.toggle('active');

      // Prevent scrolling when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('is-active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // =========================================
  // 3. SCROLL REVEAL ANIMATION
  // =========================================
  // Adds a 'visible' class to elements when they scroll into view

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animatedElements = document.querySelectorAll(
    '.hero-content, .project-card, .insights-card, .contact-form-card, .section-header, .hero-img'
  );

  animatedElements.forEach(el => observer.observe(el));


  // =========================================
  // 4. SMART NAVBAR SCROLL EFFECT
  // =========================================
  // Changes navbar transparency/color based on scroll position

  const navbar = document.querySelector('.navbar-header');
  const brandLogoImg = document.querySelector('.brand-logo img');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
      // Optional: Shrink logo slightly on scroll
      if (brandLogoImg) brandLogoImg.style.height = '40px';
    } else {
      navbar.classList.remove('navbar-scrolled');
      if (brandLogoImg) brandLogoImg.style.height = '45px';
    }
  });


  // =========================================
  // 5. ACTIVE LINK HIGHLIGHTER
  // =========================================
  // Highlights the navbar link corresponding to the current section

  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      // 150px offset to account for navbar height and buffer
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });


  // =========================================
  // 6. SMOOTH SCROLL FOR ANCHOR LINKS
  // =========================================
  // Handles the offset for the fixed header

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const headerOffset = 80; // Matches CSS variable --navbar-height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });


  // =========================================
  // 7. CONTACT FORM INTERACTION
  // =========================================
  // Simulates form submission with UI feedback

  const contactForm = document.querySelector('.contact-form-card');
  const submitBtn = document.querySelector('.btn-submit-data');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.innerText;

      // Loading state
      submitBtn.innerText = 'Sending...';
      submitBtn.style.opacity = '0.7';
      submitBtn.disabled = true;

      // Simulate server delay
      setTimeout(() => {
        submitBtn.innerText = 'Message Sent!';
        submitBtn.style.background = '#28a745'; // Success Green

        // Show success message
        const successMsg = document.createElement('div');
        successMsg.classList.add('success-message');
        successMsg.innerText = 'Thank you! I will get back to you soon.';
        contactForm.insertBefore(successMsg, contactForm.firstChild);

        // Reset form
        contactForm.reset();

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerText = originalText;
          submitBtn.style.background = ''; // Revert to gradient
          submitBtn.style.opacity = '1';
          submitBtn.disabled = false;
          successMsg.remove();
        }, 4000);

      }, 1500);
    });
  }

  // =========================================
  // 8. DYNAMIC FOOTER YEAR
  // =========================================
  const yearSpan = document.querySelector('.daviefolio-footer small');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    // Keeps the text but updates the year if found, or appends if not
    if (!yearSpan.innerText.includes(currentYear)) {
      yearSpan.innerText = `© ${currentYear} DavieFolio. All Rights Reserved.`;
    }
  }
});