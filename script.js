// Smooth scrolling for navigation links
document.querySelectorAll('.nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 70;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Service card hover popup functionality
const serviceCards = document.querySelectorAll('.service-card');
const popup = document.getElementById('popup');
const popupContent = popup.querySelector('.popup-content');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const info = this.getAttribute('data-info');
        popupContent.textContent = info;
        
        const rect = this.getBoundingClientRect();
        const popupWidth = 300;
        const popupHeight = 150;
        
        let left = rect.left + (rect.width / 2) - (popupWidth / 2);
        let top = rect.top - popupHeight - 20;
        
        // Ensure popup stays within viewport
        if (left < 10) left = 10;
        if (left + popupWidth > window.innerWidth - 10) {
            left = window.innerWidth - popupWidth - 10;
        }
        if (top < 80) {
            top = rect.bottom + 10;
        }
        
        popup.style.left = left + 'px';
        popup.style.top = top + window.scrollY + 'px';
        popup.classList.add('show');
    });
    
    card.addEventListener('mouseleave', function() {
        popup.classList.remove('show');
    });
});

// Hide popup when scrolling
let scrollTimeout;
window.addEventListener('scroll', () => {
    popup.classList.remove('show');
    clearTimeout(scrollTimeout);
});

// Duplicate slider items for infinite scroll effect
// const slider = document.querySelector('.slider');
// const slides = Array.from(document.querySelectorAll('.slide'));

// Clone slides for seamless infinite scroll
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    slider.appendChild(clone);
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards for animation on scroll
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// CTA Button click effect
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const headerOffset = 70;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        if (nav.style.display === 'flex') {
            nav.style.display = 'none';
        } else {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            nav.style.padding = '1rem';
            nav.style.gap = '1rem';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && nav.style.display === 'flex' && window.innerWidth <= 768) {
        nav.style.display = 'none';
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const servicesSection = document.getElementById('services');

  if (!servicesSection) return;

  window.addEventListener('scroll', () => {
    const rect = servicesSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // progress: 0 (top just entering) → 1 (bottom leaving)
    let progress = 1 - (rect.bottom / (rect.height + windowHeight));
    progress = Math.max(0, Math.min(1, progress));

    // Interpolate from white → red
    const r = 255;
    const g = Math.round(255 * (1 - progress));
    const b = Math.round(255 * (1 - progress));

    servicesSection.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  });
});


console.log('Website loaded successfully!');