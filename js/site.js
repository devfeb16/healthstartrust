// Consolidated site interactions: header, sticky CTA, and modal logic
(() => {
    const ready = (cb) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', cb, { once: true });
        } else {
            cb();
        }
    };

    const initMobileMenu = () => {
        const openBtn = document.getElementById('mobile-menu-btn');
        const closeBtn = document.getElementById('mobile-menu-close');
        const menu = document.getElementById('mobile-menu');
        if (!menu) return;

        const toggleBodyScroll = (lock) => {
            document.body.style.overflow = lock ? 'hidden' : '';
        };

        const openMenu = () => {
            menu.classList.add('active');
            toggleBodyScroll(true);
        };

        const closeMenu = () => {
            menu.classList.remove('active');
            toggleBodyScroll(false);
        };

        openBtn?.addEventListener('click', openMenu);
        closeBtn?.addEventListener('click', closeMenu);
        menu.addEventListener('click', (event) => {
            if (event.target === menu) closeMenu();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menu.classList.contains('active')) {
                closeMenu();
            }
        });
    };

    const initMobileDropdown = () => {
        const dropdownBtn = document.getElementById('mobile-treatments-btn');
        const dropdown = document.getElementById('mobile-treatments-dropdown');
        if (!dropdownBtn || !dropdown) return;

        const toggleDropdown = (event) => {
            event.preventDefault();
            dropdown.classList.toggle('active');
        };

        dropdownBtn.addEventListener('click', toggleDropdown);
    };

    const initNavHighlight = () => {
        const currentPath = window.location.pathname.replace(/index\.html$/, '') || '/';
        const links = document.querySelectorAll('.custom-header-nav-link, .custom-header-mobile-menu-links a');
        links.forEach((link) => {
            const linkPath = new URL(link.href, window.location.origin).pathname.replace(/index\.html$/, '') || '/';
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        });
    };

    const initStickyModule = () => {
        const sticky = document.querySelector('.sticky-module');
        if (!sticky) return;

        let ticking = false;

        const update = () => {
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            sticky.classList.toggle('visible', percent >= 5);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        update();
    };

    const initModals = () => {
        const body = document.body;
        const triggers = document.querySelectorAll('[data-toggle="modal"][data-target]');
        if (!triggers.length) return;

        const openModals = new Set();

        const createBackdrop = (id) => {
            const backdrop = document.createElement('div');
            backdrop.className = 'modal-backdrop fade show';
            backdrop.dataset.backdropFor = id;
            return backdrop;
        };

        const openModal = (modal) => {
            if (!modal || openModals.has(modal)) return;
            modal.style.display = 'block';
            modal.removeAttribute('aria-hidden');
            modal.classList.add('show');
            body.classList.add('modal-open');
            body.style.overflow = 'hidden';
            const backdrop = createBackdrop(modal.id);
            body.appendChild(backdrop);
            openModals.add(modal);
        };

        const closeModal = (modal) => {
            if (!modal || !openModals.has(modal)) return;
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            modal.style.display = 'none';
            openModals.delete(modal);
            const backdrop = document.querySelector(`.modal-backdrop[data-backdrop-for=\"${modal.id}\"]`);
            backdrop?.remove();
            if (!openModals.size) {
                body.classList.remove('modal-open');
                body.style.overflow = '';
            }
        };

        triggers.forEach((trigger) => {
            const targetSelector = trigger.getAttribute('data-target');
            const modal = document.querySelector(targetSelector);
            if (!modal) return;
            trigger.addEventListener('click', (event) => {
                event.preventDefault();
                openModal(modal);
            });

            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal(modal);
                }
            });

            modal.querySelectorAll('[data-dismiss=\"modal\"], .close').forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    closeModal(modal);
                });
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                const lastModal = Array.from(openModals).pop();
                if (lastModal) {
                    closeModal(lastModal);
                }
            }
        });
    };

    ready(() => {
        initMobileMenu();
        initMobileDropdown();
        initNavHighlight();
        initStickyModule();
        initModals();
    });
})();

