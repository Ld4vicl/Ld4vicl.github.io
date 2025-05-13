// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ======= MOBILE NAVIGATION =======
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && !event.target.closest('.hamburger') && !event.target.closest('nav')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // ======= STICKY HEADER =======
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.style.boxShadow = 'none';
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
    }

    // ======= SMOOTH SCROLLING FOR ANCHOR LINKS =======
    const navLinks = document.querySelectorAll('nav a, .btn, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                    
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ======= ACTIVE NAVIGATION LINKS ON SCROLL =======
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ======= TESTIMONIAL SLIDER =======
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Show initial slide
    if (testimonialSlides.length > 0) {
        showSlide(currentSlide);
        
        // Set up automatic sliding
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);
        
        // Click event for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // ======= INTERSECTION OBSERVER FOR ANIMATIONS =======
    const observerOptions = {
        threshold: 0.2
    };

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.getAttribute('data-aos');
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        
                        switch (animationType) {
                            case 'fade-up':
                                element.style.transform = 'translateY(0)';
                                break;
                            case 'fade-right':
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'fade-left':
                                element.style.transform = 'translateX(0)';
                                break;
                            case 'zoom-in':
                                element.style.transform = 'scale(1)';
                                break;
                        }
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Set initial styles before animation
        animatedElements.forEach(element => {
            const animationType = element.getAttribute('data-aos');
            element.style.opacity = '0';
            element.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
            
            switch (animationType) {
                case 'fade-up':
                    element.style.transform = 'translateY(30px)';
                    break;
                case 'fade-right':
                    element.style.transform = 'translateX(-30px)';
                    break;
                case 'fade-left':
                    element.style.transform = 'translateX(30px)';
                    break;
                case 'zoom-in':
                    element.style.transform = 'scale(0.9)';
                    break;
            }
            
            observer.observe(element);
        });
    }

    // ======= FORM VALIDATION AND SUBMISSION =======
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            let isValid = true;
            const formFields = bookingForm.querySelectorAll('input[required], select[required], textarea[required]');
            
            formFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Normally would use AJAX to submit the form
                // For this demo, we'll just show a success message
                const formContainer = bookingForm.parentElement;
                const submitButton = bookingForm.querySelector('.btn-submit');
                
                submitButton.disabled = true;
                submitButton.textContent = '제출 중... (Submitting...)';
                
                setTimeout(() => {
                    bookingForm.style.display = 'none';
                    
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <i class="fas fa-check-circle"></i>
                        <h3>예약 요청이 접수되었습니다!</h3>
                        <p>곧 연락드리겠습니다.</p>
                        <p>Your booking request has been received. We will contact you shortly.</p>
                    `;
                    
                    formContainer.appendChild(successMessage);
                    
                    // Reset form for future use
                    bookingForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = '예약 요청 (Book Now)';
                }, 1500);
            }
        });
        
        // Remove red border when user starts typing again
        bookingForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('focus', function() {
                this.style.borderColor = '#ddd';
            });
        });
    }

    // ======= LANGUAGE TOGGLE =======
    const langBtn = document.querySelector('.lang-btn');
    
    if (langBtn) {
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // For a real implementation, this would switch languages
            // For this demo, we'll just toggle the button text
            if (this.textContent === 'KO | EN') {
                this.textContent = 'EN | KO';
                alert('언어가 영어로 변경되었습니다. (Language changed to English)');
            } else {
                this.textContent = 'KO | EN';
                alert('언어가 한국어로 변경되었습니다. (Language changed to Korean)');
            }
        });
    }

    // ======= INITIALIZE AOS ANIMATIONS MANUALLY =======
    // Since we're manually handling animations with Intersection Observer,
    // this is just to trigger the initial animations for elements in view
    animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const animationType = element.getAttribute('data-aos');
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
                element.style.opacity = '1';
                
                switch (animationType) {
                    case 'fade-up':
                        element.style.transform = 'translateY(0)';
                        break;
                    case 'fade-right':
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'fade-left':
                        element.style.transform = 'translateX(0)';
                        break;
                    case 'zoom-in':
                        element.style.transform = 'scale(1)';
                        break;
                }
            }, delay);
        }
    });

    // ======= CREATE IMAGES FOLDER STRUCTURE =======
    // This is just a note - in a real project, you would need to add the following images:
    /*
    images/
      - hero-bg.jpg (main hero background showing Da Nang panorama)
      - marble-mountains.jpg (thumbnail for Marble Mountains)
      - my-khe-beach.jpg (thumbnail for My Khe Beach)
      - dragon-bridge.jpg (thumbnail for Dragon Bridge)
      - ba-na-hills.jpg (thumbnail for Ba Na Hills)
      - hoi-an.jpg (thumbnail for Hoi An)
      - son-tra-peninsula.jpg (thumbnail for Son Tra Peninsula)
      - sedan.jpg (luxury sedan)
      - suv.jpg (premium SUV)
      - van.jpg (luxury van)
      - bus.jpg (tour bus)
      - gallery1.jpg through gallery8.jpg (beautiful Da Nang scenery photos)
      - testimonial-bg.jpg (background for testimonials section)
      - cta-bg.jpg (background for call-to-action section)
    */

});

// ======= PRELOADER =======
window.addEventListener('load', function() {
    // Add preloader animation if needed
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}); 