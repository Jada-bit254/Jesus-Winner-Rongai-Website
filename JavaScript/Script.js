/* =========================================================
   CODE 6 — HERO PERFORMANCE + REPEATING WELCOME EXPERIENCE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero");
    if (!hero) return;

    const intro = hero.querySelector(".hero-intro-background");
    const welcome = hero.querySelector(".hero-welcome-content");

    const slides = [...hero.querySelectorAll(".hero-video-slide")];
    const videos = [...hero.querySelectorAll(".hero-video")];
    const dots = [...hero.querySelectorAll(".hero-dot")];

    if (!slides.length || !videos.length) return;

    const WELCOME_TIME = 5000;
    const FADE_TIME = 700;

    let currentSlide = 0;
    let experienceStarted = false;
    let welcomeTimer = null;
    let oldVideoTimer = null;

    /* ---------------------------------------------------------
       SAFE VIDEO PLAY
       --------------------------------------------------------- */

    function safePlay(video) {
        if (!video) return;

        video.muted = true;
        video.playsInline = true;

        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(() => {
                // Autoplay may be blocked by the browser.
            });
        }
    }

    /* ---------------------------------------------------------
       RESET VIDEO
       --------------------------------------------------------- */

    function resetVideo(video) {
        if (!video) return;

        video.pause();

        try {
            video.currentTime = 0;
        } catch (error) {}
    }

    /* ---------------------------------------------------------
       DOTS
       --------------------------------------------------------- */

    function updateDots(index) {

        dots.forEach((dot, i) => {

            const active = i === index;

            dot.classList.toggle("active", active);

            dot.setAttribute(
                "aria-current",
                active ? "true" : "false"
            );
        });
    }

    /* ---------------------------------------------------------
       SHOW VIDEO
       --------------------------------------------------------- */

    function showVideo(index) {

        if (index < 0 || index >= slides.length) return;

        clearTimeout(oldVideoTimer);

        const previousIndex = currentSlide;
        const video = videos[index];

        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });

        currentSlide = index;

        updateDots(index);

        resetVideo(video);

        /*
         * Give the browser one frame to make the slide visible
         * before starting playback.
         */

        requestAnimationFrame(() => {
            safePlay(video);
        });

        /*
         * Stop the previous video after the fade.
         */

        if (previousIndex !== index) {

            oldVideoTimer = setTimeout(() => {

                if (videos[previousIndex]) {
                    resetVideo(videos[previousIndex]);
                }

            }, FADE_TIME + 100);
        }
    }

    /* ---------------------------------------------------------
       WELCOME SCREEN
       --------------------------------------------------------- */

    function showWelcome() {

        clearTimeout(welcomeTimer);

        /*
         * Hide all videos while welcome screen is showing.
         */

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        videos.forEach(video => {
            resetVideo(video);
        });

        /*
         * Show welcome background and text.
         */

        intro?.classList.remove("hide-intro");
        intro?.classList.remove("hide");

        welcome?.classList.remove("is-hidden");
        welcome?.classList.remove("hide");

        /*
         * Wait before starting the first video.
         */

        welcomeTimer = setTimeout(() => {

            /*
             * Start the first video.
             */

            intro?.classList.add("hide-intro");
            intro?.classList.add("hide");

            welcome?.classList.add("is-hidden");
            welcome?.classList.add("hide");

            showVideo(0);

        }, WELCOME_TIME);
    }

    /* ---------------------------------------------------------
       VIDEO SETTINGS
       --------------------------------------------------------- */

    videos.forEach((video, index) => {

        video.muted = true;
        video.playsInline = true;

        /*
         * First video can begin loading immediately.
         * Second video waits until needed.
         */

        if (index === 0) {
            video.preload = "auto";
        } else {
            video.preload = "metadata";
        }

        video.setAttribute("playsinline", "");
        video.setAttribute("muted", "");

        video.pause();

    });

    /* ---------------------------------------------------------
       VIDEO END → NEXT VIDEO
       --------------------------------------------------------- */

    videos.forEach((video, index) => {

        video.addEventListener("ended", () => {

            const nextIndex =
                (index + 1) % videos.length;

            showVideo(nextIndex);

        });

    });

    /* ---------------------------------------------------------
       DOT CONTROLS
       --------------------------------------------------------- */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (!experienceStarted) return;

            showVideo(index);

        });

    });

    /* ---------------------------------------------------------
       START
       --------------------------------------------------------- */

    experienceStarted = true;

    showWelcome();

});