/* 
  Muhammad Mubashar - Portfolio JS
  Handles micro-animations, scroll effects, and responsive navigation.
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        const isLightMode = document.body.classList.contains('light-mode');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.background = isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1.2rem 0';
            navbar.style.background = isLightMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(10, 10, 10, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. Mobile Menu Toggle (Basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const isLightMode = document.body.classList.contains('light-mode');
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = isLightMode ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid var(--border-subtle)';
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        });
    });

    // 4. Intersection Observer for Fade-In Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial styles and observe elements
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
        el.style.transitionDelay = `${index % 3 * 0.1}s`; // Stagger effect
        observer.observe(el);
    });

    // Setup hover effect for tech badges to glow
    const techItems = document.querySelectorAll('.tech-item, .tag');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-2px)';
            item.style.boxShadow = '0 4px 8px rgba(0, 240, 255, 0.2)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // 5. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Re-trigger navbar scroll background update
            window.dispatchEvent(new Event('scroll'));

            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
        });
    }
});
