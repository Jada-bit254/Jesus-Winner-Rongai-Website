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

