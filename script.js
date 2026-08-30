/* =====================================================
   SHRI VATSA DARBAR SUITS
   MASTER JAVASCRIPT
   ===================================================== */


/* =====================================================
   BODY SCROLL CONTROL
===================================================== */

function lockBody() {
    document.body.style.overflow = "hidden";
}

function unlockBody() {
    document.body.style.overflow = "";
}


/* =====================================================
   MOBILE MENU
===================================================== */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle") ||
        document.querySelector("#menuToggle") ||
        document.querySelector(".mobile-menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu") ||
        document.querySelector("#mobileMenu");

    const closeMenu =
        document.querySelector(".close-menu") ||
        document.querySelector("#closeMenu");

    if (!menuToggle || !mobileMenu) return;


    function openMenu() {

        mobileMenu.classList.add("active");
        document.body.classList.add("menu-open");

        lockBody();
    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        unlockBody();
    }


    menuToggle.addEventListener("click", function (event) {

        event.preventDefault();

        if (mobileMenu.classList.contains("active")) {
            closeMobileMenu();
        } else {
            openMenu();
        }

    });


    if (closeMenu) {

        closeMenu.addEventListener("click", function () {
            closeMobileMenu();
        });

    }


    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMobileMenu();
        });

    });


    document.addEventListener("click", function (event) {

        if (
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMobileMenu();
        }

    });

}


/* =====================================================
   HERO SLIDER
===================================================== */

function initHeroSlider() {

    const slider = document.querySelector(".hero-slider");

    if (!slider) return;


    const slides = slider.querySelectorAll(".slide");

    if (!slides.length) return;


    const nextButton =
        slider.querySelector(".next-slide") ||
        document.querySelector(".next-slide");

    const previousButton =
        slider.querySelector(".prev-slide") ||
        document.querySelector(".previous-slide");

    let currentSlide = 0;

    let autoplayInterval = null;


    function showSlide(index) {

        if (!slides.length) return;


        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        currentSlide = index;


        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }


        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }


        slides[currentSlide].classList.add("active");

    }


    function nextSlide() {

        showSlide(currentSlide + 1);

    }


    function previousSlide() {

        showSlide(currentSlide - 1);

    }


    function startAutoplay() {

        stopAutoplay();

        autoplayInterval = setInterval(function () {

            nextSlide();

        }, 5000);

    }


    function stopAutoplay() {

        if (autoplayInterval) {

            clearInterval(autoplayInterval);

            autoplayInterval = null;
        }

    }


    function restartAutoplay() {

        stopAutoplay();

        startAutoplay();

    }


    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextSlide();

            restartAutoplay();

        });

    }


    if (previousButton) {

        previousButton.addEventListener("click", function () {

            previousSlide();

            restartAutoplay();

        });

    }


    showSlide(0);

    startAutoplay();


    slider.addEventListener("mouseenter", function () {

        stopAutoplay();

    });


    slider.addEventListener("mouseleave", function () {

        startAutoplay();

    });


    /* Touch / Swipe Support */

    let touchStartX = 0;


    slider.addEventListener("touchstart", function (event) {

        touchStartX = event.changedTouches[0].screenX;

    });


    slider.addEventListener("touchend", function (event) {

        const touchEndX = event.changedTouches[0].screenX;

        const difference = touchStartX - touchEndX;


        if (Math.abs(difference) > 50) {

            if (difference > 0) {

                nextSlide();

            } else {

                previousSlide();

            }

            restartAutoplay();

        }

    });

}


/* =====================================================
   SEARCH
===================================================== */

function initSearch() {

    const searchButton =
        document.querySelector(".search-btn") ||
        document.querySelector("#searchButton") ||
        document.querySelector(".search-icon");

    const searchOverlay =
        document.querySelector(".search-overlay") ||
        document.querySelector("#searchOverlay");

    const closeSearch =
        document.querySelector(".close-search") ||
        document.querySelector("#closeSearch");

    const searchInput =
        document.querySelector(".search-input") ||
        document.querySelector("#searchInput");


    if (!searchButton || !searchOverlay) return;


    function openSearch() {

        searchOverlay.classList.add("active");

        lockBody();


        setTimeout(function () {

            if (searchInput) {
                searchInput.focus();
            }

        }, 100);

    }


    function closeSearchPanel() {

        searchOverlay.classList.remove("active");

        unlockBody();

    }


    searchButton.addEventListener("click", function (event) {

        event.preventDefault();

        openSearch();

    });


    if (closeSearch) {

        closeSearch.addEventListener("click", function () {

            closeSearchPanel();

        });

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (searchOverlay.classList.contains("active")) {

                closeSearchPanel();

            }

        }

    });


    searchOverlay.addEventListener("click", function (event) {

        if (event.target === searchOverlay) {

            closeSearchPanel();

        }

    });

}


/* =====================================================
   COMING SOON MESSAGE
===================================================== */

