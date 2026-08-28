/* =========================================================
   SHRI VATSADARBAR
   MASTER JAVASCRIPT
   STABLE CORE ARCHITECTURE
========================================================= */

"use strict";


/* =========================================================
   APPLICATION STARTUP
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initHeroSlider();

    initSearch();

    initContactForm();

    initMasterFooter();

});


/* =========================================================
   BODY SCROLL LOCK
========================================================= */

function lockBody() {

    document.body.classList.add(
        "menu-open"
    );

}


function unlockBody() {

    const navigation =
        document.getElementById(
            "mainNavigation"
        );


    const searchOverlay =
        document.getElementById(
            "searchOverlay"
        );


    const menuIsOpen =
        navigation &&
        navigation.classList.contains(
            "open"
        );


    const searchIsOpen =
        searchOverlay &&
        searchOverlay.classList.contains(
            "open"
        );


    if (
        !menuIsOpen &&
        !searchIsOpen
    ) {

        document.body.classList.remove(
            "menu-open"
        );

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.getElementById(
            "mobileMenuButton"
        );


    const navigation =
        document.getElementById(
            "mainNavigation"
        );


    if (
        !button ||
        !navigation
    ) {
        return;
    }


    const icon =
        button.querySelector("i");


    function openMenu() {

        navigation.classList.add(
            "open"
        );


        button.setAttribute(
            "aria-expanded",
            "true"
        );


        lockBody();


        if (icon) {

            icon.className =
                "fa-solid fa-xmark";

        }

    }


    function closeMenu() {

        navigation.classList.remove(
            "open"
        );


        button.setAttribute(
            "aria-expanded",
            "false"
        );


        unlockBody();


        if (icon) {

            icon.className =
                "fa-solid fa-bars";

        }

    }


    button.addEventListener(
        "click",
        () => {

            const isOpen =
                navigation.classList.contains(
                    "open"
                );


            if (isOpen) {

                closeMenu();

            }

            else {

                openMenu();

            }

        }
    );


    navigation
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    closeMenu();

                }
            );

        });


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800 &&
                navigation.classList.contains(
                    "open"
                )
            ) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   HERO SLIDER
========================================================= */

function initHeroSlider() {

    const slider =
        document.getElementById(
            "heroSlider"
        );


    if (!slider) {
        return;
    }


    const slides =
        slider.querySelectorAll(
            ".hero-slide"
        );


    if (!slides.length) {
        return;
    }


    const dotsContainer =
        document.getElementById(
            "sliderDots"
        );


    const previous =
        document.getElementById(
            "sliderPrev"
        );


    const next =
        document.getElementById(
            "sliderNext"
        );


    let current = 0;

    let autoplay = null;


    /* =====================================================
       CREATE SLIDER DOTS
    ====================================================== */

    if (dotsContainer) {

        dotsContainer.innerHTML = "";


        slides.forEach(
            (slide, index) => {

                const dot =
                    document.createElement(
                        "button"
                    );


                dot.type =
                    "button";


                dot.className =
                    "slider-dot";


                dot.setAttribute(
                    "aria-label",
                    `Go to slide ${index + 1}`
                );


                dot.addEventListener(
                    "click",
                    () => {

                        goToSlide(
                            index
                        );


                        restartAutoplay();

                    }
                );


                dotsContainer.appendChild(
                    dot
                );

            }
        );

    }


    const dots =
        dotsContainer
            ? dotsContainer.querySelectorAll(
                ".slider-dot"
            )
            : [];


    /* =====================================================
       GO TO SLIDE
    ====================================================== */

    function goToSlide(index) {

        current =
            (
                index +
                slides.length
            ) %
            slides.length;


        slides.forEach(
            (slide, slideIndex) => {

                slide.classList.toggle(
                    "active",
                    slideIndex === current
                );

            }
        );


        dots.forEach(
            (dot, dotIndex) => {

                dot.classList.toggle(
                    "active",
                    dotIndex === current
                );

            }
        );

    }


    function nextSlide() {

        goToSlide(
            current + 1
        );

    }


    function previousSlide() {

        goToSlide(
            current - 1
        );

    }


    /* =====================================================
       AUTOPLAY
    ====================================================== */

    function startAutoplay() {

        stopAutoplay();


        autoplay =
            window.setInterval(
                nextSlide,
                5500
            );

    }


    function stopAutoplay() {

        if (autoplay) {

            clearInterval(
                autoplay
            );


            autoplay = null;

        }

    }


    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();

    }


    /* =====================================================
       ARROW CONTROLS
    ====================================================== */

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


    /* =====================================================
       KEYBOARD CONTROLS
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !document.body.contains(
                    slider
                )
            ) {
                return;
            }


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


    /* =====================================================
       TOUCH SWIPE
    ====================================================== */

    let touchStartX = 0;


    slider.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        event => {

            const touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX -
                touchEndX;


            if (
                Math.abs(
                    difference
                ) < 50
            ) {
                return;
            }


            if (
                difference > 0
            ) {

                nextSlide();

            }

            else {

                previousSlide();

            }


            restartAutoplay();

        },
        {
            passive: true
        }
    );


    /* =====================================================
       PAUSE WHEN TAB IS NOT ACTIVE
    ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                stopAutoplay();

            }

            else {

                startAutoplay();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ====================================================== */

    goToSlide(0);

    startAutoplay();

}


