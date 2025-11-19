// Header functionality for HealthStarTrust.com
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking overlay
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Treatments dropdown - hover functionality is handled by CSS
    // No JavaScript needed for hover dropdown
    
    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.custom-header-nav-link, .custom-header-mobile-menu-links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        }
    });
});

