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

        const setExpanded = (state) => {
            if (openBtn) {
                openBtn.setAttribute('aria-expanded', String(state));
            }
        };

        const openMenu = () => {
            menu.classList.add('active');
            toggleBodyScroll(true);
            setExpanded(true);
        };

        const closeMenu = () => {
            menu.classList.remove('active');
            toggleBodyScroll(false);
            setExpanded(false);
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
            const isOpen = dropdown.classList.toggle('active');
            dropdownBtn.setAttribute('aria-expanded', String(isOpen));
        };

        dropdownBtn.addEventListener('click', toggleDropdown);
    };

    const initDesktopDropdown = () => {
        const dropdown = document.getElementById('treatments-dropdown');
        const dropdownBtn = document.getElementById('treatments-btn');
        if (!dropdown || !dropdownBtn) return;

        const setExpanded = (state) => {
            dropdownBtn.setAttribute('aria-expanded', String(state));
        };

        dropdown.addEventListener('mouseenter', () => setExpanded(true));
        dropdown.addEventListener('mouseleave', () => setExpanded(false));
        dropdown.addEventListener('focusin', () => setExpanded(true));
        dropdown.addEventListener('focusout', (event) => {
            if (!dropdown.contains(event.relatedTarget)) {
                setExpanded(false);
            }
        });
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

    const initDynamicMonthLabels = () => {
        const targets = document.querySelectorAll('[data-current-month]');
        if (!targets.length) return;

        const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
        const currentMonth = formatter.format(new Date());

        targets.forEach((target) => {
            const prefix = target.dataset.currentMonthPrefix || '';
            const suffix = target.dataset.currentMonthSuffix || '';
            target.textContent = `${prefix}${currentMonth}${suffix}`;
        });
    };

    const initTreatmentCards = () => {
        const stacks = document.querySelectorAll('.treatment-card-stack');
        if (!stacks.length) return;

        const VISIT_LINK = 'https://wellnesstracker-compare.lovable.app/';

        const scoreLabel = (rating) => {
            if (rating >= 9.5) return 'Excellent';
            if (rating >= 9) return 'Great';
            if (rating >= 8.5) return 'Strong';
            return 'Solid';
        };

        const createStars = (rating) => {
            const normalized = Math.max(0, Math.min(5, rating / 2));
            const fullStars = Math.floor(normalized);
            const fractional = normalized - fullStars;
            const icons = [];

            for (let i = 0; i < fullStars; i += 1) {
                icons.push('<i class="fa fa-star" aria-hidden="true"></i>');
            }

            if (fractional >= 0.75) {
                icons.push('<i class="fa fa-star" aria-hidden="true"></i>');
            } else if (fractional >= 0.25) {
                icons.push('<i class="fa fa-star-half" aria-hidden="true"></i>');
            }

            while (icons.length < 5) {
                icons.push('<i class="fa fa-star treatment-card__star--muted" aria-hidden="true"></i>');
            }

            return icons.join('');
        };

        const treatmentRecommendations = {
            'weight-loss': [
                {
                    title: 'PharmaServe Weight Loss Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.7,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Stocks Ozempic, Wegovy, Mounjaro, Saxenda, Zepbound, Xenical, Contrave, Topamax, Alli, and Orlistat options.',
                        'Use code 10OFFNEW to save up to $80 on your first shipment.',
                        'Dispensed by a Manitoba licensed pharmacy with USPS and CanadaPost delivery timelines of 1-2 weeks.',
                        'Order Flow, Upload Prescription, and Tracking the Order e-guides keep each step documented.'
                    ]
                },
                {
                    title: 'CareBridge Metabolic Clinic',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.4,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Board certified obesity specialists personalize GLP-1 plans, metabolic labs, and compounding protocols.',
                        'Biweekly virtual visits pair dietitians with habit tracking dashboards so data stays centralized.',
                        'Transparent ingredient sourcing with published formularies and quality checkpoints.',
                        'Coaching syncs with Apple Health, Oura, and Fitbit to keep movement and sleep on track.'
                    ]
                },
                {
                    title: 'WellnessDirect Network',
                    subtitle: 'Whole person coaching collective',
                    rating: 9.2,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Integrated behavioral coaching maps cravings, stress, and sleep hygiene against medication titration.',
                        'Prior authorization and pharmacy coordination handled inside one visit flow.',
                        'Group accountability cohorts deliver weekly SMS nudges and milestone recaps.',
                        'Expedited shipping label plus prepaid sharps disposal simplify at-home injections.'
                    ]
                }
            ],
            'eye-care': [
                {
                    title: 'PharmaServe Eye Care Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.6,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Carries Azopt, Travatan, Pataday, Olopatadine, and other prescription eye drop staples.',
                        'Respiratory and allergy lineup covers Flovent HFA, Ventolin, Symbicort, Trelegy, and more.',
                        'Team available via toll free 1-800-258-0477, email, or WhatsApp during business hours.',
                        'USPS fulfillment averages 1-2 weeks with medications dispensed from Manitoba.'
                    ]
                },
                {
                    title: 'CareBridge Vision Studio',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.3,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Tele-optometry visits include at-home acuity kits and AR assisted contact fittings.',
                        'Manages dry eye, allergy flares, and glaucoma staging within one unified chart.',
                        'Automatic reminders keep quarterly intraocular pressure checks on schedule.',
                        'Integrates with ophthalmology EMRs for seamless referrals back to in-person surgeons.'
                    ]
                },
                {
                    title: 'WellnessDirect Ocular Team',
                    subtitle: 'Whole person coaching collective',
                    rating: 9.1,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Focuses on allergy and ocular surface relief with standing orders for antihistamine drops.',
                        'Coordinators sync pediatric refills and school medication forms.',
                        'Lens replacement tracker prevents gap days for chronic wearers.',
                        'Emergency messaging triages redness or light sensitivity within minutes.'
                    ]
                }
            ],
            asthma: [
                {
                    title: 'PharmaServe Asthma Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.6,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Flovent HFA, Symbicort, Trelegy, Ventolin Diskus, Ventolin Nebules, Ventolin HFA, Qvar, and Arnuity stay in stock.',
                        '10OFFNEW code gives new patients 10% off controller inhalers.',
                        'Shipping protection add-on works with USPS to replace lost or damaged packages.',
                        'Live support runs 7am-9pm CST on weekdays and 9am-5pm weekends for refill checks.'
                    ]
                },
                {
                    title: 'CareBridge Respiratory Hub',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.3,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Respiratory therapists pair spirometry uploads with tailored action plans.',
                        'Digital inhaler sensors feed adherence data straight into the portal.',
                        'Predictive alerts flag pollen spikes and wildfire smoke so dosing stays ahead.',
                        'Coaching team reviews inhaler technique during quarterly video visits.'
                    ]
                },
                {
                    title: 'WellnessDirect Airway Collective',
                    subtitle: 'Whole person coaching collective',
                    rating: 9.1,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Bundles rescue plus controller meds into one subscription style shipment.',
                        'Same day prescription adjustments when action plans escalate.',
                        'Medication sync makes sure nebulizer supplies arrive with each refill.',
                        'Asthma educators send short text tips after every reported flare.'
                    ]
                }
            ],
            anticoagulant: [
                {
                    title: 'PharmaServe Anticoagulant Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.5,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Carries Eliquis, Xarelto, Apixaban, Pradaxa, Rivaroxaban, Clopidogrel, and Dabigatran.',
                        'Need An Rx service and upload guides connect you with prescribers when needed.',
                        'Refill My Prescription workflows plus MyPharmaBucks loyalty streamline long term therapy.',
                        'Optional shipping protection coordinates with USPS investigations for critical meds.'
                    ]
                },
                {
                    title: 'CareBridge Cardio Clinic',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.2,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Remote INR and anti-Xa monitoring kits ship overnight with training videos.',
                        'Pharmacists review interaction risks before new medications are added.',
                        'Travel letters and dosing cards generated instantly inside the portal.',
                        'Refill cadence ensures bridging therapy is approved before gaps form.'
                    ]
                },
                {
                    title: 'WellnessDirect Clot Care',
                    subtitle: 'Whole person coaching collective',
                    rating: 9.0,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Case managers coordinate cardiology, hematology, and primary care notes.',
                        'Secure messaging stays open seven days per week for symptom triage.',
                        'Proactive lab nudges keep chronic therapies within therapeutic windows.',
                        'Shipping concierge watches weather and holidays to avoid delays.'
                    ]
                }
            ],
            antifungal: [
                {
                    title: 'PharmaServe Antifungal Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.5,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Offers Jublia, Nizoral, Ciclopirox, Terbinafine, Lamisil, and Spectazole therapies.',
                        'Silver, Gold, and Platinum loyalty tiers plus the referral program reward chronic plans.',
                        '10OFFNEW discount applies to the first antifungal order up to $80.',
                        'International partners in Singapore, UK, Turkey, Australia, Mauritius, and New Zealand protect supply.'
                    ]
                },
                {
                    title: 'CareBridge Derm Support',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.1,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Board certified dermatology support for nail fungus and tinea cases.',
                        'Photo uploads tracked over 12 week treatment arcs inside the portal.',
                        'Compound team mixes customized strengths for stubborn plaques.',
                        'Insurance advocates prep documentation for recurrent infection coverage.'
                    ]
                },
                {
                    title: 'WellnessDirect Skin Lab',
                    subtitle: 'Whole person coaching collective',
                    rating: 8.9,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Telederm plus pharmacist huddles review sensitivities before switching meds.',
                        'Adherence prompts remind patients to complete the full antifungal course.',
                        'Skin barrier kits bundled with prescriptions to limit irritation.',
                        'Heat protected shipping keeps topical solutions stable during summer.'
                    ]
                }
            ],
            fertility: [
                {
                    title: 'PharmaServe Fertility Desk',
                    subtitle: 'PharmaServe licensed pharmacy support',
                    rating: 9.5,
                    logo: '/assets/providers/pharmaserve.svg',
                    features: [
                        'Need An Rx concierge plus upload tutorials simplify fertility hormone prescriptions.',
                        'Resource Library explains order flow, refills, tracking, and MyPharmaBucks balances.',
                        'Gift cards, loyalty tiers, referrals, and coupon hub 10OFFNEW stretch multi cycle budgets.',
                        'Global pharmacies in Canada, UK, Turkey, Australia, Mauritius, and New Zealand backfill inventory.'
                    ]
                },
                {
                    title: 'CareBridge Fertility Navigation',
                    subtitle: 'CareBridge Telehealth',
                    rating: 9.2,
                    logo: '/assets/providers/carebridge.svg',
                    features: [
                        'Cycle mapping dashboard unites lab work, ultrasound uploads, and clinic notes.',
                        'Medication calendar auto adjusts after every monitoring appointment.',
                        '24/7 nurse line answers trigger shot timing and dose questions.',
                        'Financial concierge tracks benefits, grants, and FSA submissions.'
                    ]
                },
                {
                    title: 'WellnessDirect Family Collective',
                    subtitle: 'Whole person coaching collective',
                    rating: 9.0,
                    logo: '/assets/providers/wellnessdirect.svg',
                    features: [
                        'Coaching sessions cover nutrition, sleep, and stress techniques aligned to phases.',
                        'Partner portal keeps both patients updated on medication timing.',
                        'Climate controlled shipping for gonadotropins with temperature loggers.',
                        'Refill sync prevents last minute scrambles before the next stimulation round.'
                    ]
                }
            ]
        };

        const renderCard = (card, index, category) => {
            const rank = String(index + 1).padStart(2, '0');
            const ratingText = scoreLabel(card.rating);
            const stars = createStars(card.rating);
            const subtitle = card.subtitle
                ? `<p class="treatment-card__subtitle mb-2">${card.subtitle}</p>`
                : '';

            const features = card.features
                .map((feature) => `<li>${feature}</li>`)
                .join('');

            return `
                <article class="treatment-card card" data-vendor="${card.title}" data-category="${category}">
                    <div class="card-body p-4">
                        <div class="treatment-card__layout">
                            <div class="treatment-card__brand">
                                <div class="treatment-card__rank">${rank}</div>
                                <img src="${card.logo}" alt="${card.title} logo" class="treatment-card__logo" loading="lazy">
                                <div class="treatment-card__rating" aria-label="${card.rating.toFixed(1)} out of 10 rating">
                                    <div>
                                        <span class="treatment-card__score">${card.rating.toFixed(1)}</span>
                                        <span class="treatment-card__score-label">${ratingText}</span>
                                    </div>
                                    <div class="treatment-card__stars" aria-hidden="true">
                                        ${stars}
                                    </div>
                                </div>
                            </div>
                            <div class="treatment-card__details">
                                <h3 class="h5 mb-1" style="color:var(--hst-navy);font-family:'Poppins',sans-serif;">${card.title}</h3>
                                ${subtitle}
                                <ul class="treatment-card__list">
                                    ${features}
                                </ul>
                            </div>
                            <div class="treatment-card__cta text-lg-right">
                                <a class="btn btn-danger btn-view-plan px-4 py-2" href="${VISIT_LINK}" rel="nofollow noopener">
                                    Visit Site
                                </a>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        };

        stacks.forEach((stack) => {
            const category = stack.dataset.treatmentCategory;
            const cards = treatmentRecommendations[category];
            if (!cards) return;
            stack.innerHTML = cards.map((card, index) => renderCard(card, index, category)).join('');
        });
    };

    ready(() => {
        initMobileMenu();
        initMobileDropdown();
        initDesktopDropdown();
        initNavHighlight();
        initStickyModule();
        initModals();
        initDynamicMonthLabels();
        initTreatmentCards();
    });
})();

