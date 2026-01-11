// ===================================
// Navigation & Mobile Menu
// ===================================
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Handle navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle mobile menu
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.nav-link-mobile');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
const animatedElements = document.querySelectorAll('.animate-on-scroll');
animatedElements.forEach(el => observer.observe(el));

// ===================================
// Counter Animation for Stats
// ===================================
const counterElements = document.querySelectorAll('[data-count]');
let counterAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            counterAnimated = true;
            counterElements.forEach(el => animateCounter(el));
        }
    });
}, { threshold: 0.5 });

if (counterElements.length > 0) {
    counterObserver.observe(counterElements[0].parentElement);
}

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
    submitBtn.disabled = true;

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Show success message
    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';


    // Form data ready for submission

    // Reset form after 3 seconds
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);

    // Show alert (you can replace this with a better notification system)
    showNotification('Thank you! We\'ll get back to you soon.', 'success');
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 z-50 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    };

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    notification.classList.add(bgColors[type] || bgColors.info);
    notification.innerHTML = `
        <div class="flex items-center space-x-3 text-white">
            <i class="fas ${icons[type] || icons.info} text-xl"></i>
            <span class="font-medium">${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===================================
// Scroll to Top Button
// ===================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
const heroSection = document.querySelector('.hero-section');
const floatingShapes = document.querySelectorAll('.floating-shape');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    if (scrolled < window.innerHeight) {
        floatingShapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// ===================================
// Dynamic Year in Footer
// ===================================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('footer p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2024', currentYear);
}

// ===================================
// Service Card Hover Effects
// ===================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(102, 126, 234, 0.1)';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Lazy Loading for Images
// ===================================
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY });

        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// ===================================
// Newsletter Form (Footer)
// ===================================
const newsletterForms = document.querySelectorAll('footer form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;

        if (email) {
            showNotification('Thanks for subscribing!', 'success');
            form.reset();
        }
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Initialize on Page Load
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Generate placeholder images if they don't exist
    generatePlaceholderImages();
});

// ===================================
// Generate Placeholder Images
// ===================================
function generatePlaceholderImages() {
    const heroImage = document.getElementById('hero-image');
    const aboutImage = document.getElementById('about-image');

    if (heroImage && !heroImage.src) {
        heroImage.src = createPlaceholderSVG(600, 600, 'Consulting Excellence');
    }

    if (aboutImage && !aboutImage.src) {
        aboutImage.src = createPlaceholderSVG(500, 500, 'About JMax');
    }
}

function createPlaceholderSVG(width, height, text) {
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="${width}" height="${height}" fill="url(#grad1)" opacity="0.1"/>
            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#667eea" text-anchor="middle" dominant-baseline="middle">
                ${text}
            </text>
        </svg>
    `;

    return 'data:image/svg+xml;base64,' + btoa(svg);
}

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions if needed
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);


