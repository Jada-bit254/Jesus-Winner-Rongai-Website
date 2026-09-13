/* =========================================================
   JESUS WINNER MINISTRY RONGAI
   NAVIGATION CONTROLLER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const mobileToggle =
        document.querySelector(".mobile-menu-toggle");

    const navWrapper =
        document.querySelector(".nav-menu-wrapper");

    const moreToggle =
        document.querySelector(".more-toggle");

    const moreDropdown =
        document.querySelector(".more-dropdown");

    const socialToggle =
        document.querySelector(".social-toggle");

    const socialDropdown =
        document.querySelector(".social-dropdown");


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (mobileToggle && navWrapper) {

        mobileToggle.addEventListener("click", function () {

            const isOpen =
                navWrapper.classList.toggle("open");

            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            mobileToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });

    }


    /* =====================================================
       MORE DROPDOWN
       ===================================================== */

    if (moreToggle && moreDropdown) {

        moreToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                moreDropdown.classList.toggle("open");

            moreToggle.setAttribute(
                "aria-expanded",
                isOpen
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


    /* =====================================================
       SOCIAL DROPDOWN
       ===================================================== */

    if (socialToggle && socialDropdown) {

        socialToggle.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    socialDropdown.classList.toggle("open");

                socialToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );


                /* Close More */

                if (moreDropdown && moreToggle) {

                    moreDropdown.classList.remove("open");

                    moreToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            }
        );

    }


    /* =====================================================
       CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

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

        }
    );


    /* =====================================================
       CLOSE MOBILE MENU AFTER SELECTING A PAGE
       ===================================================== */

    if (navWrapper) {

        const navLinks =
            navWrapper.querySelectorAll(
                "a"
            );

        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (
                        window.innerWidth <= 950 &&
                        !link.closest(".social-menu") &&
                        !link.closest(".more-menu")
                    ) {

                        navWrapper.classList.remove(
                            "open"
                        );

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

                }
            );

        });

    }

});

/* =========================================================
   HERO VIDEO SLIDER
   JESUS WINNER MINISTRY RONGAI
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const intro = hero.querySelector(".hero-intro-background");
    const welcome = hero.querySelector(".hero-welcome-content");
    const slides = [...hero.querySelectorAll(".hero-video-slide")];
    const videos = [...hero.querySelectorAll(".hero-video")];
    const backdrops = [...hero.querySelectorAll(".hero-video-backdrop")];
    const dots = [...hero.querySelectorAll(".hero-dot")];
    const phoneView = window.matchMedia("(max-width: 600px)");

    if (!slides.length || slides.length !== videos.length) return;

    const fadeDuration = 650;
    let currentSlide = 0;
    let experienceStarted = false;
    let pauseTimer;
    let syncTimer;

    const safePlay = (media) => media?.play().catch(() => {});

    const resetMedia = (media) => {
        if (!media) return;

        media.pause();

        try {
            media.currentTime = 0;
        } catch (_) {}
    };

    const warmSlide = (index) => {
        [videos[index], backdrops[index]]
            .filter(Boolean)
            .forEach((media) => {
                media.preload = "auto";

                if (media.readyState === media.HAVE_NOTHING) {
                    media.load();
                }
            });
    };

    const stopSync = () => {
        window.clearInterval(syncTimer);
        syncTimer = undefined;
    };

    const synchronizeBackdrop = (index) => {
        stopSync();

        const foreground = videos[index];
        const backdrop = backdrops[index];

        if (!phoneView.matches || !foreground || !backdrop) return;

        syncTimer = window.setInterval(() => {
            if (
                index !== currentSlide ||
                foreground.paused ||
                backdrop.paused
            ) {
                return;
            }

            if (
                Math.abs(
                    foreground.currentTime - backdrop.currentTime
                ) > 0.22
            ) {
                backdrop.currentTime = foreground.currentTime;
            }
        }, 900);
    };

    const updateControls = (index) => {
        dots.forEach((dot, dotIndex) => {
            const active = dotIndex === index;

            dot.classList.toggle("active", active);
            dot.setAttribute("aria-current", String(active));
        });
    };

    const showSlide = (index, { restart = true } = {}) => {
        if (index < 0 || index >= slides.length) return;

        window.clearTimeout(pauseTimer);

        const oldIndex = currentSlide;
        const foreground = videos[index];
        const backdrop = backdrops[index];
        const changingSlide = index !== oldIndex;

        if (restart) {
            resetMedia(foreground);
            resetMedia(backdrop);
        }

        slides.forEach((slide, slideIndex) => {
            slide.classList.toggle(
                "active",
                slideIndex === index
            );
        });

        updateControls(index);
        currentSlide = index;

        warmSlide((index + 1) % slides.length);

        requestAnimationFrame(() => {
            if (phoneView.matches && backdrop) {
                backdrop.currentTime = foreground.currentTime;
                safePlay(backdrop);
            }

            safePlay(foreground);
            synchronizeBackdrop(index);
        });

        if (changingSlide) {
            pauseTimer = window.setTimeout(() => {
                resetMedia(videos[oldIndex]);
                resetMedia(backdrops[oldIndex]);
            }, fadeDuration + 40);
        }
    };

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    videos.forEach((video) => {
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.pause();
    });

    backdrops.forEach((backdrop) => {
        backdrop.muted = true;
        backdrop.playsInline = true;
        backdrop.preload = "auto";
        backdrop.pause();
    });

    warmSlide(0);

    window.setTimeout(() => {
        experienceStarted = true;

        showSlide(0);

        intro?.classList.add("hide-intro");
        welcome?.classList.add("is-hidden");
    }, 5000);

    videos.forEach((video, index) => {
        video.addEventListener("ended", () => {
            showSlide((index + 1) % videos.length);
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            if (experienceStarted && index !== currentSlide) {
                showSlide(index);
            }
        });
    });

    phoneView.addEventListener("change", () => {
        if (experienceStarted) {
            showSlide(currentSlide, { restart: false });
        }
    });
});
