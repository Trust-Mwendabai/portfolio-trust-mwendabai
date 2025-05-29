// Initialize AOS animations with responsive settings
AOS.init({
    duration: window.innerWidth < 768 ? 600 : 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Helper function to check if device is mobile
const isMobile = () => {
    return window.innerWidth < 768 || ('ontouchstart' in window);
};

// Add touch feedback for better mobile UX
const addTouchFeedback = () => {
    const touchElements = document.querySelectorAll('.btn, .filter-btn, .card, .nav-link');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.97)';
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        }, { passive: true });
    });
};

// Handle portfolio filtering with optimizations for mobile
const setupPortfolioFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active state
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#4a148c';
            });
            
            this.classList.add('active');
            this.style.backgroundColor = '#4a148c';
            this.style.color = 'white';
            
            // Filter items with optimized animation for mobile
            const portfolioItems = document.querySelectorAll('[data-category]');
            const duration = isMobile() ? 200 : 300;
            
            portfolioItems.forEach(item => {
                const parent = item.parentElement;
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    parent.style.display = 'block';
                    setTimeout(() => {
                        parent.style.opacity = '1';
                    }, 10);
                } else {
                    parent.style.opacity = '0';
                    setTimeout(() => {
                        parent.style.display = 'none';
                    }, duration);
                }
            });
            
            // Update layout after filtering (prevents layout issues)
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, duration + 50);
        });
    });
};

// Enhance project card interactions for mobile
const enhanceProjectCards = () => {
    const projectCards = document.querySelectorAll('.card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project-overlay');
        if (!overlay) return;
        
        if (isMobile()) {
            card.addEventListener('touchstart', function() {
                overlay.style.opacity = '1';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    overlay.style.opacity = '0';
                }, 500);
            });
        } else {
            card.addEventListener('mouseenter', function() {
                overlay.style.opacity = '1';
            });
            
            card.addEventListener('mouseleave', function() {
                overlay.style.opacity = '0';
            });
        }
    });
};

// Optimize images for better performance
const optimizeImages = () => {
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
};

// When the document is ready
document.addEventListener('DOMContentLoaded', function() {
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Smooth scroll to top when clicking the button
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add touch feedback for mobile
    addTouchFeedback();
    
    // Setup portfolio filters
    setupPortfolioFilters();
    
    // Enhance project cards
    enhanceProjectCards();
    
    // Optimize images
    optimizeImages();
    
    // Make navbar collapse on mobile after clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarCollapse && navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });
    }
    
    // Refresh AOS when all images are loaded
    window.addEventListener('load', function() {
        AOS.refresh();
    });
});

// Update AOS durations on window resize
window.addEventListener('resize', function() {
    AOS.refresh();
});
