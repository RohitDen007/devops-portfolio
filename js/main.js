/* ============================================
   Main JavaScript - Core Functionality
   ============================================ */

// ============================================
// Dark Mode Toggle
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply saved theme on page load
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    htmlElement.setAttribute('data-theme', 'dark');
}

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Add subtle animation
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 300);
});

// ============================================
// Mobile Menu Toggle
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
    });
});

// ============================================
// Smooth Scroll for Internal Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// Animate on Scroll (AOS)
// ============================================

function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.aosDelay || '0';
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================
// Active Navigation Link on Scroll
// ============================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => observer.observe(section));
}

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // For now, just log and show success message
        console.log('Form submitted:', data);
        
        // Show success message
        const button = contactForm.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        button.textContent = '✓ Message Sent!';
        button.disabled = true;
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
        // In a real application, you would send this to a backend service:
        // const response = await fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// ============================================
// Filter Projects
// ============================================

function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.classList.add('aos-animate');
                    }, 0);
                } else {
                    card.style.display = 'none';
                    card.classList.remove('aos-animate');
                }
            });
        });
    });
}

// ============================================
// Navbar Background on Scroll
// ============================================

function updateNavbarStyle() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    updateActiveNavLink();
    initProjectFilter();
    updateNavbarStyle();
    
    // Add some micro-interactions
    addMicroInteractions();
});

// ============================================
// Micro-interactions
// ============================================

function addMicroInteractions() {
    // Button ripple effect
    document.querySelectorAll('.btn, .filter-btn, .social-link').forEach(element => {
        element.addEventListener('click', function(e) {
            // Create ripple
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.pointerEvents = 'none';
            
            const rect = this.getBoundingClientRect();
// ============================================
// Project Filter Buttons
// ============================================

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter category
            const category = btn.getAttribute('data-filter');
            
            // Filter and render projects
            if (window.projectsModule && window.projectsModule.filterAndRenderProjects) {
                window.projectsModule.filterAndRenderProjects(category);
            }
        });
    });
}

// ============================================
// Parallax Scroll Effect
// ============================================

function initParallaxScroll() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                // Parallax effect on sections with background
                document.querySelectorAll('[data-parallax-speed]').forEach(element => {
                    const speed = element.dataset.parallaxSpeed || 0.5;
                    element.style.transform = `translateY(${scrollY * speed}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// Smooth Scroll Indicator
// ============================================

function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// ============================================
// Card Glow Effect
// ============================================

function initCardGlowEffect() {
    const cards = document.querySelectorAll('.project-card, .timeline-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mouse-x', 'center');
            card.style.setProperty('--mouse-y', 'center');
        });
    });
}

// ============================================
// Magnetic Button Effect
// ============================================

function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .filter-btn, .project-link');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// Utility Functions
// ============================================

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

// ============================================
// Initialize All Interactive Features
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all custom effects
    initProjectFilters();
    initParallaxScroll();
    updateScrollIndicator();
    initCardGlowEffect();
    initMagneticButtons();
    
    // Initialize project module effects if available
    if (window.projectsModule) {
        if (window.projectsModule.initParallaxEffect) {
            window.projectsModule.initParallaxEffect();
        }
        if (window.projectsModule.initMouseFollowEffect) {
            window.projectsModule.initMouseFollowEffect();
        }
        if (window.projectsModule.initRippleEffect) {
            window.projectsModule.initRippleEffect();
        }
    }
});

// Log information about the page
console.log('Portfolio loaded successfully with enhanced interactions!');


