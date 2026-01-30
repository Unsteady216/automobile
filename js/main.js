// Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            sideNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (navOverlay) {
        navOverlay.addEventListener('click', function() {
            navToggle.classList.remove('active');
            sideNav.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    }

    // Close nav when clicking a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            sideNav.classList.remove('active');
            navOverlay.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Scroll Reveal Animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = () => {
        scrollRevealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    if (scrollRevealElements.length > 0) {
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll();
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax Effect for Hero Sections
    const heroSections = document.querySelectorAll('.header, .car-hero');
    
    window.addEventListener('scroll', () => {
        heroSections.forEach(hero => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Lazy Loading Images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(image => imageObserver.observe(image));

    // Add entrance animation to car cards
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});