/* =========================================================
   SEARCH OVERLAY
========================================================= */

function initSearch() {

    const searchButton =
        document.getElementById(
            "searchButton"
        );


    const searchOverlay =
        document.getElementById(
            "searchOverlay"
        );


    const searchClose =
        document.getElementById(
            "searchClose"
        );


    const searchInput =
        document.getElementById(
            "siteSearch"
        );


    if (
        !searchButton ||
        !searchOverlay
    ) {
        return;
    }


    function openSearch() {

        searchOverlay.classList.add(
            "open"
        );


        lockBody();


        setTimeout(
            () => {

                if (
                    searchInput
                ) {

                    searchInput.focus();

                }

            },
            250
        );

    }


    function closeSearch() {

        searchOverlay.classList.remove(
            "open"
        );


        unlockBody();

    }


    searchButton.addEventListener(
        "click",
        openSearch
    );


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
                event.key === "Escape" &&
                searchOverlay.classList.contains(
                    "open"
                )
            ) {

                closeSearch();

            }

        }
    );

}


/* =========================================================
   COMING SOON TOAST
========================================================= */

let toastTimer = null;


function showComingSoon(feature) {

    const toast =
        document.getElementById(
            "siteToast"
        );


    if (!toast) {
        return;
    }


    if (toastTimer) {

        clearTimeout(
            toastTimer
        );

    }


    toast.textContent =
        `${feature} will be available soon.`;


    toast.classList.add(
        "show"
    );


    toastTimer =
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


    if (
        !email ||
        !email.value.trim()
    ) {

        email?.focus();

        return;

    }


    const toast =
        document.getElementById(
            "siteToast"
        );


    if (toast) {

        toast.textContent =
            "Thank you for joining ShriVatsaDarbar.";


        toast.classList.add(
            "show"
        );


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
   CONTACT FORM → WHATSAPP
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) {
        return;
    }


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                !form.checkValidity()
            ) {

                form.reportValidity();

                return;

            }


            const name =
                document.getElementById(
                    "contactName"
                )?.value
                    .trim() || "";


            const email =
                document.getElementById(
                    "contactEmail"
                )?.value
                    .trim() || "";


            const phone =
                document.getElementById(
                    "contactPhone"
                )?.value
                    .trim() || "";


            const subject =
                document.getElementById(
                    "contactSubject"
                )?.value || "";


            const message =
                document.getElementById(
                    "contactMessage"
                )?.value
                    .trim() || "";


            const whatsappMessage =
`Hello ShriVatsaDarbar,

I would like assistance with the following enquiry:

Name: ${name}

Email: ${email}

Phone: ${phone || "Not provided"}

Enquiry: ${subject}

Message:
${message}`;


            const whatsappURL =
                "https://wa.me/918826196544?text=" +
                encodeURIComponent(
                    whatsappMessage
                );


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}


/* =========================================================
   MASTER FOOTER
========================================================= */

async function initMasterFooter() {

    const footerPlaceholder =
        document.getElementById(
            "site-footer"
        );


    if (!footerPlaceholder) {
        return;
    }


    /* =====================================================
       DETERMINE PAGE DEPTH
    ====================================================== */

    function getBasePath() {

        const path =
            window.location.pathname;


        const normalizedPath =
            path.replace(
                /^\/+/,
                ""
            );


        const segments =
            normalizedPath
                .split("/")
                .filter(Boolean);


        /*
           Root pages:
           /index.html
           /about.html

           Folder pages:
           /collections/sarees.html
           /policies/privacy.html
        */

        if (
            segments.length > 1
        ) {

            return "../";

        }


        return "";

    }


    const base =
        getBasePath();


    try {

        const response =
            await fetch(
                `${base}footer.html`
            );


        if (
            !response.ok
        ) {

            throw new Error(
                `Footer could not be loaded (${response.status})`
            );

        }


        let footerHTML =
            await response.text();


        footerHTML =
            footerHTML.replace(
                /\{\{BASE\}\}/g,
                base
            );


        footerPlaceholder.outerHTML =
            footerHTML;

    }

    catch (error) {

        console.error(
            "Master footer error:",
            error
        );

    }

}


/* =========================================================
   GLOBAL FUNCTION EXPORTS
========================================================= */

window.showComingSoon =
    showComingSoon;


window.handleNewsletter =
    handleNewsletter;
