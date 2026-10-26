// ============================================
// Angel Arts & Culinary Academy - Main JavaScript
// ============================================

const siteConfig = window.ANGEL_ARTS_CONFIG || {};
const CONTACT_EMAIL = siteConfig.contactEmail || 'info@angelartsandculinaryacademy.com';
const WHATSAPP_NUMBER = siteConfig.whatsappNumber || '917871370663';
const WEB3FORMS_ACCESS_KEY = siteConfig.web3formsAccessKey || 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY';

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
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImageIndex = 0;
const galleryImages = [];

// Collect all gallery items
if (galleryItems.length > 0) {
    galleryItems.forEach((item) => {
        const mediaElement = item.querySelector('img, video');
        const caption = item.querySelector('.gallery-caption');

        if (mediaElement) {
            galleryImages.push({
                src: mediaElement.getAttribute('src'),
                alt: mediaElement.getAttribute('alt') || mediaElement.getAttribute('aria-label') || '',
                type: mediaElement.tagName.toLowerCase(),
                caption: caption ? caption.textContent.trim() : mediaElement.getAttribute('alt') || mediaElement.getAttribute('aria-label') || '',
                element: item
            });

            item.addEventListener('click', () => {
                const visibleGalleryImages = getVisibleGalleryImages();
                const clickedImageIndex = visibleGalleryImages.findIndex(image => image.element === item);

                if (clickedImageIndex !== -1) {
                    openLightbox(clickedImageIndex);
                }
            });
        }
    });
}

function getVisibleGalleryImages() {
    return galleryImages.filter(image => image.element.style.display !== 'none');
}

function openLightbox(index) {
    const visibleGalleryImages = getVisibleGalleryImages();
    currentImageIndex = index;
    const image = visibleGalleryImages[index];
    
    if (image) {
        if (image.type === 'video') {
            lightboxImage.style.display = 'none';
            lightboxImage.src = '';
            lightboxVideo.style.display = 'block';
            lightboxVideo.src = image.src;
            lightboxVideo.setAttribute('aria-label', image.alt || image.caption);
        } else {
            lightboxVideo.pause();
            lightboxVideo.style.display = 'none';
            lightboxVideo.removeAttribute('src');
            lightboxImage.style.display = 'block';
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || image.caption;
        }
        lightboxCaption.textContent = image.caption;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.style.display = 'none';
        lightboxVideo.removeAttribute('src');
    }
    document.body.style.overflow = '';
}

function showNextImage() {
    const visibleGalleryImages = getVisibleGalleryImages();
    currentImageIndex = (currentImageIndex + 1) % visibleGalleryImages.length;
    openLightbox(currentImageIndex);
}

function showPrevImage() {
    const visibleGalleryImages = getVisibleGalleryImages();
    currentImageIndex = (currentImageIndex - 1 + visibleGalleryImages.length) % visibleGalleryImages.length;
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

function openMailto(subject, lines) {
    const body = lines.filter(Boolean).join('\n');
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openWhatsAppMessage(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener');
}

function buildEnrollmentLines(data) {
    return [
        'Hello Angel Arts Academy,',
        '',
        'I would like to enquire about a course.',
        '',
        `Name: ${data.name || ''}`,
        `Phone: ${data.phone || ''}`,
        `Email: ${data.email || ''}`,
        `Course: ${data.course || ''}`,
        `Preferred Date: ${data.date || ''}`,
        '',
        'Please share the next steps and batch details.'
    ];
}

function buildContactLines(data) {
    return [
        'Hello Angel Arts Academy,',
        '',
        'I am sending an enquiry from the website.',
        '',
        `Name: ${data.name || ''}`,
        `Phone: ${data.phone || ''}`,
        `Email: ${data.email || ''}`,
        `Course: ${data.course || ''}`,
        `Preferred Date: ${data.date || ''}`,
        '',
        'Message:',
        data.message || ''
    ];
}

function linesToText(lines) {
    return lines.filter(Boolean).join('\n');
}

function getFormMode(event) {
    return event.submitter?.dataset?.submitMode || 'email';
}

async function sendViaWeb3Forms(subject, data, messageLines) {
    const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject,
        from_name: data.name || 'Website Enquiry',
        email: data.email || CONTACT_EMAIL,
        phone: data.phone || '',
        course: data.course || '',
        preferred_date: data.date || '',
        message: linesToText(messageLines),
        botcheck: '',
        replyto: data.email || CONTACT_EMAIL
    };

    const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || 'Web3Forms submission failed.');
    }

    return result;
}

