gsap.registerPlugin(ScrollTrigger);

// 1. FAIL-SAFE LOADER
function dismissLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 800);
    }
}

// 2. DUST GENERATOR (Enhanced)
const dustContainer = document.getElementById("dust-container");
if (dustContainer) {
    for (let i = 0; i < 40; i++) {
        const d = document.createElement("div");
        d.className = "dust";
        const size = Math.random() * 3 + "px";
        d.style.width = size; d.style.height = size;
        dustContainer.appendChild(d);
        gsap.set(d, { x: Math.random() * innerWidth, y: Math.random() * innerHeight });
        gsap.to(d, {
            y: "-=100", opacity: 0,
            duration: 3 + Math.random() * 2,
            repeat: -1, ease: "linear"
        });
    }
}

// 3. SOFA & TEXT AVOIDANCE LOGIC
// This handles the sofa spinning AND pushes the text out of the way
const mainTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

mainTl
    // Step 1: Sofa spins, Left-side text moves further left to avoid collision
    .to("#animated-sofa", { rotationY: 180, scale: 1.2, x: "20%" }, "step1")
    .to(".left-text .content-box", { x: "-80px", opacity: 1 }, "step1") 
    
    // Step 2: Sofa spins back, Right-side text moves further right
    .to("#animated-sofa", { rotationY: 360, scale: 0.9, x: "-20%" }, "step2")
    .to(".right-text .content-box", { x: "80px", opacity: 1 }, "step2") 
    
    // Step 3: Final Section
    .to("#animated-sofa", { rotationY: 540, scale: 1.1, x: "0%" }, "step3")
    .to(".center-text .hero-box", { y: "-20px" }, "step3");


// 4. FIXED 3D HOVER EFFECT
const setupHovers = () => {
    const btns = document.querySelectorAll('.cta-button');
    
    btns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            
            const x = (clientX - left) / width - 0.5; 
            const y = (clientY - top) / height - 0.5;
            
            gsap.to(btn, {
                duration: 0.4,
                rotateY: x * 40, 
                rotateX: -y * 40,
                scale: 1.1,
                ease: "power2.out",
                boxShadow: `${-x * 20}px ${-y * 20}px 30px rgba(212, 175, 55, 0.3)`
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.7,
                rotateY: 0,
                rotateX: 0,
                scale: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
};

// 5. INITIALIZATION
window.addEventListener('load', () => {
    dismissLoader();
    setupHovers();
});

// Backup dismiss in case load event is slow
setTimeout(dismissLoader, 2000);
