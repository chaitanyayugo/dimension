gsap.registerPlugin(ScrollTrigger);

// 1. ADVANCED LOADER
window.addEventListener("load", () => {
    const tl = gsap.timeline();
    tl.to(".loader-bar", { width: "100%", duration: 0.8 })
      .to("#loader", { opacity: 0, duration: 1, ease: "power4.inOut" })
      .from(".navbar", { y: -50, opacity: 0, duration: 1 }, "-=0.5")
      .set("#loader", { display: "none" });
});

// 2. DUST PARTICLES (Optimized)
const createDust = () => {
    const container = document.getElementById("dust-container");
    for (let i = 0; i < 50; i++) {
        const d = document.createElement("div");
        d.className = "dust";
        const size = Math.random() * 2 + "px";
        gsap.set(d, {
            width: size, height: size,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });
        container.appendChild(d);
        
        gsap.to(d, {
            y: "-=" + (Math.random() * 200 + 100),
            opacity: 0,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            ease: "none",
            delay: Math.random() * 5
        });
    }
};
createDust();

// Replace the old Sofa Master Timeline with this refined logic
const sofaTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
    }
});

// We define "Dodges" based on panel alignment
// Section 1: Center (Hero)
sofaTl.to("#animated-sofa", { rotationY: 45, x: "0%", scale: 1, duration: 1 })

// Section 2: Left Text -> Sofa Dodges Right
.to("#animated-sofa", { rotationY: 120, x: "25%", scale: 1.1, duration: 1 })

// Section 3: Right Text -> Sofa Dodges Left
.to("#animated-sofa", { rotationY: 180, x: "-25%", scale: 1.2, duration: 1 })

// Section 4: Left Text -> Sofa Dodges Right
.to("#animated-sofa", { rotationY: 240, x: "25%", scale: 1.1, duration: 1 })

// Section 5: Right Text -> Sofa Dodges Left
.to("#animated-sofa", { rotationY: 300, x: "-25%", scale: 1.5, duration: 1 })

// Section 6: Left Text -> Sofa Dodges Right
.to("#animated-sofa", { rotationY: 360, x: "25%", scale: 1.1, duration: 1 })

// Section 7: Right Text -> Sofa Dodges Left
.to("#animated-sofa", { rotationY: 450, x: "-25%", scale: 1.2, duration: 1 })

// Section 8: Center (CTA) -> Return to Center
.to("#animated-sofa", { rotationY: 720, x: "0%", scale: 1, duration: 1 });

// Build the choreography
sofaTl
    // Section 2: Rotate and shift right for left text
    .to("#animated-sofa", { rotationY: 45, x: "20%", scale: 1.1 })
    // Section 3: Rotate further and shift left for right text
    .to("#animated-sofa", { rotationY: 180, x: "-20%", scale: 1.2 })
    // Section 4: Top view tilt
    .to("#animated-sofa", { rotationX: 20, rotationY: 270, x: "20%", scale: 1.1 })
    // Section 5: Zoom in on detail
    .to("#animated-sofa", { rotationX: 0, rotationY: 320, x: "-25%", scale: 1.5 })
    // Section 6: Return to center spin
    .to("#animated-sofa", { rotationY: 450, x: "20%", scale: 1.1 })
    // Section 7: Shift for bespoke
    .to("#animated-sofa", { rotationY: 540, x: "-20%", scale: 1.2 })
    // Section 8: Final reveal center
    .to("#animated-sofa", { rotationY: 720, x: "0%", scale: 1 });

// 4. TEXT REVEAL ANIMATIONS
gsap.utils.toArray(".reveal").forEach((box) => {
    gsap.from(box, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: box,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
        }
    });
});

// 5. PROGRESS BAR
gsap.to(".progress-bar", {
    width: "100%",
    ease: "none",
    scrollTrigger: { scrub: 0.3 }
});
