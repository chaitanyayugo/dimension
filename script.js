gsap.registerPlugin(ScrollTrigger);

// 1. FAIL-SAFE LOADER
function dismissLoader() {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 800);
    }
}

// 2. DUST GENERATOR
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

// 3. MATERIAL SWITCHER (New Meaningful Feature)
// This listens for clicks on your color swatches to change the sofa "material"
const setupConfigurator = () => {
    const swatches = document.querySelectorAll('.swatch');
    const sofa = document.querySelector('#animated-sofa');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // UI Update: Move the 'active' border
            const currentActive = document.querySelector('.swatch.active');
            if (currentActive) currentActive.classList.remove('active');
            swatch.classList.add('active');

            // Logic: Get the color name and apply a filter
            const color = swatch.getAttribute('data-color');
            
            if (color === 'royal-gold') {
                gsap.to(sofa, { filter: "sepia(0.6) saturate(1.8) brightness(0.9)", duration: 1 });
            } else if (color === 'deep-velvet') {
                gsap.to(sofa, { filter: "hue-rotate(280deg) saturate(1.2) brightness(0.7)", duration: 1 });
            } else {
                gsap.to(sofa, { filter: "none", duration: 1 }); // Default
            }
        });
    });
};

// 4. SOFA & TEXT AVOIDANCE LOGIC (Enhanced)
const mainTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5
    }
});

mainTl
    // Step 1: Push Sofa Right, Move Text Left & Fade it slightly for focus
    .addLabel("step1")
    .to("#animated-sofa", { rotationY: 180, scale: 1.2, x: "25%" }, "step1")
    .to(".left-text .content-box", { x: "-100px", opacity: 0.3 }, "step1") 
    
    // Step 2: Push Sofa Left, Move Text Right
    .addLabel("step2")
    .to("#animated-sofa", { rotationY: 360, scale: 0.9, x: "-25%" }, "step2")
    .to(".right-text .content-box", { x: "100px", opacity: 0.3 }, "step2") 
    
    // Step 3: Return to center for the Final Reveal
    .addLabel("step3")
    .to("#animated-sofa", { rotationY: 540, scale: 1.1, x: "0%" }, "step3")
    .to(".center-text .hero-box", { y: "-20px", opacity: 1 }, "step3");


// 5. FIXED 3D HOVER EFFECT
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
                duration: 0.7, rotateY: 0, rotateX: 0, scale: 1,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
};

// 6. INITIALIZATION
window.addEventListener('load', () => {
    dismissLoader();
    setupHovers();
    setupConfigurator(); // Merged: Now your color switcher starts with the page
});

setTimeout(dismissLoader, 2000);