// Enrollment Form Submission
if (enrollmentForm) {
    enrollmentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(enrollmentForm);
        const data = Object.fromEntries(formData);
        const subject = `Course Enquiry - ${data.course || 'Angel Arts Academy'}`;
        const messageLines = buildEnrollmentLines(data);
        const submitMode = getFormMode(e);

        try {
            if (submitMode === 'whatsapp') {
                openWhatsAppMessage(linesToText(messageLines));
                showToast('WhatsApp is opening with your enquiry message.');
            } else if (WEB3FORMS_ACCESS_KEY !== 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
                await sendViaWeb3Forms(subject, data, messageLines);
                showToast('Your enquiry was sent successfully.');
            } else {
                openMailto(subject, messageLines);
                showToast('Add your Web3Forms access key to enable direct form delivery. Email is opening for now.');
            }

            enrollmentForm.reset();
            if (enrollmentModal) {
                enrollmentModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        } catch (error) {
            console.error(error);
            openMailto(subject, messageLines);
            showToast('Direct form delivery failed, so your email app is opening as a fallback.');
        }
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        const subject = `Website Enquiry - ${data.name || 'Angel Arts Website'}`;
        const messageLines = buildContactLines(data);
        const submitMode = getFormMode(e);

        try {
            if (submitMode === 'whatsapp') {
                openWhatsAppMessage(linesToText(messageLines));
                showToast('WhatsApp is opening with your enquiry message.');
            } else if (WEB3FORMS_ACCESS_KEY !== 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
                await sendViaWeb3Forms(subject, data, messageLines);
                showToast('Your enquiry was sent successfully.');
            } else {
                openMailto(subject, messageLines);
                showToast('Add your Web3Forms access key to enable direct form delivery. Email is opening for now.');
            }

            contactForm.reset();
        } catch (error) {
            console.error(error);
            openMailto(subject, messageLines);
            showToast('Direct form delivery failed, so your email app is opening as a fallback.');
        }
    });
}

// Newsletter Form Submission
const newsletterForms = document.querySelectorAll('#newsletterForm');

newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;

        try {
            if (WEB3FORMS_ACCESS_KEY !== 'REPLACE_WITH_WEB3FORMS_ACCESS_KEY') {
                await sendViaWeb3Forms(
                    'Website Contact Request',
                    { name: 'Website Visitor', email },
                    [
                        'Hello Angel Arts Academy,',
                        '',
                        'Please add me to your updates or contact me back.',
                        '',
                        `Email: ${email}`
                    ]
                );
                showToast('Your request was sent successfully.');
            } else {
                openMailto(
                    'Website Contact Request',
                    [
                        'Hello Angel Arts Academy,',
                        '',
                        'Please add me to your updates or contact me back.',
                        '',
                        `Email: ${email}`
                    ]
                );
                showToast('Add your Web3Forms access key to enable direct form delivery. Email is opening for now.');
            }

            form.reset();
        } catch (error) {
            console.error(error);
            openMailto(
                'Website Contact Request',
                [
                    'Hello Angel Arts Academy,',
                    '',
                    'Please add me to your updates or contact me back.',
                    '',
                    `Email: ${email}`
                ]
            );
            showToast('Direct form delivery failed, so your email app is opening as a fallback.');
        }
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

console.log('Angel Arts & Culinary Academy website loaded successfully!');
