function applyHorizontalScroll() {
    gsap.registerPlugin(ScrollTrigger);
    let sections = gsap.utils.toArray(".panel");
    gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".container",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + (sections.length - 1) * window.innerWidth,
        },
    });
}

// Check the window width and apply the effect if it's over 800px
if (window.innerWidth > 800) {
    applyHorizontalScroll();
}

// Lenis initialization (always active)
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.to(".panel img", {
    opacity: 1,
    x: -90,
    rotation: 57,
    duration: 5,
    delay: 5,
    scrollTrigger: {
        trigger: ".panel img",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect", {
    opacity: 1,
    x: 70,
    duration: 5,
    scrollTrigger: {
        trigger: ".text-effect",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect-p", {
    opacity: 1,
    duration: 5,
    scrollTrigger: {
        trigger: ".text-effect-p",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect-mac", {
    opacity: 1,
    x: 90,
    duration: 5,
    delay: 5,
    scrollTrigger: {
        trigger: ".text-effect-mac",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect-p-mac", {
    opacity: 1,
    duration: 5,
    delay: 5,
    scrollTrigger: {
        trigger: ".text-effect-p-mac",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect-watch", {
    opacity: 1,
    x: 70,
    duration: 5,
    delay: 5,
    scrollTrigger: {
        trigger: ".text-effect-watch",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});

gsap.to(".text-effect-p-watch", {
    opacity: 1,
    duration: 5,
    delay: 5,
    scrollTrigger: {
        trigger: ".text-effect-p-watch",
        scrub: 1.5,
        start: "top center",
        end: "center center"
    },

});


let frameCount = 147,
    urls = new Array(frameCount).fill().map((o, i) => `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(i + 1).toString().padStart(4, '0')}.jpg`);

imageSequence({
    urls, // Array of image URLs
    canvas: "#image-sequence", // <canvas> object to draw images to
    //clear: true, // only necessary if your images contain transparency
    //onUpdate: (index, image) => console.log("drew image index", index, ", image:", image),
    scrollTrigger: {
        start: "top top",   // start at the very top
        end: "bottom center", // entire page
        scrub: true, // important!
    }
});




function imageSequence(config) {
    let playhead = { frame: 0 },
        canvas = gsap.utils.toArray(config.canvas)[0] || console.warn("canvas not defined"),
        ctx = canvas.getContext("2d"),
        curFrame = -1,
        onUpdate = config.onUpdate,
        images,
        updateImage = function () {
            let frame = Math.round(playhead.frame);
            if (frame !== curFrame) { // only draw if necessary
                config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(images[Math.round(playhead.frame)], 0, 0);
                curFrame = frame;
                onUpdate && onUpdate.call(this, frame, images[frame]);
            }
        };
    images = config.urls.map((url, i) => {
        let img = new Image();
        img.src = url;
        i || (img.onload = updateImage);
        return img;
    });
    return gsap.to(playhead, {
        frame: images.length - 1,
        ease: "none",
        onUpdate: updateImage,
        duration: images.length / (config.fps || 30),
        paused: !!config.paused,
        scrollTrigger: config.scrollTrigger
    });
}

