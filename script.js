/* ===== script.js ===== */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Mobile hamburger toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links li a');

const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObs.observe(s));

// Scroll-in animations
const animateEls = document.querySelectorAll(
  '.svc-card, .ind-card, .why-card, .value-item, .product-card, .country-tag, .vm-card, .process-box'
);

const fadeObs = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${(i % 8) * 60}ms`;
      entry.target.classList.add('animate-in');
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

animateEls.forEach(el => { el.style.opacity = '0'; fadeObs.observe(el); });

// Quote form
const quoteForm    = document.getElementById('quoteForm');
const quoteSuccess = document.getElementById('quoteSuccess');

quoteForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = quoteForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    quoteForm.reset();
    btn.textContent = 'Submit Enquiry';
    btn.disabled = false;
    quoteSuccess.classList.add('show');
    setTimeout(() => quoteSuccess.classList.remove('show'), 5000);
  }, 1200);
});
