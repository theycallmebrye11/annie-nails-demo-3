const navbar = document.querySelector('.navbar');
const burgerBtn = document.getElementById('burger-btn');
const navLinks = document.querySelector('.nav-links');
let lastScrollY = window.scrollY;
let isMouseNearNav = false;
let scrollTimeout;

// Constants
const SENSITIVE_AREA = 100;
const SCROLL_THRESHOLD = 50;
const SCROLL_TIMEOUT = 1500;

// Show navbar initially
window.addEventListener('load', () => {
    navbar.style.transform = 'translateY(0)';
});

// Toggle menu when burger is clicked
burgerBtn?.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    burgerBtn.classList.toggle('open');
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (!navLinks.contains(event.target) && !burgerBtn.contains(event.target)) {
        navLinks.classList.remove('open');
        burgerBtn?.classList.remove('open');
    }
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burgerBtn?.classList.remove('open');
    });
});

// Handle mouse movement
document.addEventListener('mousemove', (e) => {
    isMouseNearNav = e.clientY <= SENSITIVE_AREA;
    updateNavbarVisibility();
});

// Handle scroll events with throttling
let lastScrollHandler = 0;
window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollHandler > 100) { // Throttle to max once per 100ms
        const currentScrollY = window.scrollY;
        
        // Clear the timeout on scroll
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Handle the scroll
        if (Math.abs(currentScrollY - lastScrollY) > SCROLL_THRESHOLD) {
            if (currentScrollY < lastScrollY) {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            } else {
                // Scrolling down
                if (!isMouseNearNav && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                }
            }
            lastScrollY = currentScrollY;
        }

        // Set timeout to hide navbar after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (!isMouseNearNav && currentScrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            }
        }, SCROLL_TIMEOUT);

        lastScrollHandler = now;
    }
});

function updateNavbarVisibility() {
    if (isMouseNearNav) {
        navbar.style.transform = 'translateY(0)';
    } else if (window.scrollY > 100 && !navLinks.classList.contains('open')) {
        navbar.style.transform = 'translateY(-100%)';
    }
}