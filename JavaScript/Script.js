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

    const slides = hero.querySelectorAll(".hero-video-slide");

    const videos = hero.querySelectorAll(".hero-video");

    const dots = hero.querySelectorAll(".hero-dot");

    if (!slides.length || !videos.length) return;


    let currentSlide = 0;
    let experienceStarted = false;


    /* -----------------------------------------------------
       INITIAL STATE
    ----------------------------------------------------- */

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });


    videos.forEach((video) => {

        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;
        video.pause();
    });


    /* -----------------------------------------------------
       WELCOME INTRO
       Give the welcome message time to appear,
       then smoothly remove the whole intro.
    ----------------------------------------------------- */

    /* -----------------------------------------------------
       SHOW VIDEO
    ----------------------------------------------------- */

    function showSlide(index) {

        if (index < 0 || index >= slides.length) return;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        videos.forEach((video, i) => {

            if (i === index) {
                if (i !== currentSlide || video.ended) {
                    video.currentTime = 0;
                }
                video.play().catch(() => {});
            }

        });

        const previousVideo = videos[currentSlide];

        if (previousVideo && currentSlide !== index) {
            window.setTimeout(() => previousVideo.pause(), 900);
        }


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

            dot.setAttribute("aria-current", i === index ? "true" : "false");

        });


        currentSlide = index;

    }


    /* -----------------------------------------------------
       WELCOME INTRO
       The message remains visible for five seconds, then
       the opening image fades away as the first video begins.
    ----------------------------------------------------- */

    window.setTimeout(() => {

        experienceStarted = true;
        showSlide(0);

        if (intro) {
            intro.classList.add("hide-intro");
        }

        if (welcome) {
            welcome.classList.add("is-hidden");
        }

    }, 5000);


    /* -----------------------------------------------------
       WHEN A VIDEO FINISHES
       Move automatically to the next video.
    ----------------------------------------------------- */

    videos.forEach((video, index) => {

        video.addEventListener("ended", () => {

            let nextIndex = index + 1;

            if (nextIndex >= videos.length) {

                nextIndex = 0;

            }

            showSlide(nextIndex);

        });

    });


    /* -----------------------------------------------------
       DOT NAVIGATION
    ----------------------------------------------------- */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {
            if (experienceStarted) {
                showSlide(index);
            }

        });

    });


});

