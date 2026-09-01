/* =========================================================
   MORE DROPDOWN
   ========================================================= */

const moreToggle = document.querySelector(".more-toggle");
const moreDropdown = document.querySelector(".more-dropdown");

if (moreToggle && moreDropdown) {

    moreToggle.addEventListener("click", function () {

        const isOpen = moreDropdown.classList.toggle("open");

        moreToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

    document.addEventListener("click", function (event) {

        if (
            !moreDropdown.contains(event.target) &&
            !moreToggle.contains(event.target)
        ) {

            moreDropdown.classList.remove("open");

            moreToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   HERO BACKGROUND SLIDER
   ========================================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

let currentHeroSlide = 0;

/* =====================================================
   PREPARE CINEMATIC BACKGROUND VIDEO
===================================================== */

const backgroundVideo =
    hero.querySelector(
        "#heroBackgroundVideo"
    );

if (backgroundVideo) {

    backgroundVideo.muted = true;

    backgroundVideo.playsInline = true;

    backgroundVideo.play().catch(
        () => {}
    );
}
```

function showHeroSlide(index) {

    heroSlides.forEach((slide, i) => {
    

        slide.classList.toggle(
            "active",
            i === index
        );

    });

    heroDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });

}


function nextHeroSlide() {

    currentHeroSlide++;

    if (currentHeroSlide >= heroSlides.length) {

        currentHeroSlide = 0;

    }

    showHeroSlide(currentHeroSlide);

}


/* Change hero image every 6 seconds */

if (heroSlides.length > 0) {

    setInterval(nextHeroSlide, 6000);

}


/* =========================================================
   HERO SLIDER DOTS
   ========================================================= */

heroDots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentHeroSlide = index;

        showHeroSlide(currentHeroSlide);

    });

});
/* =========================================================
   JWM RONGAI — CINEMATIC HERO CONTROLLER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const hero =
        document.querySelector(".hero");

    if (!hero) return;


    const intro =
        hero.querySelector(
            ".hero-intro-background"
        );

    const welcome =
        hero.querySelector(
            ".hero-welcome-content"
        );

    const slides =
        hero.querySelectorAll(
            ".hero-video-slide"
        );

    const videos =
        hero.querySelectorAll(
            ".hero-video"
        );

    const dots =
        hero.querySelectorAll(
            ".hero-dot"
        );


    let currentSlide = 0;


    /* =====================================================
       SHOW VIDEO
    ===================================================== */

    function showVideo(index) {

        if (!slides[index]) return;


        slides.forEach(
            (slide, i) => {

                slide.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        dots.forEach(
            (dot, i) => {

                dot.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        videos.forEach(
            (video, i) => {

                if (i === index) {

                    video.currentTime = 0;

                    video.play().catch(
                        () => {}
                    );

                } else {

                    video.pause();

                }

            }
        );


        currentSlide = index;

    }


    /* =====================================================
       OPENING SCENE
       7 SECOND WELCOME
    ===================================================== */

/* =====================================================
   TRANSITION FROM BLUE OPENING TO VIDEO
   AFTER 7 SECONDS
===================================================== */


/* =====================================================
   START FIRST VIDEO
===================================================== */

showVideo(0);
  

    /* =====================================================
       VIDEO TRANSITIONS
    ===================================================== */

    videos.forEach(
        (video, index) => {

            video.addEventListener(
                "ended",
                function () {

                    const next =
                        index + 1;


                    /* =====================================
                       MOVE TO NEXT VIDEO
                    ================================== */

                    if (
                        next <
                        videos.length
                    ) {

                        showVideo(next);

                        return;

                    }


                    /* =====================================
                       ALL VIDEOS FINISHED

                       Return to welcome scene
                    ================================== */

                    slides.forEach(
                        slide => {

                            slide.classList.remove(
                                "active"
                            );

                        }
                    );


                    intro.style.opacity = "1";

                    welcome.classList.remove(
                        "hide"
                    );


                    /* Keep welcome for 7 seconds */

                    setTimeout(function () {

                        welcome.classList.add(
                            "hide"
                        );

                        intro.style.opacity =
                            "0";

                        showVideo(0);

                    }, 7000);

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
                function () {

                    intro.style.opacity = "0";

                    welcome.classList.add(
                        "hide"
                    );

                    showVideo(index);

                }
            );

        }
    );

});
