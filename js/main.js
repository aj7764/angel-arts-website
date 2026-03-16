// ============================================
// Angel Arts & Culinary Academy - Main JavaScript
// ============================================

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(59, 47, 47, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(59, 47, 47, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Course Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

if (filterButtons.length > 0 && courseCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            courseCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gallery Filtering
const galleryFilterButtons = document.querySelectorAll('.gallery-filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item-full');

if (galleryFilterButtons.length > 0 && galleryItems.length > 0) {
    galleryFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            galleryFilterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lightbox for Gallery
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery items
if (galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        const placeholder = item.querySelector('.gallery-image-placeholder');
        const caption = item.querySelector('.gallery-caption');
        
        if (placeholder && caption) {
            galleryImages.push({
                src: placeholder.textContent.trim(),
                caption: caption.textContent.trim(),
                element: item
            });
            
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const image = galleryImages[index];
    
    if (image) {
        // For now, we'll use placeholder text. In production, replace with actual image URLs
        lightboxImage.src = '#'; // Replace with actual image URL
        lightboxImage.alt = image.caption;
        lightboxCaption.textContent = image.caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentImageIndex);
}

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxNext) {
    lightboxNext.addEventListener('click', showNextImage);
}

if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrevImage);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    }
});

// Enrollment Modal
const enrollmentModal = document.getElementById('enrollmentModal');
const enrollmentForm = document.getElementById('enrollmentForm');
const modalClose = document.getElementById('modalClose');
const enrollButtons = document.querySelectorAll('.enroll-btn');

// Open modal when enroll button is clicked
enrollButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const courseName = button.getAttribute('data-course');
        if (enrollmentModal) {
            enrollmentModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Pre-fill course if available
            const courseSelect = document.getElementById('enrollCourse');
            if (courseSelect && courseName) {
                // Try to match course name to option value
                const options = courseSelect.querySelectorAll('option');
                options.forEach(option => {
                    if (option.textContent.includes(courseName) || courseName.includes(option.value)) {
                        courseSelect.value = option.value;
                    }
                });
            }
        }
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (enrollmentModal) {
            enrollmentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

if (enrollmentModal) {
    enrollmentModal.addEventListener('click', (e) => {
        if (e.target === enrollmentModal) {
            enrollmentModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Form Submissions
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 4000);
    }
}

// Enrollment Form Submission
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        
        // In production, send this to your backend
        console.log('Enrollment data:', data);
        
        // Simulate API call
        setTimeout(() => {
            showToast('Thanks! Check your inbox for booking details.');
            enrollmentForm.reset();
            if (enrollmentModal) {
                enrollmentModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 500);
        
        // TODO: Replace with actual API call
        // try {
        //     const response = await fetch('/api/enroll', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     const result = await response.json();
        //     showToast('Thanks! Check your inbox for booking details.');
        //     enrollmentForm.reset();
        //     enrollmentModal.classList.remove('active');
        // } catch (error) {
        //     showToast('Something went wrong. Please try again or call us directly.');
        // }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // In production, send this to your backend
        console.log('Contact data:', data);
        
        // Simulate API call
        setTimeout(() => {
            showToast('Thanks! We\'ll get back to you within 24 hours.');
            contactForm.reset();
        }, 500);
        
        // TODO: Replace with actual API call
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     const result = await response.json();
        //     showToast('Thanks! We\'ll get back to you within 24 hours.');
        //     contactForm.reset();
        // } catch (error) {
        //     showToast('Something went wrong. Please try again or call us directly.');
        // }
    });
}

// Newsletter Form Submission
const newsletterForms = document.querySelectorAll('#newsletterForm');

newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        // In production, send this to your email service (Mailchimp, etc.)
        console.log('Newsletter subscription:', email);
        
        // Simulate API call
        setTimeout(() => {
            showToast('Thanks for subscribing! Check your email for the 10% discount code.');
            form.reset();
        }, 500);
        
        // TODO: Replace with actual API call (Mailchimp, etc.)
        // try {
        //     const response = await fetch('/api/newsletter', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ email })
        //     });
        //     const result = await response.json();
        //     showToast('Thanks for subscribing! Check your email for the 10% discount code.');
        //     form.reset();
        // } catch (error) {
        //     showToast('Something went wrong. Please try again.');
        // }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.benefit-card, .course-card, .testimonial-card, .gallery-item, .mission-card, .cert-card');
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Set minimum date for date inputs to today
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Initialize Google Analytics (replace with your tracking ID)
// gtag('config', 'GA_TRACKING_ID');

// Initialize Facebook Pixel (replace with your pixel ID)
// fbq('init', 'FACEBOOK_PIXEL_ID');
// fbq('track', 'PageView');

// Import Google reviews helper (opens instructions)
const importBtn = document.getElementById('importGoogleReviews');
if (importBtn) {
    importBtn.addEventListener('click', () => {
        alert('To import live Google Reviews we need a Google Places API key and the Place ID for Angel Arts & Culinary Academy.\n\nIf you prefer, upload screenshots of the reviews or paste the review text and we will add them manually.\n\nReply here to provide the API key & Place ID and I can add a fetch routine that displays live reviews.');
    });
}

const importBtnTestimonials = document.getElementById('importGoogleReviewsTestimonials');
if (importBtnTestimonials) {
    importBtnTestimonials.addEventListener('click', () => {
        alert('Provide a Google Places API key & Place ID to import reviews, or upload screenshots of reviews and I will add them to the page for you.');
    });
}

console.log('Angel Arts & Culinary Academy website loaded successfully!');

