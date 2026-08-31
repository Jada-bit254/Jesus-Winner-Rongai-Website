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