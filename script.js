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





/* =========================================================
   SHRI VATSADARBAR — MASTER FOOTER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const footerPlaceholder = document.getElementById("site-footer");

    if (!footerPlaceholder) return;


    /* =====================================================
       DETERMINE WEBSITE BASE PATH
    ====================================================== */

    function getBasePath() {

        const path = window.location.pathname;

        /*
        Pages inside folders such as:

        /policies/
        /collections/

        need one level back.
        */

        if (
            path.includes("/policies/") ||
            path.includes("/collections/")
        ) {
            return "../";
        }

        return "";
    }


    const base = getBasePath();



   /* =========================================================
   SHRI VATSADARBAR — MASTER FOOTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       FIND EXISTING FOOTER AUTOMATICALLY
    ====================================================== */

    const existingFooter =
        document.querySelector("footer");

    const footerPlaceholder =
        document.getElementById("site-footer");


    /*
       If a page has neither a footer nor the placeholder,
       do nothing.
    */

    if (
        !existingFooter &&
        !footerPlaceholder
    ) {
        return;
    }


    /* =====================================================
       DETERMINE CORRECT BASE PATH
    ====================================================== */

    function getBasePath() {

        const path =
            window.location.pathname;

        /*
           Pages inside folders need to go
           back to the website root.

           Examples:

           /policies/privacy-policy.html
           → ../

           /collections/collections.html
           → ../
        */

        if (
            path.includes("/policies/") ||
            path.includes("/collections/")
        ) {
            return "../";
        }

        return "";

    }


    const base =
        getBasePath();


    /* =====================================================
       MASTER FOOTER HTML
    ====================================================== */

    const masterFooter = `

        <footer class="svd-footer">


            <!-- =============================================
                 FOOTER MAIN
            ============================================== -->

            <div class="svd-footer-main">


                <!-- =========================================
                     BRAND
                ========================================== -->

                <div class="svd-footer-brand">

                    <a href="${base}index.html"
                       class="svd-footer-logo">

                        <img
                            src="${base}images/logos/logo.webp"
                            alt="ShriVatsaDarbar">

                    </a>


                    <p>

                        Premium sarees and suits curated with
                        timeless elegance, quality and grace
                        in every thread.

                    </p>


                    <div class="svd-footer-socials">

                        <a href="#"
                           aria-label="Instagram">

                            <i class="fa-brands fa-instagram"></i>

                        </a>


                        <a href="#"
                           aria-label="Facebook">

                            <i class="fa-brands fa-facebook-f"></i>

                        </a>


                        <a href="#"
                           aria-label="Pinterest">

                            <i class="fa-brands fa-pinterest-p"></i>

                        </a>


                        <a href="#"
                           aria-label="YouTube">

                            <i class="fa-brands fa-youtube"></i>

                        </a>

                    </div>

                </div>



                <!-- =========================================
                     SHOP
                ========================================== -->

                <div class="svd-footer-column">

                    <h4>Shop</h4>


                    <a href="${base}collections/collections.html?category=saree">
                        Sarees
                    </a>


                    <a href="${base}collections/collections.html?category=suit">
                        Suits
                    </a>


                    <a href="${base}collections/collections.html">
                        New Arrivals
                    </a>


                    <a href="${base}collections/collections.html">
                        Best Sellers
                    </a>


                    <a href="${base}collections/collections.html">
                        All Collections
                    </a>

                </div>



                <!-- =========================================
                     CUSTOMER CARE
                ========================================== -->

                <div class="svd-footer-column">

                    <h4>Customer Care</h4>


                    <a href="${base}contact.html">
                        Contact Us
                    </a>


                    <a href="${base}faq.html">
                        FAQs
                    </a>


                    <a href="${base}size-guide.html">
                        Size Guide
                    </a>

                </div>



                <!-- =========================================
                     POLICIES
                ========================================== -->

                <div class="svd-footer-column">

                    <h4>Policies</h4>


                    <a href="${base}policies/privacy-policy.html">
                        Privacy Policy
                    </a>


                    <a href="${base}policies/shipping-policy.html">
                        Shipping Policy
                    </a>


                    <a href="${base}policies/return-refund-policy.html">
                        Return & Refund Policy
                    </a>


                    <a href="${base}policies/exchange-policy.html">
                        Exchange Policy
                    </a>


                    <a href="${base}policies/cancellation-policy.html">
                        Cancellation Policy
                    </a>


                    <a href="${base}policies/terms-conditions.html">
                        Terms & Conditions
                    </a>

                </div>



                <!-- =========================================
                     ABOUT US
                ========================================== -->

                <div class="svd-footer-column">

                    <h4>About Us</h4>


                    <a href="${base}our-story.html">
                        Our Story
                    </a>


                    <a href="${base}about.html">
                        About ShriVatsaDarbar
                    </a>

                </div>



                <!-- =========================================
                     CONTACT
                ========================================== -->

                <div class="svd-footer-column svd-footer-contact">

                    <h4>Contact Us</h4>


                    <div class="svd-footer-contact-item">

                        <i class="fa-solid fa-phone"></i>

                        <a href="tel:+918826196544">
                            +91 88261 96544
                        </a>

                    </div>


                    <div class="svd-footer-contact-item">

                        <i class="fa-regular fa-envelope"></i>

                        <a href="mailto:shrivatsadarbar@gmail.com">
                            shrivatsadarbar@gmail.com
                        </a>

                    </div>


                    <div class="svd-footer-contact-item svd-footer-address">

                        <i class="fa-solid fa-location-dot"></i>

                        <span>

                            Bhola and Prabha Niwas,
                            Ratanpur, Padao,
                            Varanasi, Uttar Pradesh
                            221008

                        </span>

                    </div>


                    <div class="svd-footer-contact-item">

                        <i class="fa-regular fa-clock"></i>

                        <span>
                            Support: 10:00 AM – 8:00 PM
                        </span>

                    </div>

                </div>


            </div>



            <!-- =============================================
                 FOOTER BOTTOM
            ============================================== -->

            <div class="svd-footer-bottom">

                <p>

                    © 2026
                    <strong>ShriVatsaDarbar</strong>.
                    All Rights Reserved.

                </p>


                <p>
                    Grace in Every Thread
                </p>

            </div>


        </footer>

    `;


    /* =====================================================
       APPLY MASTER FOOTER
    ====================================================== */


    /*
       Priority 1:
       If #site-footer exists, use it.
    */

    if (footerPlaceholder) {

        footerPlaceholder.outerHTML =
            masterFooter;

        return;

    }


    /*
       Priority 2:
       Automatically replace the existing footer.

       This means existing pages do NOT need
       manual footer removal.
    */

    if (existingFooter) {

        existingFooter.outerHTML =
            masterFooter;

    }

});

                          
