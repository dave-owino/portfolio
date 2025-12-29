// ----------------------------------------------------
// Main JavaScript for DavieFolio Project Page
// ----------------------------------------------------

(function () {
  "use strict";

  // 1. Navbar Toggle Logic for Mobile
  const menuToggle = document.querySelector('.js-daviefolio-nav-toggle');
  const nav = document.querySelector('#navbarDefault');

  if (menuToggle) {
    menuToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);

      // Toggle class to show/hide menu (Bootstrap-like behavior)
      nav.classList.toggle('show');
      this.classList.toggle('active');
    });
  }

  // 2. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      // Only scroll if it's a valid ID on this page
      if (targetId.length > 1 && document.querySelector(targetId)) {
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (nav.classList.contains('show')) {
          nav.classList.remove('show');
          if (menuToggle) menuToggle.classList.remove('active');
        }
      }
    });
  });

  // 3. Scroll Animations (Intersection Observer)
  const animateBoxes = document.querySelectorAll('.animate-box');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const effect = entry.target.getAttribute('data-animate-effect');

        if (effect === 'fadeInLeft') {
          entry.target.classList.add('fadeInLeft');
          entry.target.style.opacity = '1';
        } else if (effect === 'fadeInRight') {
          entry.target.classList.add('fadeInRight');
          entry.target.style.opacity = '1';
        } else if (effect === 'fadeInUp') {
          entry.target.classList.add('fadeInUp');
          entry.target.style.opacity = '1';
        }

        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateBoxes.forEach(box => {
    observer.observe(box);
  });

  // 4. Form Submission Handling (AJAX)
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  const submitBtn = document.getElementById('sendMessageButton');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation visual feedback
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://formspree.io/f/mwppwqkr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
        .then(response => {
          if (response.ok) {
            // Success
            successMessage.style.display = 'block';
            successMessage.innerText = "Thanks! I'll get back to you shortly.";
            contactForm.reset();
            submitBtn.innerText = "Message Sent";
          } else {
            // Error
            response.json().then(data => {
              if (Object.hasOwn(data, 'errors')) {
                successMessage.style.display = 'block';
                successMessage.style.color = '#dc3545'; // Red
                successMessage.innerText = data["errors"].map(error => error["message"]).join(", ");
              } else {
                successMessage.style.display = 'block';
                successMessage.style.color = '#dc3545';
                successMessage.innerText = "Oops! There was a problem submitting your form";
              }
            })
          }
        })
        .catch(error => {
          successMessage.style.display = 'block';
          successMessage.style.color = '#dc3545';
          successMessage.innerText = "Oops! There was a problem submitting your form";
        })
        .finally(() => {
          setTimeout(() => {
            submitBtn.innerText = "Send Message";
            submitBtn.disabled = false;
            // Hide success message after 5 seconds
            setTimeout(() => {
              successMessage.style.display = 'none';
            }, 5000);
          }, 2000);
        });
    });
  }

})();
