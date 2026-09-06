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
    /* HERO INTRO AND VIDEO SLIDER */
    const heroIntro = document.querySelector(".hero-intro-background");
    const welcomeContent = document.querySelector(".hero-welcome-content");
    const slides = Array.from(
        document.querySelectorAll(".hero-video-slide")
    );
    const videos = Array.from(
        document.querySelectorAll(".hero-video")
    );
    const dots = Array.from(
        document.querySelectorAll(".hero-dot")
    );

    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = index;

        slides.forEach(function (slide, slideIndex) {
            slide.classList.toggle(
                "active",
                slideIndex === currentSlide
            );
        });

        dots.forEach(function (dot, dotIndex) {
            const isActive = dotIndex === currentSlide;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-current", isActive);
        });

        videos.forEach(function (video, videoIndex) {
            video.pause();
            video.currentTime = 0;

            if (videoIndex === currentSlide) {
                video.play().catch(function () {
                    console.log("Video playback needs user interaction.");
                });
            }
        });
    }

    if (slides.length && videos.length) {
        videos.forEach(function (video, videoIndex) {
            video.addEventListener("ended", function () {
                showSlide((videoIndex + 1) % videos.length);
            });
        });

        dots.forEach(function (dot) {
            dot.addEventListener("click", function () {
                showSlide(Number(dot.dataset.slide));
            });
        });

        setTimeout(function () {
            heroIntro.classList.add("hide");
            welcomeContent.classList.add("hide");

            showSlide(0);
        }, 6000);
    }
});

