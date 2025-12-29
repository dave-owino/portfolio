/* Main JS File */
// --- MOBILE MENU TOGGLE ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('nav-active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// --- SCROLL ANIMATION (INTERSECTION OBSERVER) ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => revealObserver.observe(el));

// --- ARCHIVE LOGIC ---
function toggleArchive(element) {
  const parent = element.closest('.archive-item');
  parent.classList.toggle('expanded');
  const icon = element.querySelector('i');
  if (parent.classList.contains('expanded')) {
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
    element.innerHTML = 'Show Less <i class="fas fa-chevron-up"></i>';
  } else {
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
    element.innerHTML = 'Read Full Details <i class="fas fa-chevron-down"></i>';
  }
}

function loadMoreArchive() {
  const hiddenItems = document.querySelectorAll('.hidden-archive');
  const btn = document.getElementById('load-more-btn');
  let count = 0;

  hiddenItems.forEach(item => {
    if (count < 2) { // Load 2 at a time
      item.style.display = 'flex';
      // Trigger animation
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, 50);
      item.classList.remove('hidden-archive');
      count++;
    }
  });

  // Check if more items remain
  const remaining = document.querySelectorAll('.hidden-archive').length;
  if (remaining === 0) {
    btn.style.display = 'none';
  }
}

// Initialize hidden items as display none via JS to prevent flash
document.querySelectorAll('.hidden-archive').forEach(el => el.style.display = 'none');

// --- CONTACT FORM HANDLING ---
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Simulate form submission
  const btn = contactForm.querySelector('button');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Sending...';

  setTimeout(() => {
    btn.innerHTML = originalText;
    contactForm.reset();
    showToast();
  }, 1500);
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// --- CANVAS NETWORK ANIMATION (Background) ---
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height;
let particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = document.querySelector('.hero').offsetHeight; // Only fill hero section
}

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor(width / 10); // Density based on width
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Draw connections
    for (let j = i; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resize();
  initParticles();
});

// Start Animation
resize();
initParticles();
animate();
/* End of Main JS File */
