/* =========================================================
   SHREEVATSIDHARWA
   MASTER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initHeroSlider();

    initSearch();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById("mobileMenuButton");

    const navigation =
        document.getElementById("mainNavigation");

    if (!button || !navigation) {
        return;
    }

    button.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        const icon =
            button.querySelector("i");

        if (icon) {

            icon.className =
                isOpen
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";

        }

    });


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                navigation.classList.remove("open");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                const icon =
                    button.querySelector("i");

                if (icon) {
                    icon.className =
                        "fa-solid fa-bars";
                }

            });

        });

}


/* =========================================================
   HERO SLIDER
========================================================= */

function initHeroSlider() {

    const slider =
        document.getElementById("heroSlider");

    if (!slider) {
        return;
    }

    const slides =
        slider.querySelectorAll(".hero-slide");

    const dotsContainer =
        document.getElementById("sliderDots");

    const previous =
        document.getElementById("sliderPrev");

    const next =
        document.getElementById("sliderNext");

    if (!slides.length) {
        return;
    }

    let current = 0;

    let autoplay;


    /* Create dots */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.className =
            "slider-dot";

        dot.setAttribute(
            "aria-label",
            `Go to slide ${index + 1}`
        );

        dot.addEventListener(
            "click",
            () => {

                goToSlide(index);

                restartAutoplay();

            }
        );

        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(
            ".slider-dot"
        );


    function goToSlide(index) {

        slides[current].classList.remove(
            "active"
        );

        dots[current].classList.remove(
            "active"
        );

        current =
            (index + slides.length) %
            slides.length;

        slides[current].classList.add(
            "active"
        );

        dots[current].classList.add(
            "active"
        );

    }


    function nextSlide() {

        goToSlide(current + 1);

    }


    function previousSlide() {

        goToSlide(current - 1);

    }


    function startAutoplay() {

        autoplay =
            setInterval(
                nextSlide,
                5500
            );

    }


    function restartAutoplay() {

        clearInterval(autoplay);

        startAutoplay();

    }


    if (next) {

        next.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoplay();

            }
        );

    }


    if (previous) {

        previous.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoplay();

            }
        );

    }


    /* Keyboard support */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

                restartAutoplay();

            }

            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

                restartAutoplay();

            }

        }
    );


    /* Touch swipe */

    let touchStartX = 0;

    let touchEndX = 0;


    slider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    slider.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;

            if (Math.abs(difference) < 50) {
                return;
            }

            if (difference > 0) {
                nextSlide();
            } else {
                previousSlide();
            }

            restartAutoplay();

        },
        { passive: true }
    );


    /* Start */

    goToSlide(0);

    startAutoplay();

}


/* =========================================================
   SEARCH
========================================================= */

function initSearch() {

    const searchButton =
        document.getElementById("searchButton");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");

    const searchInput =
        document.getElementById("siteSearch");


    if (
        !searchButton ||
        !searchOverlay
    ) {
        return;
    }


    searchButton.addEventListener(
        "click",
        () => {

            searchOverlay.classList.add(
                "open"
            );

            document.body.classList.add(
                "menu-open"
            );

            setTimeout(
                () => {

                    if (searchInput) {
                        searchInput.focus();
                    }

                },
                250
            );

        }
    );


    function closeSearch() {

        searchOverlay.classList.remove(
            "open"
        );

        document.body.classList.remove(
            "menu-open"
        );

    }


    if (searchClose) {

        searchClose.addEventListener(
            "click",
            closeSearch
        );

    }


    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                searchOverlay
            ) {

                closeSearch();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================================================
   COMING SOON
========================================================= */

function showComingSoon(feature) {

    const toast =
        document.getElementById("siteToast");

    if (!toast) {
        return;
    }

    toast.textContent =
        `${feature} will be available soon.`;

    toast.classList.add("show");

    setTimeout(
        () => {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}


/* =========================================================
   NEWSLETTER
========================================================= */

function handleNewsletter(event) {

    event.preventDefault();

    const email =
        document.getElementById(
            "newsletterEmail"
        );

    if (!email || !email.value) {
        return;
    }

    const toast =
        document.getElementById(
            "siteToast"
        );

    if (toast) {

        toast.textContent =
            "Thank you for joining us.";

        toast.classList.add("show");

        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

    }

    email.value = "";

}


/* =========================================================
   EXPOSE FUNCTIONS
========================================================= */

window.showComingSoon =
    showComingSoon;

window.handleNewsletter =
    handleNewsletter;
