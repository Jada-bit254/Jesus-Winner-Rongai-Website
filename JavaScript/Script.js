document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const intro = hero.querySelector(".hero-intro-background");
    const welcome = hero.querySelector(".hero-welcome-content");

    const slides = [...hero.querySelectorAll(".hero-video-slide")];
    const videos = [...hero.querySelectorAll(".hero-video")];
    const dots = [...hero.querySelectorAll(".hero-dot")];

    if (!slides.length || !videos.length) return;

    const fadeDuration = 650;

    let currentSlide = 0;
    let experienceStarted = false;
    let pauseTimer;


    /* =====================================================
       SAFE VIDEO PLAY
    ===================================================== */

    const safePlay = (video) => {
        if (!video) return;

        video.play().catch(() => {
            // Browser may block autoplay.
        });
    };


    /* =====================================================
       RESET VIDEO
    ===================================================== */

    const resetVideo = (video) => {
        if (!video) return;

        video.pause();

        try {
            video.currentTime = 0;
        } catch (_) {}
    };


    /* =====================================================
       UPDATE DOTS
    ===================================================== */

    const updateControls = (index) => {

        dots.forEach((dot, dotIndex) => {

            const active = dotIndex === index;

            dot.classList.toggle("active", active);

            dot.setAttribute(
                "aria-current",
                String(active)
            );

        });

    };


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    const showSlide = (
        index,
        { restart = true } = {}
    ) => {

        if (
            index < 0 ||
            index >= slides.length
        ) {
            return;
        }

        window.clearTimeout(pauseTimer);

        const oldIndex = currentSlide;

        const video = videos[index];

        const changingSlide =
            index !== oldIndex;


        if (restart) {
            resetVideo(video);
        }


        /* Activate correct slide */

        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === index
                );

            }
        );


        updateControls(index);

        currentSlide = index;


        /* Start video after slide becomes active */

        requestAnimationFrame(() => {
            safePlay(video);
        });


        /* Stop previous video after transition */

        if (changingSlide) {

            pauseTimer = window.setTimeout(() => {

                resetVideo(
                    videos[oldIndex]
                );

            }, fadeDuration + 50);

        }

    };


    /* =====================================================
       INITIAL VIDEO SETTINGS
    ===================================================== */

    videos.forEach((video, index) => {

        video.muted = true;

        video.playsInline = true;

        /*
         * Only load the first video immediately.
         * The second video waits until it is needed.
         */

        video.preload =
            index === 0
                ? "metadata"
                : "none";

        video.pause();

    });


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });


    /* =====================================================
       WELCOME SCREEN
       5 SECONDS
    ===================================================== */

    window.setTimeout(() => {

        experienceStarted = true;

        showSlide(0);

        intro?.classList.add("hide-intro");

        welcome?.classList.add("is-hidden");

    }, 5000);


    /* =====================================================
       WHEN VIDEO FINISHES
       MOVE TO NEXT VIDEO
    ===================================================== */

    videos.forEach((video, index) => {

        video.addEventListener(
            "ended",
            () => {

                showSlide(
                    (index + 1) % videos.length
                );

            }
        );

    });


    /* =====================================================
       HERO DOTS
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                if (
                    experienceStarted &&
                    index !== currentSlide
                ) {

                    showSlide(index);

                }

            }
        );

    });

});