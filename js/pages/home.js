// home.js
// ==========================================
// Andhra Kraistava Keerthanalu
// Home Page
// ==========================================

import { supabase } from "../supabase.js";
import { initThree } from "../three/index.js";
import { setPageHeader } from "../components/page-header.js";
import "../components/latest-updates.js";

/* ==========================================
   INITIALIZE HOME PAGE
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    initThree();

    setPageHeader(
        "ఆంధ్ర క్రైస్తవ కీర్తనలు",
        "Telugu & English Christian Hymns"
    );

    await loadFeaturedHymns();
await loadFeaturedAuthors();

initializeCounters();
await loadHomeSlidesAndInitializeCarousel();

});


/* ==========================================
   FEATURED HYMNS
========================================== */

async function loadFeaturedHymns() {

    const container = document.getElementById("featuredHymnsGrid");

    if (!container) return;

    try {

        const { data, error } = await supabase
            .from("hymns")
            .select(`
                id,
                number,
                title_telugu,
                title_english,
                author_id,
                authors (
                    id,
                    name
                )
            `)
            .order("number", { ascending: true })
            .limit(3);

        if (error) throw error;

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-state">
                    No hymns available yet.
                </p>
            `;

            return;
        }

        container.innerHTML = data.map(hymn => {

            const authorName =
                hymn.authors?.name || "Unknown Author";

            return `
                <article class="card">

                    <span class="card-number">
                        Hymn ${escapeHTML(hymn.number)}
                    </span>

                    <h3>
                        ${escapeHTML(
                            hymn.title_telugu || "Untitled Hymn"
                        )}
                    </h3>

                    <p>
                        ${escapeHTML(
                            hymn.title_english || ""
                        )}
                    </p>

                    <small>
                        ${escapeHTML(authorName)}
                    </small>

                    <a
                        href="hymn.html?id=${encodeURIComponent(hymn.number)}"
                        class="author-link"
                    >
                        View Hymn →
                    </a>

                </article>
            `;

        }).join("");

    } catch (error) {

        console.error(
            "[Home] Failed to load featured hymns:",
            error
        );

        container.innerHTML = `
            <p class="empty-state">
                Unable to load hymns right now.
            </p>
        `;
    }
}


/* ==========================================
   FEATURED AUTHORS
========================================== */

async function loadFeaturedAuthors() {

    const container =
        document.getElementById("featuredAuthorsGrid");

    if (!container) return;

    try {

        const { data, error } = await supabase
            .from("authors")
            .select(`
                id,
                name,
                photo_url,
                bio
            `)
            .order("id", { ascending: true })
            .limit(4);

        if (error) throw error;

        if (!data || data.length === 0) {

            container.innerHTML = `
                <p class="empty-state">
                    No writers available yet.
                </p>
            `;

            return;
        }

        container.innerHTML = data.map(author => {

            const name =
                author.name || "Unknown Hymn Writer";

            const initials =
                getInitials(name);

            const description =
                author.bio ||
                "Information about this hymn writer is being collected and preserved in the archive.";

            const avatar = author.photo_url
                ? `
                    <div class="author-avatar">
                        <img
                            src="${escapeAttribute(author.photo_url)}"
                            alt="${escapeAttribute(name)}"
                            loading="lazy"
                        >
                    </div>
                  `
                : `
                    <div class="author-avatar author-avatar-empty">
                        ${escapeHTML(initials)}
                    </div>
                  `;

            return `
                <article class="author-card">

                    ${avatar}

                    <h3>
                        ${escapeHTML(name)}
                    </h3>

                    <p class="author-role">
                        Hymn Writer
                    </p>

                    <p class="author-description">
                        ${escapeHTML(description)}
                    </p>

                    <a
                        href="author.html?id=${encodeURIComponent(author.id)}"
                        class="author-link"
                    >
                        View Profile →
                    </a>

                </article>
            `;

        }).join("");

    } catch (error) {

        console.error(
            "[Home] Failed to load authors:",
            error
        );

        container.innerHTML = `
            <p class="empty-state">
                Unable to load writers right now.
            </p>
        `;
    }
}


/* ==========================================
   INITIALS
========================================== */

function getInitials(name) {

    const words = name
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (!words.length) return "?";

    if (words.length === 3) {

        return words[0]
            .substring(0, 3)
            .toUpperCase();

    }

    return (
        words[0].charAt(0)
    ).toUpperCase();
}


/* ==========================================
   HTML SAFETY
========================================== */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

    return escapeHTML(value);
}


/* ==========================================
   COUNTER ANIMATION
========================================== */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".stat-card h2");

    if (!counters.length) return;

    const observer =
        new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const counter = entry.target;

                const target =
                    parseInt(counter.textContent);

                if (isNaN(target)) return;

                let current = 0;

                const increment =
                    Math.ceil(target / 80);

                const timer =
                    setInterval(() => {

                        current += increment;

                        if (current >= target) {

                            current = target;

                            clearInterval(timer);
                        }

                        counter.textContent =
                            `${current}+`;

                    }, 20);

                observer.unobserve(counter);
            });

        });

    counters.forEach(counter =>
        observer.observe(counter)
    );
}


/* ==========================================
   HOME HERO CAROUSEL
========================================== */
/* =========================================================
   HOME SLIDES FROM SUPABASE
   ========================================================= */

async function loadHomeSlidesAndInitializeCarousel() {

    const track = document.getElementById("homeHeroTrack");

    if (!track) {
        console.warn("[Home Slides] Carousel track not found.");
        return;
    }

    try {

        /* -----------------------------------------------------
           LOAD ACTIVE SLIDES FROM DATABASE
        ----------------------------------------------------- */

        const { data, error } = await supabase
            .from("home_slides")
            .select(`
                id,
                image_path,
                image_name,
                slide_order,
                kicker,
                title,
                description,
                button_text,
                button_url,
                is_active
            `)
            .eq("is_active", true)
            .order("slide_order", {
                ascending: true
            });

        if (error) {
            throw error;
        }


        /* -----------------------------------------------------
           REMOVE OLD HARD-CODED IMAGE SLIDES
           KEEP THE ORIGINAL INTRO SLIDE
        ----------------------------------------------------- */

        track
            .querySelectorAll(".hero-slide:not(.hero-slide--intro)")
            .forEach(slide => slide.remove());


        /* -----------------------------------------------------
           NO DATABASE SLIDES
        ----------------------------------------------------- */

        if (!data || data.length === 0) {

            console.info(
                "[Home Slides] No active slides found."
            );

            initializeHomeHeroCarousel();

            return;
        }


        /* -----------------------------------------------------
           CREATE PUBLIC IMAGE URLS
        ----------------------------------------------------- */

        const slides = data
            .filter(slide => slide.image_path)
            .map(slide => {

                const {
                    data: publicUrlData
                } = supabase.storage
                    .from("home-slides")
                    .getPublicUrl(slide.image_path);

                return {
                    ...slide,
                    publicUrl:
                        publicUrlData?.publicUrl || ""
                };

            })
            .filter(slide => slide.publicUrl);


        /* -----------------------------------------------------
           INSERT DATABASE SLIDES
        ----------------------------------------------------- */

        slides.forEach((slide, index) => {

            const article =
                document.createElement("article");

            article.className =
                "hero-slide hero-slide--image";

            if (index === 0) {
                article.classList.add("is-active");
            }

            article.setAttribute(
                "aria-hidden",
                index === 0 ? "false" : "true"
            );

            article.dataset.slideImage =
                slide.publicUrl;


            /* -------------------------------------------------
               IMAGE
            ------------------------------------------------- */

            const image =
                document.createElement("div");

            image.className =
                "hero-slide-image";

            image.style.backgroundImage =
                `url("${slide.publicUrl}")`;


            /* -------------------------------------------------
               OVERLAY
            ------------------------------------------------- */

            const overlay =
                document.createElement("div");

            overlay.className =
                "hero-slide-overlay";


            /* -------------------------------------------------
               CONTAINER
            ------------------------------------------------- */

            const container =
                document.createElement("div");

            container.className =
                "container hero-slide-container";


            /* -------------------------------------------------
               CONTENT
            ------------------------------------------------- */

            const copy =
                document.createElement("div");

            copy.className =
                "hero-slide-copy";


            /* KICKER */

            if (slide.kicker) {

                const kicker =
                    document.createElement("span");

                kicker.className =
                    "hero-slide-kicker";

                kicker.textContent =
                    slide.kicker;

                copy.appendChild(kicker);
            }


            /* TITLE */

            if (slide.title) {

                const title =
                    document.createElement("h2");

                title.className =
                    "hero-slide-title";

                title.textContent =
                    slide.title;

                copy.appendChild(title);
            }


            /* DESCRIPTION */

            if (slide.description) {

                const description =
                    document.createElement("p");

                description.className =
                    "hero-slide-description";

                description.textContent =
                    slide.description;

                copy.appendChild(description);
            }


            /* -------------------------------------------------
               BUTTON
            ------------------------------------------------- */

            if (
                slide.button_text &&
                slide.button_url
            ) {

                const actions =
                    document.createElement("div");

                actions.className =
                    "hero-slide-actions";


                const button =
                    document.createElement("a");

                button.className =
                    "hero-btn hero-btn-primary";

                button.href =
                    slide.button_url;

                const buttonText =
                    document.createElement("span");

                buttonText.textContent =
                    slide.button_text;


                const icon =
                    document.createElement("i");

                icon.className =
                    "fa-solid fa-arrow-right";

                icon.setAttribute(
                    "aria-hidden",
                    "true"
                );


                button.appendChild(buttonText);
                button.appendChild(icon);

                actions.appendChild(button);

                copy.appendChild(actions);
            }


            container.appendChild(copy);

            article.appendChild(image);
            article.appendChild(overlay);
            article.appendChild(container);

            track.appendChild(article);
        });


        /* -----------------------------------------------------
           INITIALIZE CAROUSEL
        ----------------------------------------------------- */

        initializeHomeHeroCarousel();


        console.info(
            `[Home Slides] Loaded ${slides.length} active slide(s).`
        );


    } catch (error) {

        console.error(
            "[Home Slides] Failed to load slides:",
            error
        );

        /*
         * Keep the original intro slide working even if
         * the database/storage request fails.
         */

        initializeHomeHeroCarousel();
    }
}


/* =========================================================
   HOME HERO CAROUSEL
   ========================================================= */
/* =========================================================
   HOME HERO CAROUSEL
   INFINITE / SEAMLESS LOOP
   ========================================================= */

function initializeHomeHeroCarousel() {

    const carousel =
        document.querySelector(".home-hero-carousel");

    const track =
        document.getElementById("homeHeroTrack");

    const dotsBox =
        document.getElementById("heroCarouselDots");

    const prev =
        document.getElementById("heroCarouselPrev");

    const next =
        document.getElementById("heroCarouselNext");

    const progress =
        document.getElementById("heroCarouselProgress");


    if (
        !carousel ||
        !track ||
        !dotsBox ||
        !prev ||
        !next
    ) {
        return;
    }


    /*
    ---------------------------------------------------------
    ORIGINAL SLIDES
    ---------------------------------------------------------
    */

    const originalSlides = [
        ...track.querySelectorAll(".hero-slide")
    ];


    if (!originalSlides.length) {
        return;
    }


    /*
    ---------------------------------------------------------
    PREVENT DOUBLE INITIALIZATION
    ---------------------------------------------------------
    */

    if (carousel.dataset.carouselInitialized === "true") {
        return;
    }

    carousel.dataset.carouselInitialized = "true";


    /*
    ---------------------------------------------------------
    REDUCED MOTION
    ---------------------------------------------------------
    */

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
    ---------------------------------------------------------
    SETTINGS
    ---------------------------------------------------------
    */

    const delay = 6500;

    let timer = null;

    let paused = false;

    let touchX = null;

    let touchY = null;


    /*
    ---------------------------------------------------------
    SINGLE SLIDE
    ---------------------------------------------------------
    */

    if (originalSlides.length === 1) {

        originalSlides[0].classList.add("is-active");

        originalSlides[0].setAttribute(
            "aria-hidden",
            "false"
        );

        return;
    }


    /*
    ---------------------------------------------------------
    CREATE SEAMLESS CLONES
    ---------------------------------------------------------

    We create:

        [LAST CLONE]
        [1]
        [2]
        [3]
        [4]
        [FIRST CLONE]

    The real slides are always between the clones.

    This allows:

        4 → FIRST CLONE

    to look like a normal forward movement.

    Then, after the animation finishes,
    FIRST CLONE is silently replaced with REAL SLIDE 1.
    ---------------------------------------------------------
    */

    const firstClone =
        originalSlides[0].cloneNode(true);

    const lastClone =
        originalSlides[
            originalSlides.length - 1
        ].cloneNode(true);


    firstClone.classList.add(
        "hero-slide--clone"
    );

    lastClone.classList.add(
        "hero-slide--clone"
    );


    firstClone.setAttribute(
        "aria-hidden",
        "true"
    );

    lastClone.setAttribute(
        "aria-hidden",
        "true"
    );


    /*
    Put last clone before the real slides.
    */

    track.insertBefore(
        lastClone,
        originalSlides[0]
    );


    /*
    Put first clone after the real slides.
    */

    track.appendChild(
        firstClone
    );


    /*
    ---------------------------------------------------------
    ALL PHYSICAL SLIDES
    ---------------------------------------------------------
    */

    const slides = [
        ...track.querySelectorAll(".hero-slide")
    ];


    /*
    ---------------------------------------------------------
    INITIAL PHYSICAL POSITION
    ---------------------------------------------------------

    Because slide 0 is the LAST CLONE,
    real slide 1 is physical index 1.
    ---------------------------------------------------------
    */

    let physicalIndex = 1;


    /*
    Logical index:

        0 = slide 1
        1 = slide 2
        2 = slide 3
        ...
    */

    let logicalIndex = 0;


    /*
    ---------------------------------------------------------
    IMAGE PRELOADING
    ---------------------------------------------------------
    */

    slides.forEach(slide => {

        const url =
            slide.dataset.slideImage;

        const image =
            slide.querySelector(
                ".hero-slide-image"
            );


        if (!url || !image) {
            return;
        }


        const preloader =
            new Image();


        preloader.onload = () => {

            image.style.backgroundImage =
                `url("${url.replace(
                    /"/g,
                    '\\"'
                )}")`;


            slide.classList.add(
                "has-image"
            );
        };


        preloader.onerror = () => {

            console.warn(
                "[Home Slides] Image failed:",
                url
            );

        };


        preloader.src = url;

    });


    /*
    ---------------------------------------------------------
    DOTS
    ---------------------------------------------------------

    IMPORTANT:
    Only create dots for REAL slides.
    Clones do not get dots.
    ---------------------------------------------------------
    */

    dotsBox.innerHTML =
        originalSlides.map((_, i) => {

            return `
                <button
                    type="button"
                    class="hero-carousel-dot${i === 0 ? " is-active" : ""}"
                    data-index="${i}"
                    aria-label="Go to slide ${i + 1}"
                    aria-current="${i === 0 ? "true" : "false"}"
                ></button>
            `;

        }).join("");


    const dots = [
        ...dotsBox.querySelectorAll(
            ".hero-carousel-dot"
        )
    ];


    /*
    ---------------------------------------------------------
    UPDATE ACCESSIBILITY + DOTS
    ---------------------------------------------------------
    */

    function updateUI() {

        slides.forEach((slide, i) => {

            const active =
                i === physicalIndex;


            slide.classList.toggle(
                "is-active",
                active
            );


            slide.setAttribute(
                "aria-hidden",
                String(!active)
            );


            slide
                .querySelectorAll("a")
                .forEach(link => {

                    if (active) {

                        link.removeAttribute(
                            "tabindex"
                        );

                    } else {

                        link.setAttribute(
                            "tabindex",
                            "-1"
                        );

                    }

                });

        });


        dots.forEach((dot, i) => {

            const active =
                i === logicalIndex;


            dot.classList.toggle(
                "is-active",
                active
            );


            dot.setAttribute(
                "aria-current",
                String(active)
            );

        });

    }


    /*
    ---------------------------------------------------------
    PROGRESS BAR
    ---------------------------------------------------------
    */

    function resetProgress() {

        if (!progress) {
            return;
        }


        progress.style.transition =
            "none";


        progress.style.width =
            "0%";


        void progress.offsetWidth;


        if (
            !reduceMotion &&
            !paused
        ) {

            progress.style.transition =
                `width ${delay}ms linear`;


            progress.style.width =
                "100%";

        }

    }


    /*
    ---------------------------------------------------------
    MOVE TO PHYSICAL SLIDE
    ---------------------------------------------------------
    */

    function moveToPhysical(
        targetIndex,
        animate = true
    ) {

        physicalIndex =
            targetIndex;


        if (animate) {

            track.style.transition =
                "transform .75s cubic-bezier(.65,0,.2,1)";

        } else {

            track.style.transition =
                "none";

        }


        track.style.transform =
            `translate3d(-${physicalIndex * 100}%, 0, 0)`;


        updateUI();

    }


    /*
    ---------------------------------------------------------
    SHOW LOGICAL SLIDE
    ---------------------------------------------------------

    Used by:

        • dots
        • normal navigation
    ---------------------------------------------------------
    */

    function showSlide(
        targetLogicalIndex,
        animate = true
    ) {

        logicalIndex =
            (
                targetLogicalIndex +
                originalSlides.length
            ) %
            originalSlides.length;


        /*
        Real slide position is logical index + 1
        because of the last clone at position 0.
        */

        moveToPhysical(
            logicalIndex + 1,
            animate
        );


        resetProgress();

    }


    /*
    ---------------------------------------------------------
    NEXT SLIDE
    ---------------------------------------------------------
    */

    function goNext() {

        physicalIndex++;

        logicalIndex =
            (
                logicalIndex + 1
            ) %
            originalSlides.length;


        track.style.transition =
            "transform .75s cubic-bezier(.65,0,.2,1)";


        track.style.transform =
            `translate3d(-${physicalIndex * 100}%, 0, 0)`;


        updateUI();

        resetProgress();

    }


    /*
    ---------------------------------------------------------
    PREVIOUS SLIDE
    ---------------------------------------------------------
    */

    function goPrevious() {

        physicalIndex--;

        logicalIndex =
            (
                logicalIndex -
                1 +
                originalSlides.length
            ) %
            originalSlides.length;


        track.style.transition =
            "transform .75s cubic-bezier(.65,0,.2,1)";


        track.style.transform =
            `translate3d(-${physicalIndex * 100}%, 0, 0)`;


        updateUI();

        resetProgress();

    }


    /*
    ---------------------------------------------------------
    SEAMLESS LOOP RESET
    ---------------------------------------------------------

    Example:

        REAL SLIDE 4
              ↓
        FIRST CLONE

    Animation finishes.

    Then we instantly move from:

        FIRST CLONE

    to:

        REAL SLIDE 1

    with transition disabled.

    Because both slides contain the same content,
    the user sees NO jump.
    ---------------------------------------------------------
    */

    track.addEventListener(
        "transitionend",
        event => {

            if (
                event.propertyName !==
                "transform"
            ) {
                return;
            }


            /*
            FIRST CLONE

            Physical index:

                originalSlides.length + 1
            */

            if (
                physicalIndex ===
                originalSlides.length + 1
            ) {

                physicalIndex = 1;

                track.style.transition =
                    "none";


                track.style.transform =
                    "translate3d(-100%, 0, 0)";


                /*
                Force browser to apply the
                transition-free position.
                */

                void track.offsetWidth;


                updateUI();

                return;
            }


            /*
            LAST CLONE

            Physical index:

                0
            */

            if (physicalIndex === 0) {

                physicalIndex =
                    originalSlides.length;


                track.style.transition =
                    "none";


                track.style.transform =
                    `translate3d(-${
                        originalSlides.length * 100
                    }%, 0, 0)`;


                void track.offsetWidth;


                updateUI();

            }

        }
    );


    /*
    ---------------------------------------------------------
    STOP TIMER
    ---------------------------------------------------------
    */

    function stop() {

        clearTimeout(timer);

        timer = null;

    }


    /*
    ---------------------------------------------------------
    START AUTOPLAY
    ---------------------------------------------------------
    */

    function start() {

        stop();


        if (
            reduceMotion ||
            paused ||
            originalSlides.length < 2
        ) {
            return;
        }


        timer =
            setTimeout(() => {

                goNext();

                start();

            }, delay);

    }


    /*
    ---------------------------------------------------------
    NEXT BUTTON
    ---------------------------------------------------------
    */

    next.addEventListener(
        "click",
        () => {

            goNext();

            start();

        }
    );


    /*
    ---------------------------------------------------------
    PREVIOUS BUTTON
    ---------------------------------------------------------
    */

    prev.addEventListener(
        "click",
        () => {

            goPrevious();

            start();

        }
    );


    /*
    ---------------------------------------------------------
    DOT NAVIGATION
    ---------------------------------------------------------
    */

    dots.forEach(dot => {

        dot.addEventListener(
            "click",
            () => {

                const target =
                    Number(
                        dot.dataset.index
                    );


                showSlide(
                    target
                );


                start();

            }
        );

    });


    /*
    ---------------------------------------------------------
    MOUSE PAUSE
    ---------------------------------------------------------
    */

    carousel.addEventListener(
        "mouseenter",
        () => {

            paused = true;

            stop();


            if (progress) {

                progress.style.transition =
                    "none";

            }

        }
    );


    carousel.addEventListener(
        "mouseleave",
        () => {

            paused = false;

            resetProgress();

            start();

        }
    );


    /*
    ---------------------------------------------------------
    KEYBOARD FOCUS
    ---------------------------------------------------------
    */

    carousel.addEventListener(
        "focusin",
        () => {

            paused = true;

            stop();

        }
    );


    carousel.addEventListener(
        "focusout",
        event => {

            if (
                !carousel.contains(
                    event.relatedTarget
                )
            ) {

                paused = false;

                resetProgress();

                start();

            }

        }
    );


    /*
    ---------------------------------------------------------
    TOUCH / SWIPE
    ---------------------------------------------------------
    */

    carousel.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];


            touchX =
                touch.clientX;

            touchY =
                touch.clientY;


            paused = true;

            stop();

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        event => {

            if (
                touchX === null ||
                touchY === null
            ) {
                return;
            }


            const touch =
                event.changedTouches[0];


            const dx =
                touch.clientX -
                touchX;


            const dy =
                touch.clientY -
                touchY;


            if (
                Math.abs(dx) > 50 &&
                Math.abs(dx) >
                Math.abs(dy)
            ) {

                if (dx < 0) {

                    goNext();

                } else {

                    goPrevious();

                }

            }


            touchX = null;

            touchY = null;


            paused = false;

            start();

        },
        {
            passive: true
        }
    );


    /*
    ---------------------------------------------------------
    KEYBOARD ARROWS
    ---------------------------------------------------------
    */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !carousel.contains(
                    document.activeElement
                )
            ) {
                return;
            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                goPrevious();

                start();

            }


            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                goNext();

                start();

            }

        }
    );


    /*
    ---------------------------------------------------------
    TAB VISIBILITY
    ---------------------------------------------------------
    */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stop();

            } else if (!paused) {

                start();

            }

        }
    );


    /*
    ---------------------------------------------------------
    INITIAL POSITION
    ---------------------------------------------------------

    Start on REAL SLIDE 1.

    Physical position = 1
    ---------------------------------------------------------
    */

    physicalIndex = 1;

    logicalIndex = 0;


    track.style.transition =
        "none";


    track.style.transform =
        "translate3d(-100%, 0, 0)";


    updateUI();

    resetProgress();

    start();

}