

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

// Define your custom moon icon (Silver/Azure SVG)
const moonIcon = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="azure" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunEmoji = '☀️';

// 1. Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    
    // Use innerHTML to support the SVG icon
    themeIcon.innerHTML = newTheme === 'light' ? sunEmoji : moonIcon;
    
    localStorage.setItem('theme', newTheme);
});

// Load saved theme on startup
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.innerHTML = savedTheme === 'light' ? sunEmoji : moonIcon;
}

// smooth trigger effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  {
    threshold: 0.15, // 15% visible to trigger
    rootMargin: '0px 0px -40px 0px' // offset from bottom
  }
);

// Observe all elements with .reveal class
document.querySelectorAll('.reveal')
  .forEach(el => observer.observe(el));



