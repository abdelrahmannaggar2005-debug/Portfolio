window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').classList.add('hidden');
    }, 1000);
});

particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#60a5fa' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#60a5fa',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    },
    retina_detect: true
});

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.remove('active');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

const createTrail = (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 5px;
        height: 5px;
        background: radial-gradient(circle, #60a5fa, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        animation: trailFade 0.5s forwards;
    `;
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 500);
};

const style = document.createElement('style');
style.textContent = `
    @keyframes trailFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);

let trailTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(trailTimeout);
    trailTimeout = setTimeout(() => createTrail(e), 50);
});


// ============================================
// THE LEGENDARY ACTIVE STATE SYSTEM
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const activeIndicator = document.querySelector('.active-indicator');
    const navbar = document.querySelector('.navbar');
    
    // Update Active State & Move Indicator
    function updateActiveLink() {
        let current = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach((link, index) => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === current) {
                link.classList.add('active');
                
                // Move the Active Indicator
                if (window.innerWidth > 968) {
                    const linkRect = link.getBoundingClientRect();
                    const menuRect = link.closest('.nav-menu').getBoundingClientRect();
                    
                    activeIndicator.style.width = `${linkRect.width}px`;
                    activeIndicator.style.left = `${linkRect.left - menuRect.left}px`;
                    activeIndicator.classList.add('show');
                }
            }
        });
    }
    
    // Scroll Effect
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial Load
    updateActiveLink();
    
    // Click Handler
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Smooth scroll
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.toggle('active');
    btn.classList.toggle('active');
}

function closeMenu() {
    const menu = document.getElementById('nav-menu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.remove('active');
    btn.classList.remove('active');
}