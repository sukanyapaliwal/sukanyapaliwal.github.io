const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const revealElements = document.querySelectorAll('.reveal');
const statNumbers = document.querySelectorAll('.stat-number');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  });
});

const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      navLink.classList.toggle(
        'active',
        scrollY >= sectionTop && scrollY < sectionTop + sectionHeight
      );
    }
  });
}

window.addEventListener('scroll', highlightNav);

function revealOnScroll() {
  revealElements.forEach((el) => {
    const revealTop = el.getBoundingClientRect().top;
    if (revealTop < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('DOMContentLoaded', revealOnScroll);

let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;

  const statsSection = document.querySelector('.about-stats');
  if (!statsSection) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top >= window.innerHeight - 80) return;

  statsAnimated = true;

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const duration = 1200;
    const startTime = performance.now();

    function updateCount(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      stat.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    }

    requestAnimationFrame(updateCount);
  });
}

window.addEventListener('scroll', animateStats);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const targetEl = document.querySelector(targetId);

    if (!targetEl) return;

    e.preventDefault();
    const targetPosition = targetEl.offsetTop - navbar.offsetHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  });
});
