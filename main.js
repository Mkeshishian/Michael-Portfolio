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
});