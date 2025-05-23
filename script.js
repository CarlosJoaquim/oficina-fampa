  
   document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Sticky Header ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 100);
        });
    }

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Offset of 80px is a common practice for fixed headers
                const offset = 80;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            } else {
                console.warn(`Smooth scroll: Target element for ID "${targetId}" not found.`);
            }
        });
    });

    // --- Portfolio Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    // It's recommended to use a CSS class like '.hidden' for display toggling
                    // Make sure you have .hidden { display: none; } in your CSS
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Testimonials Slider ---
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.slider-dot');
    let currentTestimonialSlide = 0; // Renamed to avoid conflict with other sliders
    let autoTestimonialSlideInterval;

    function showTestimonialSlide(index) {
        if (testimonials.length === 0) return;

        // Ensure index wraps correctly (e.g., if at last slide, go to first)
        const newIndex = (index + testimonials.length) % testimonials.length;

        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[newIndex].classList.add('active');
        dots[newIndex].classList.add('active');
        currentTestimonialSlide = newIndex;
    }

    if (testimonials.length > 0) {
        showTestimonialSlide(currentTestimonialSlide); // Show initial slide

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                resetAutoTestimonialSlide(); // Reset timer on manual navigation
                showTestimonialSlide(index);
            });
        });

        function startAutoTestimonialSlide() {
            autoTestimonialSlideInterval = setInterval(() => {
                showTestimonialSlide(currentTestimonialSlide + 1);
            }, 5000);
        }

        function resetAutoTestimonialSlide() {
            clearInterval(autoTestimonialSlideInterval);
            startAutoTestimonialSlide();
        }

        startAutoTestimonialSlide(); // Start auto slide initially
    }


    // --- Back to Top Button ---
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('active', window.pageYOffset > 300);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Form Submission ---
    const contactForm = document.getElementById('form-contato');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission and page reload

            // In a real application, you'd send this data to a server using fetch API or XMLHttpRequest
            // Example using fetch:
            /*
            const formData = new FormData(contactForm);
            fetch('/your-form-submission-endpoint', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json()) // Or response.text()
            .then(data => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                contactForm.reset(); // Clear the form fields
            })
            .catch(error => {
                console.error('Erro ao enviar formulário:', error);
                alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
            });
            */

            // For this example, we'll just show an alert
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }

    // --- Text Animation on Scroll (Using Intersection Observer for efficiency) ---
    const animateElements = document.querySelectorAll('.animate-text');

    if (animateElements.length > 0) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    // Get delay from data-delay attribute, default to 0 if not set
                    const delay = parseFloat(element.getAttribute('data-delay')) || 0;

                    setTimeout(() => {
                        element.classList.add('animated');
                        observer.unobserve(element); // Stop observing once animated
                    }, delay * 1000); // Convert seconds to milliseconds
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    // --- Floating animation for service cards ---
    // IMPORTANT: This requires a CSS @keyframes float rule defined in your stylesheet.
    // Example CSS for 'float' animation:
    /*
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    */
    const serviceCards = document.querySelectorAll('.service-card'); // Use a different variable name if needed
    if (serviceCards.length > 0) {
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = `float 4s ease-in-out infinite`;
        });
    }

    // --- Project & Service Modals (Consolidated Logic) ---
    // Selects both portfolio items and service cards that have a data-project or data-service attribute
    const allModalTriggers = document.querySelectorAll('.portfolio-item[data-project], .service-card[data-service]');
    const modals = document.querySelectorAll('.modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');

    if (allModalTriggers.length > 0 && modals.length > 0) {
        allModalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                let modalId;
                if (trigger.hasAttribute('data-project')) {
                    modalId = `modal-${trigger.getAttribute('data-project')}`;
                } else if (trigger.hasAttribute('data-service')) {
                    modalId = `modal-${trigger.getAttribute('data-service')}`;
                }

                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                } else {
                    console.warn(`Modal for ID "${modalId}" not found.`);
                }
            });
        });

        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Hide all modals
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
                document.body.style.overflow = 'auto'; // Restore background scrolling
            });
        });

        // Close modal when clicking outside of it (on the modal overlay itself)
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                modals.forEach(modal => {
                    modal.style.display = 'none';
                });
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- Gallery Sliders (Supports multiple independent sliders, responsive) ---
    document.querySelectorAll('.gallery-slider').forEach(slider => {
        const track = slider.querySelector('.gallery-track');
        const slides = slider.querySelectorAll('.gallery-slide');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        // Get dots specific to this slider's parent, to prevent conflicts with other sliders
        const dotsContainer = slider.parentElement.querySelector('.gallery-dots');
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.gallery-dot') : [];

        let currentGallerySlideIndex = 0; // Unique index for each gallery slider
        let autoGallerySlideInterval; // Unique interval for each gallery slider

        // Function to get current slide width (important for responsiveness)
        const getSlideWidth = () => slides.length > 0 ? slides[0].clientWidth : 0;

        function updateGallerySlider() {
            const slideWidth = getSlideWidth();
            if (track && slideWidth > 0) {
                track.style.transform = `translateX(-${currentGallerySlideIndex * slideWidth}px)`;
            }

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentGallerySlideIndex);
            });

            // Hide/show navigation buttons and dots if there's only one slide
            if (slides.length <= 1) {
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (dotsContainer) dotsContainer.style.display = 'none';
                clearInterval(autoGallerySlideInterval); // Stop auto-slide if only one slide
            } else {
                if (prevBtn) prevBtn.style.display = 'block'; // Or 'flex', 'inline-block' based on your CSS
                if (nextBtn) nextBtn.style.display = 'block';
                if (dotsContainer) dotsContainer.style.display = 'flex'; // Or your intended display
            }
        }

        // Add event listeners only if the corresponding elements exist
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentGallerySlideIndex = (currentGallerySlideIndex - 1 + slides.length) % slides.length;
                updateGallerySlider();
                resetGalleryAutoSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentGallerySlideIndex = (currentGallerySlideIndex + 1) % slides.length;
                updateGallerySlider();
                resetGalleryAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentGallerySlideIndex = index;
                updateGallerySlider();
                resetGalleryAutoSlide();
            });
        });

        function startGalleryAutoSlide() {
            if (slides.length > 1) { // Only start auto-slide if there's more than one slide
                autoGallerySlideInterval = setInterval(() => {
                    currentGallerySlideIndex = (currentGallerySlideIndex + 1) % slides.length;
                    updateGallerySlider();
                }, 5000);
            }
        }

        function resetGalleryAutoSlide() {
            clearInterval(autoGallerySlideInterval);
            startGalleryAutoSlide();
        }

        // Initialize slider on load
        updateGallerySlider();
        startGalleryAutoSlide();

        // Handle responsiveness: re-calculate slide width and update on window resize
        window.addEventListener('resize', () => {
            updateGallerySlider();
        });
    });
});