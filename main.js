// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// GSAP Animation for the name and subtitle
window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    
    // Animate the name with bounce effect
    tl.fromTo("#name",
        {
            y: -500,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "bounce.out"
        }
    );

    // Fade in the subtitle
    tl.fromTo("#subtitle",
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        },
        "-=0.5"
    );

    // Modal Functionality
    const contactModal = document.getElementById('contactModal');
    const modalContent = document.getElementById('modal-content');
    const closeModalButton = document.getElementById('closeModalButton');
    const openModalButtons = document.querySelectorAll('.open-modal-button');
    const planInput = document.getElementById('planInput');
    const heroButtons = document.getElementById('hero-buttons');

    function openModal(planName) {
        planInput.value = planName;
        contactModal.classList.remove('hidden');
        setTimeout(() => {
            contactModal.classList.add('opacity-100');
            modalContent.classList.remove('opacity-0', 'scale-95');
            modalContent.classList.add('opacity-100', 'scale-100');
        }, 10); // Delay for smooth transition
    }

    function closeModal() {
        modalContent.classList.remove('opacity-100', 'scale-100');
        modalContent.classList.add('opacity-0', 'scale-95');
        contactModal.classList.remove('opacity-100');
        setTimeout(() => {
            contactModal.classList.add('hidden');
        }, 300); // Match transition duration
    }

    openModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.dataset.plan;
            openModal(planName);
        });
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', function(event) {
            if (event.target === contactModal) { // Clicked outside the modal content
                closeModal();
            }
        });
    }

    // Check for form submission success on pricing page
    if (window.location.pathname.endsWith('pricing.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('form_submitted') && urlParams.get('form_submitted') === 'true') {
            if (contactModal && !contactModal.classList.contains('hidden')) {
                closeModal(); // Close modal if it's open
            }
            // Clear the query parameter from URL without reloading
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
            
            // Show success alert (can be replaced with a more integrated message later)
            alert('Thank you for your inquiry! I will get back to you soon.');
        }
    }
    
    // Animate hero buttons after subtitle (Only on index.html)
    if (heroButtons) { // heroButtons will only exist on index.html
        gsap.to("#hero-buttons", { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.8, 
            delay: 1.0, // Delay after subtitle
            ease: "power3.out"
        });
    }
});