function showComingSoon(message = "Coming Soon") {

    let toast = document.querySelector(".coming-soon-toast");


    if (!toast) {

        toast = document.createElement("div");

        toast.className = "coming-soon-toast";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}


/* =====================================================
   NEWSLETTER
===================================================== */

function handleNewsletter(event) {

    if (event) {
        event.preventDefault();
    }


    const form =
        event?.target ||
        document.querySelector(".newsletter-form");


    if (!form) return;


    const emailInput =
        form.querySelector('input[type="email"]');


    if (!emailInput) return;


    const email = emailInput.value.trim();


    if (!email) {

        showComingSoon("Please enter your email address");

        return;

    }


    if (!email.includes("@")) {

        showComingSoon("Please enter a valid email address");

        return;

    }


    showComingSoon("Thank you for subscribing!");

    emailInput.value = "";

}


/* =====================================================
   CONTACT FORM → WHATSAPP
===================================================== */

function initContactForm() {

    const contactForm =
        document.querySelector(".contact-form") ||
        document.querySelector("#contactForm");


    if (!contactForm) return;


    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            contactForm.querySelector('[name="name"]')?.value.trim() || "";

        const email =
            contactForm.querySelector('[name="email"]')?.value.trim() || "";

        const phone =
            contactForm.querySelector('[name="phone"]')?.value.trim() || "";

        const message =
            contactForm.querySelector('[name="message"]')?.value.trim() || "";


        const whatsappMessage =

`Hello ShriVatsaDarbar,

I would like to contact you.

Name: ${name}
Email: ${email}
Phone: ${phone}

Message:
${message}`;


        const whatsappNumber = "918826196544";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(whatsappMessage);


        window.open(
            whatsappURL,
            "_blank"
        );

    });

}


/* =====================================================
   MASTER FOOTER
===================================================== */

async function initMasterFooter() {

    const footerPlaceholder =
        document.querySelector("#footer-placeholder");


    if (!footerPlaceholder) return;


    try {

        /*
         -------------------------------------------------
         FIND THE CORRECT BASE PATH
         -------------------------------------------------

         Root pages:
         index.html
         sarees.html
         suits.html
         about.html

         Policy pages:
         /policies/privacy-policy.html

         Therefore policy pages need ../
         */


        let basePath = "";


        if (
            window.location.pathname.includes("/policies/")
        ) {

            basePath = "../";

        }


        /*
         -------------------------------------------------
         LOAD MASTER footer.html
         -------------------------------------------------
         */


        const footerURL = basePath + "footer.html";


        const response = await fetch(footerURL);


        if (!response.ok) {

            throw new Error(
                "Unable to load footer"
            );

        }


        let footerHTML =
            await response.text();


        /*
         -------------------------------------------------
         REPLACE {BASE}
         -------------------------------------------------

         footer.html contains {BASE}.

         Root pages:
         {BASE} → ""

         Policy pages:
         {BASE} → "../"
         */


        footerHTML = footerHTML.replace(
            /\{BASE\}/g,
            basePath
        );


        /*
         -------------------------------------------------
         INSERT FOOTER
         -------------------------------------------------
         */


        footerPlaceholder.innerHTML =
            footerHTML;


        /*
         -------------------------------------------------
         NEWSLETTER EVENT
         -------------------------------------------------
         */


        const newsletterForm =
            footerPlaceholder.querySelector(
                ".newsletter-form"
            );


        if (newsletterForm) {

            newsletterForm.addEventListener(
                "submit",
                handleNewsletter
            );

        }


        /*
         -------------------------------------------------
         COMING SOON LINKS
         -------------------------------------------------
         */


        const comingSoonLinks =
            footerPlaceholder.querySelectorAll(
                "[data-coming-soon]"
            );


        comingSoonLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const message =
                        link.dataset.comingSoon ||
                        "Coming Soon";

                    showComingSoon(message);

                }
            );

        });


        console.log(
            "Master footer loaded successfully."
        );


    } catch (error) {

        console.error(
            "Master footer error:",
            error
        );


        /*
         -------------------------------------------------
         FALLBACK MESSAGE
         -------------------------------------------------
         */


        footerPlaceholder.innerHTML = `
            <div style="
                padding: 30px;
                text-align: center;
                background: #3d0a12;
                color: white;
                font-family: Arial, sans-serif;
            ">
                Footer could not be loaded.
            </div>
        `;

    }

}


/* =====================================================
   INITIALIZE WEBSITE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initMobileMenu();

        initHeroSlider();

        initSearch();

        initContactForm();

        initMasterFooter();

    }
);


/* =====================================================
   GLOBAL FUNCTION EXPORTS
===================================================== */

window.showComingSoon =
    showComingSoon;

window.handleNewsletter =
    handleNewsletter;

window.initMasterFooter =
    initMasterFooter;

window.lockBody =
    lockBody;

window.unlockBody =
    unlockBody;
