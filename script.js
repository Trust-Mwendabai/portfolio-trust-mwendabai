// Initialize AOS with enhanced settings for modern feel
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    offset: 100
});

// Modern navigation and interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    
    // Create a more smooth, glass-like navigation effect on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.backdropFilter = 'none';
        }
    });

    // Enhanced smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add a slight delay for a more natural feel
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // Advanced active class handling for navigation
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        let activeFound = false;
        
        // Remove all active classes first
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Check each section in reverse order (bottom to top)
        [...sections].reverse().forEach(section => {
            if (!activeFound) {
                const sectionTop = section.offsetTop - 100;
                const link = document.querySelector(`a[href="#${section.id}"]`);
                
                if (currentScroll >= sectionTop && link) {
                    link.classList.add('active');
                    activeFound = true;
                }
            }
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Animate contact cards on hover
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
            
            // Add a slight delay between icon animations based on card index
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                setTimeout(() => {
                    iconContainer.style.transform = 'rotateY(180deg)';
                }, index * 100);
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.05)';
            
            const iconContainer = this.querySelector('.icon-container');
            if (iconContainer) {
                iconContainer.style.transform = 'rotateY(0)';
            }
        });
    });
});

// Enhanced card animations with subtle hover effects
document.querySelectorAll('.card').forEach((card, index) => {
    // Add staggered animation delay based on card index
    if (card.hasAttribute('data-aos')) {
        card.setAttribute('data-aos-delay', (index * 100).toString());
    }
    
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        
        // Animate card image if present
        const cardImg = this.querySelector('img');
        if (cardImg) {
            cardImg.style.transform = 'scale(1.1)';
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        
        // Reset image animation
        const cardImg = this.querySelector('img');
        if (cardImg) {
            cardImg.style.transform = 'scale(1)';
        }
    });
});

// Portfolio filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Initialize Isotope-like filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Show all items if filter is 'all', otherwise filter by category
                if (filterValue === 'all' || filterValue === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Animated typing effect for hero section
    const texts = ['Frontend Web Developer', 'UI/UX Designer', 'Creative Thinker'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    
    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        const typedTextElement = document.querySelector('.hero-typed-text');
        if (typedTextElement) {
            typedTextElement.textContent = letter;
            
            if (letter.length === currentText.length) {
                // Pause at the end of the text
                setTimeout(() => {
                    index = 0;
                    count++;
                    type();
                }, 2000);
            } else {
                // Continue typing
                setTimeout(type, 100);
            }
        }
    })();
});

// Add parallax effect to portfolio section
window.addEventListener('scroll', function() {
    const portfolioSection = document.querySelector('.portfolio-section');
    if (portfolioSection) {
        const scrollPosition = window.pageYOffset;
        const offset = portfolioSection.offsetTop;
        const distance = scrollPosition - offset;
        
        if (distance > -500 && distance < 500) {
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach((item, index) => {
                const speed = 1 + (index % 3) * 0.05;
                const yPos = distance * speed * 0.05;
                item.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
});
