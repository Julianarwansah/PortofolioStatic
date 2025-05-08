document.addEventListener('DOMContentLoaded', function() {
    // ============ NAVBAR FUNCTIONALITY ============
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    // Optimized scroll event for navbar
    let lastScrollY = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                navbar.classList.toggle('scrolled', lastScrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.textContent = '☰';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.textContent = '☰';
                }
            }
        });
    });

    // ============ HERO SECTION ANIMATIONS ============
    const typed = new Typed('.typed-text', {
        strings: ["Web Developer", "UI Designer", "Tech Enthusiast"],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        startDelay: 1200
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });

    // ============ ABOUT SECTION ANIMATIONS ============
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-quad',
        once: true,
        offset: 100
    });

    // Animate skill items on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    skillItems.forEach(item => {
        skillsObserver.observe(item);
    });

    // Floating icons random positioning
    document.querySelectorAll('.floating-icon').forEach(icon => {
        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 80 + 10;
        icon.style.left = `${randomX}%`;
        icon.style.top = `${randomY}%`;
    });

    // ============ PROJECTS SECTION ANIMATIONS ============
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        
        // Parallax effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const xAxis = (centerX - x) / 25;
            const yAxis = (centerY - y) / 25;
            
            card.querySelector('.project-card-inner').style.transform = `
                rotateY(${xAxis}deg) 
                rotateX(${yAxis}deg) 
                translateY(-10px)
            `;
        });
        
        // Reset when mouse leaves
        card.addEventListener('mouseleave', () => {
            card.querySelector('.project-card-inner').style.transform = 'translateY(-10px) rotateX(5deg)';
        });
    });

    // ============ CONTACT FORM VALIDATION ============
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form validation or submission logic here
            alert('Form submitted! (This is a demo)');
        });
    }
});