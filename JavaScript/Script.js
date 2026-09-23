/* =========================================================
   HERO CINEMATIC LOOP
   WELCOME → VIDEO 1 → VIDEO 2 → WELCOME
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const closeDropdowns = (except = null) => {
        document.querySelectorAll(
            ".more-dropdown.open, .social-dropdown.open"
        ).forEach(dropdown => {
            if (dropdown === except) return;

            dropdown.classList.remove("open");
            dropdown.querySelector("button")?.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    };

    document.querySelectorAll(
        ".more-dropdown, .social-dropdown"
    ).forEach(dropdown => {
        const toggle = dropdown.querySelector("button");

        if (!toggle) return;

        toggle.addEventListener("click", event => {
            event.stopPropagation();
            const willOpen = !dropdown.classList.contains("open");

            closeDropdowns(dropdown);
            dropdown.classList.toggle("open", willOpen);
            toggle.setAttribute("aria-expanded", String(willOpen));
        });
    });

    document.addEventListener("click", () => closeDropdowns());

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeDropdowns();
    });

    const navLinks = document.querySelector(".nav-links");
    const navActions = document.querySelector(".nav-actions");
    const navScrollButton = document.querySelector(".nav-scroll-indicator");

    if (navLinks && navActions && navScrollButton) {
        let navOffset = 0;
        const step = 170;
        const maxShift = 360;
        let resetMode = false;

        const updateArrow = () => {
            const arrow = navScrollButton.querySelector("span");
            if (!arrow) return;

            arrow.textContent = resetMode ? "‹" : "›";
        };

        updateArrow();

        navScrollButton.addEventListener("click", () => {
            if (resetMode) {
                navOffset = 0;
                resetMode = false;
            } else {
                navOffset = Math.max(navOffset - step, -maxShift);
                if (navOffset <= -maxShift + 10) {
                    resetMode = true;
                }
            }

            navLinks.style.transform = `translateX(${navOffset}px)`;
            navActions.style.transform = `translateX(${navOffset}px)`;
            navScrollButton.style.transform = `translateX(${navOffset}px)`;
            updateArrow();
        });
    }

    const hero = document.querySelector(".hero");

    if (!hero) return;


    /* =====================================================
       HERO ELEMENTS
       ===================================================== */

    const intro =
        hero.querySelector(".hero-intro-background");

    const welcome =
        hero.querySelector(".hero-welcome-content");

    const slides = Array.from(
        hero.querySelectorAll(".hero-video-slide")
    );

    const videos = Array.from(
        hero.querySelectorAll(".hero-video")
    );

    const dots = Array.from(
        hero.querySelectorAll(".hero-dot")
    );


    if (!slides.length || !videos.length) {
        console.warn("Hero videos were not found.");
        return;
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const WELCOME_TIME = 5000;

    const TRANSITION_TIME = 1000;

    let currentSlide = -1;

    let welcomeTimer = null;

    let transitionTimer = null;


    /* =====================================================
       CREATE MOBILE BLURRED BACKDROPS
       ===================================================== */

    slides.forEach((slide, index) => {

        const original =
            videos[index];

        if (!original) return;


        /*
         * Do not create duplicate backdrops.
         */

        if (
            slide.querySelector(
                ".hero-video-backdrop"
            )
        ) {
            return;
        }


        const backdrop =
            original.cloneNode(true);


        /*
         * IMPORTANT:
         * The backdrop does NOT use .hero-video
         * so it will not be included in the
         * main video control system.
         */

        backdrop.classList.remove(
            "hero-video"
        );

        backdrop.classList.add(
            "hero-video-backdrop"
        );


        backdrop.removeAttribute("id");

        backdrop.setAttribute(
            "aria-hidden",
            "true"
        );

        backdrop.muted = true;

        backdrop.playsInline = true;

        backdrop.preload = "auto";


        /*
         * Put blurred copy behind
         * the original video.
         */

        slide.insertBefore(
            backdrop,
            original
        );


        /*
         * Start loading immediately.
         */

        try {
            backdrop.load();
        } catch (error) {}

    });


    /* =====================================================
       SAFE VIDEO PLAY
       ===================================================== */

    function playVideo(video) {

        if (!video) return;


        video.muted = true;

        video.playsInline = true;


        const promise =
            video.play();


        if (
            promise !== undefined
        ) {

            promise.catch(() => {

                /*
                 * Autoplay can be blocked by
                 * some browsers.
                 *
                 * Because the videos are muted,
                 * modern browsers normally allow them.
                 */

            });

        }

    }


    /* =====================================================
       STOP VIDEO
       ===================================================== */

    function stopVideo(video) {

        if (!video) return;


        video.pause();


        try {
            video.currentTime = 0;
        }

        catch (error) {}

    }


    /* =====================================================
       UPDATE DOTS
       ===================================================== */

    function updateDots(index) {

        dots.forEach((dot, i) => {

            const active =
                i === index;


            dot.classList.toggle(
                "active",
                active
            );


            dot.setAttribute(
                "aria-current",
                active
                    ? "true"
                    : "false"
            );

        });

    }


    /* =====================================================
       HIDE ALL VIDEOS
       ===================================================== */

    function hideAllVideos() {

        slides.forEach(slide => {

            slide.classList.remove(
                "active"
            );

        });


        videos.forEach(video => {

            stopVideo(video);

        });


        /*
         * Stop blurred mobile copies too.
         */

        slides.forEach(slide => {

            const backdrop =
                slide.querySelector(
                    ".hero-video-backdrop"
                );

            if (backdrop) {
                stopVideo(backdrop);
            }

        });

    }


    /* =====================================================
       SHOW VIDEO
       ===================================================== */

    function showVideo(index) {

        if (
            index < 0 ||
            index >= videos.length
        ) {
            return;
        }


        clearTimeout(
            transitionTimer
        );

        clearTimeout(
            welcomeTimer
        );


        /*
         * Hide welcome immediately.
         */

        if (intro) {

            intro.classList.add(
                "hide-intro"
            );

        }


        if (welcome) {

            welcome.classList.add(
                "is-hidden"
            );

            welcome.classList.add(
                "hide"
            );

        }


        /*
         * Stop every other video.
         */

        videos.forEach(
            (video, i) => {

                if (i !== index) {

                    stopVideo(
                        video
                    );

                }

            }
        );


        /*
         * Stop other blurred videos.
         */

        slides.forEach(
            (slide, i) => {

                if (i !== index) {

                    const backdrop =
                        slide.querySelector(
                            ".hero-video-backdrop"
                        );

                    if (backdrop) {
                        stopVideo(
                            backdrop
                        );
                    }

                }

            }
        );


        /*
         * Remove active state
         * from all slides.
         */

        slides.forEach(slide => {

            slide.classList.remove(
                "active"
            );

        });


        const slide =
            slides[index];

        const video =
            videos[index];

        const backdrop =
            slide.querySelector(
                ".hero-video-backdrop"
            );


        /*
         * Activate selected slide.
         */

        slide.classList.add(
            "active"
        );


        currentSlide =
            index;


        updateDots(index);


        /*
         * Always restart the video.
         */

        try {

            video.currentTime = 0;

        }

        catch (error) {}


        if (backdrop) {

            try {

                backdrop.currentTime = 0;

            }

            catch (error) {}

        }


        /*
         * Start both layers together.
         */

        requestAnimationFrame(() => {

            playVideo(video);

            /*
             * The blurred backdrop only
             * matters visually on mobile.
             */

            if (backdrop) {
                playVideo(backdrop);
            }

        });

    }


    /* =====================================================
       SHOW WELCOME
       ===================================================== */

    function showWelcome() {

        clearTimeout(
            welcomeTimer
        );

        clearTimeout(
            transitionTimer
        );


        /*
         * Stop videos.
         */

        hideAllVideos();


        /*
         * Show welcome background.
         */

        if (intro) {

            intro.classList.remove(
                "hide"
            );

            intro.classList.remove(
                "hide-intro"
            );

        }


        /*
         * Show welcome text.
         */

        if (welcome) {

            welcome.classList.remove(
                "hide"
            );

            welcome.classList.remove(
                "is-hidden"
            );


            welcome.style.opacity =
                "";

            welcome.style.visibility =
                "";

            welcome.style.transform =
                "";

        }


        /*
         * After 5 seconds:
         *
         * WELCOME
         * ↓
         * VIDEO 1
         *
         * There is NO artificial
         * extra delay here.
         */

        welcomeTimer =
            setTimeout(() => {

                showVideo(0);

            }, WELCOME_TIME);

    }


    /* =====================================================
       PRELOAD BOTH VIDEOS
       ===================================================== */

    videos.forEach(
        (video, index) => {

            video.muted = true;

            video.playsInline = true;

            video.setAttribute(
                "playsinline",
                ""
            );

            video.setAttribute(
                "muted",
                ""
            );


            /*
             * Load both videos early.
             * This is important for smooth
             * transition from video 1 → video 2.
             */

            video.preload = "auto";


            try {
                video.load();
            }

            catch (error) {}


            stopVideo(video);

        }
    );


    /* =====================================================
       VIDEO END EVENTS
       ===================================================== */

    videos.forEach(
        (video, index) => {

            video.addEventListener(
                "ended",
                () => {


                    /*
                     * VIDEO 1 → VIDEO 2
                     */

                    if (
                        index <
                        videos.length - 1
                    ) {

                        showVideo(
                            index + 1
                        );

                        return;

                    }


                    /*
                     * LAST VIDEO → WELCOME
                     *
                     * The loop starts again.
                     */

                    showWelcome();

                }
            );

        }
    );


    /* =====================================================
       DOT CONTROLS
       ===================================================== */

    dots.forEach(
        (dot, index) => {

            dot.addEventListener(
                "click",
                () => {

                    showVideo(
                        index
                    );

                }
            );

        }
    );


    /* =====================================================
       START HERO
       ===================================================== */

    showWelcome();

});
