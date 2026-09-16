/* =========================================================
   CODE 1 — NAVIGATION + HERO EXPERIENCE CONTROLLER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NAVIGATION
       ===================================================== */

    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navWrapper = document.querySelector(".nav-menu-wrapper");

    const moreToggle = document.querySelector(".more-toggle");
    const moreDropdown = document.querySelector(".more-dropdown");

    const socialToggle = document.querySelector(".social-toggle");
    const socialDropdown = document.querySelector(".social-dropdown");


    /* MOBILE MENU */

    if (mobileToggle && navWrapper) {

        mobileToggle.addEventListener("click", () => {

            const isOpen = navWrapper.classList.toggle("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            mobileToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

    }


    /* MORE DROPDOWN */

    if (moreToggle && moreDropdown) {

        moreToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                moreDropdown.classList.toggle("open");

            moreToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            /* Close Social */

            if (socialDropdown && socialToggle) {

                socialDropdown.classList.remove("open");

                socialToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* SOCIAL DROPDOWN */

    if (socialToggle && socialDropdown) {

        socialToggle.addEventListener("click", (event) => {

            event.preventDefault();
            event.stopPropagation();

            const isOpen =
                socialDropdown.classList.toggle("open");

            socialToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            /* Close More */

            if (moreDropdown && moreToggle) {

                moreDropdown.classList.remove("open");

                moreToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* CLOSE DROPDOWNS WHEN CLICKING OUTSIDE */

    document.addEventListener("click", (event) => {

        if (
            moreDropdown &&
            !moreDropdown.contains(event.target)
        ) {

            moreDropdown.classList.remove("open");

            if (moreToggle) {
                moreToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }


        if (
            socialDropdown &&
            !socialDropdown.contains(event.target)
        ) {

            socialDropdown.classList.remove("open");

            if (socialToggle) {
                socialToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });


    /* CLOSE MOBILE NAV AFTER NORMAL LINK CLICK */

    if (navWrapper) {

        const navLinks =
            navWrapper.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                /*
                 * Don't close the navigation when
                 * clicking inside More/Social menus.
                 */

                if (
                    window.innerWidth <= 950 &&
                    !link.closest(".social-menu") &&
                    !link.closest(".more-menu")
                ) {

                    navWrapper.classList.remove("open");

                    if (mobileToggle) {

                        mobileToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        mobileToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );

                    }

                }

            });

        });

    }



    /* =====================================================
       2. HERO EXPERIENCE
       ===================================================== */

    const hero =
        document.querySelector(".hero");

    if (!hero) return;


    const intro =
        hero.querySelector(".hero-intro-background");

    const welcome =
        hero.querySelector(".hero-welcome-content");

    const slides =
        [...hero.querySelectorAll(".hero-video-slide")];

    const videos =
        [...hero.querySelectorAll(".hero-video")];

    const backdrops =
        [...hero.querySelectorAll(".hero-video-backdrop")];

    const dots =
        [...hero.querySelectorAll(".hero-dot")];


    if (
        !slides.length ||
        slides.length !== videos.length
    ) {
        return;
    }


    /* =====================================================
       HERO SETTINGS
       ===================================================== */

    const INTRO_DURATION = 5000;

    const FADE_DURATION = 900;

    let currentSlide = 0;

    let experienceStarted = false;

    let transitionTimer = null;


    /* =====================================================
       SAFE VIDEO PLAY
       ===================================================== */

    const safePlay = (video) => {

        if (!video) return;

        const promise = video.play();

        if (promise !== undefined) {

            promise.catch(() => {});

        }

    };


    /* =====================================================
       RESET VIDEO
       ===================================================== */

    const resetVideo = (video) => {

        if (!video) return;

        video.pause();

        try {

            video.currentTime = 0;

        } catch (error) {}

    };


    /* =====================================================
       PRELOAD NEXT VIDEO
       ===================================================== */

    const preloadVideo = (index) => {

        const video = videos[index];

        if (!video) return;

        video.preload = "metadata";

        if (
            video.readyState ===
            HTMLMediaElement.HAVE_NOTHING
        ) {

            video.load();

        }

    };


    /* =====================================================
       UPDATE DOTS
       ===================================================== */

    const updateDots = (index) => {

        dots.forEach((dot, dotIndex) => {

            const active =
                dotIndex === index;

            dot.classList.toggle(
                "active",
                active
            );

            dot.setAttribute(
                "aria-current",
                String(active)
            );

        });

    };


    /* =====================================================
       SHOW VIDEO SLIDE
       ===================================================== */

    const showVideoSlide = (
        index,
        restart = true
    ) => {

        if (
            index < 0 ||
            index >= slides.length
        ) {
            return;
        }


        window.clearTimeout(
            transitionTimer
        );


        const oldIndex =
            currentSlide;

        const foreground =
            videos[index];

        const backdrop =
            backdrops[index];


        if (restart) {

            resetVideo(foreground);

            /*
             * Only reset the backdrop if
             * we actually have one.
             */

            resetVideo(backdrop);

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


        currentSlide = index;

        updateDots(index);


        /*
         * Prepare the NEXT video,
         * not every video at once.
         */

        preloadVideo(
            (index + 1) % videos.length
        );


        requestAnimationFrame(() => {

            /*
             * Keep backdrop synchronized
             * with foreground video.
             */

            if (backdrop) {

                try {

                    backdrop.currentTime =
                        foreground.currentTime;

                } catch (error) {}

                safePlay(backdrop);

            }


            safePlay(foreground);

        });


        /*
         * Stop previous video after
         * the fade has completed.
         */

        if (oldIndex !== index) {

            transitionTimer =
                window.setTimeout(() => {

                    resetVideo(
                        videos[oldIndex]
                    );

                    if (backdrops[oldIndex]) {

                        resetVideo(
                            backdrops[oldIndex]
                        );

                    }

                }, FADE_DURATION + 50);

        }

    };


    /* =====================================================
       INITIAL VIDEO STATE
       ===================================================== */

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });


    videos.forEach((video, index) => {

        video.muted = true;

        video.playsInline = true;

        /*
         * Only the first video is prepared
         * aggressively.
         */

        video.preload =
            index === 0
                ? "auto"
                : "metadata";

        video.pause();

    });


    /*
     * Backdrops are kept lightweight.
     */

    backdrops.forEach((backdrop, index) => {

        backdrop.muted = true;

        backdrop.playsInline = true;

        backdrop.preload =
            index === 0
                ? "metadata"
                : "none";

        backdrop.pause();

    });


    /* =====================================================
       PREPARE FIRST VIDEO
       ===================================================== */

    preloadVideo(0);


    /* =====================================================
       HERO EXPERIENCE START
       ===================================================== */

    window.setTimeout(() => {

        experienceStarted = true;


        /*
         * Hide welcome screen.
         */

        intro?.classList.add(
            "hide-intro"
        );

        welcome?.classList.add(
            "is-hidden"
        );


        /*
         * Start with FIRST video.
         */

        showVideoSlide(0, true);

    }, INTRO_DURATION);


    /* =====================================================
       VIDEO END → NEXT VIDEO
       ===================================================== */

    videos.forEach((video, index) => {

        video.addEventListener(
            "ended",
            () => {

                if (!experienceStarted) {
                    return;
                }


                const nextIndex =
                    index + 1;


                /*
                 * If this was the LAST video,
                 * return to the WELCOME screen
                 * instead of jumping directly
                 * to the first video.
                 */

                if (
                    nextIndex >=
                    videos.length
                ) {

                    currentSlide =
                        videos.length - 1;


                    /* Stop all videos */

                    videos.forEach(
                        resetVideo
                    );

                    backdrops.forEach(
                        resetVideo
                    );


                    /*
                     * Show welcome image again.
                     */

                    intro?.classList.remove(
                        "hide-intro"
                    );

                    welcome?.classList.remove(
                        "is-hidden"
                    );


                    /*
                     * Wait 5 seconds before
                     * starting the first video.
                     */

                    window.setTimeout(() => {

                        showVideoSlide(
                            0,
                            true
                        );

                        intro?.classList.add(
                            "hide-intro"
                        );

                        welcome?.classList.add(
                            "is-hidden"
                        );

                    }, INTRO_DURATION);


                    return;

                }


                /*
                 * Otherwise continue normally.
                 */

                showVideoSlide(
                    nextIndex,
                    true
                );

            }
        );

    });


    /* =====================================================
       HERO DOT CONTROLS
       ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                if (
                    experienceStarted &&
                    index !== currentSlide
                ) {

                    showVideoSlide(
                        index,
                        true
                    );

                }

            }
        );

    });

});