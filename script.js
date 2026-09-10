/* =========================================================
   ShriVatsaDarbar Fashion
   SHARED SITE CONTROLLER
   ---------------------------------------------------------
   Responsibilities:
   - Master footer loading
   - GitHub Pages path handling
   - Mobile navigation
   - Search overlay
   - Hero slider
   - Toast notifications
   - Shared bag-count synchronization
   - Safe page initialization

   Product data lives ONLY in products.js
   ========================================================= */

(function () {
    "use strict";

    /* =========================================================
       SITE BASE PATH
       ---------------------------------------------------------
       script.js lives at repository root.

       We derive the repository root from the actual script URL
       instead of assuming "/" so GitHub Pages project URLs work.
       ========================================================= */

    var scriptElement = document.currentScript;

    var scriptUrl = scriptElement
        ? scriptElement.src
        : window.location.href;

    var siteRoot = new URL("./", scriptUrl);


    /* =========================================================
       UTILITY — DOM READY
       ========================================================= */

    function onReady(callback) {
        if (document.readyState === "loading") {
            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );
        } else {
            callback();
        }
    }


    /* =========================================================
       UTILITY — SITE URL
       ---------------------------------------------------------
       Converts repository-relative paths into working URLs.

       Example:
       /images/logo.webp
       becomes:
       https://username.github.io/repository/images/logo.webp
       ========================================================= */

    function resolveSiteUrl(value) {
        if (!value) {
            return value;
        }

        var trimmed = String(value).trim();

        if (
            trimmed.startsWith("#") ||
            trimmed.startsWith("mailto:") ||
            trimmed.startsWith("tel:") ||
            trimmed.startsWith("javascript:") ||
            trimmed.startsWith("data:") ||
            trimmed.startsWith("blob:")
        ) {
            return trimmed;
        }

        if (
            trimmed.startsWith("http://") ||
            trimmed.startsWith("https://") ||
            trimmed.startsWith("//")
        ) {
            return trimmed;
        }

        if (trimmed.startsWith("/")) {
            trimmed = trimmed.replace(/^\/+/, "");
        }

        return new URL(trimmed, siteRoot).href;
    }


    /* =========================================================
       MASTER FOOTER
       ========================================================= */

    function normalizeFooterPaths(container) {
        if (!container) {
            return;
        }

        /* -----------------------------------------------------
           Links
           ----------------------------------------------------- */

        var links = container.querySelectorAll("a[href]");

        links.forEach(function (link) {
            var href = link.getAttribute("href");

            if (!href) {
                return;
            }

            link.setAttribute(
                "href",
                resolveSiteUrl(href)
            );
        });


        /* -----------------------------------------------------
           Images
           ----------------------------------------------------- */

        var images = container.querySelectorAll("img[src]");

        images.forEach(function (image) {
            var src = image.getAttribute("src");

            if (!src) {
                return;
            }

            image.setAttribute(
                "src",
                resolveSiteUrl(src)
            );
        });


        /* -----------------------------------------------------
           Form actions, if ever added to footer
           ----------------------------------------------------- */

        var forms = container.querySelectorAll("form[action]");

        forms.forEach(function (form) {
            var action = form.getAttribute("action");

            if (!action) {
                return;
            }

            form.setAttribute(
                "action",
                resolveSiteUrl(action)
            );
        });
    }


    async function loadMasterFooter() {
        var placeholder =
            document.getElementById("site-footer");

        var existingFooter =
            document.querySelector(
                "body > footer.site-footer, body > footer"
            );


        /* -----------------------------------------------------
           Prevent duplicate loading
           ----------------------------------------------------- */

        if (
            placeholder &&
            placeholder.dataset.svdFooterLoaded === "true"
        ) {
            return;
        }


        /* -----------------------------------------------------
           Determine where the footer should go
           ----------------------------------------------------- */

        var target = placeholder || existingFooter;

        if (!target) {
            return;
        }


        /* -----------------------------------------------------
           Do not replace a footer if this page has already
           received the master footer.
           ----------------------------------------------------- */

        if (
            target.dataset &&
            target.dataset.svdFooterLoaded === "true"
        ) {
            return;
        }


        /* -----------------------------------------------------
           footer.html is located beside script.js at root.
           ----------------------------------------------------- */

        var footerUrl =
            new URL(
                "footer.html",
                siteRoot
            ).href;


        try {
            var response =
                await fetch(
                    footerUrl,
                    {
                        cache: "no-cache"
                    }
                );

            if (!response.ok) {
                throw new Error(
                    "Footer request failed: " +
                    response.status
                );
            }

            var html =
                await response.text();


            /* -------------------------------------------------
               Parse the fetched footer safely
               ------------------------------------------------- */

            var parser =
                new DOMParser();

            var footerDocument =
                parser.parseFromString(
                    html,
                    "text/html"
                );

            var fetchedFooter =
                footerDocument.querySelector(
                    "footer"
                );

            if (!fetchedFooter) {
                throw new Error(
                    "No footer element found in footer.html"
                );
            }


            /* -------------------------------------------------
               Normalize all internal footer paths so the same
               footer works on:

               /
               /collections/
               /policies/
               GitHub Pages project URLs
               ------------------------------------------------- */

            normalizeFooterPaths(
                fetchedFooter
            );


            /* -------------------------------------------------
               Insert the master footer
               ------------------------------------------------- */

            if (placeholder) {

                placeholder.innerHTML = "";

                placeholder.appendChild(
                    fetchedFooter
                );

                placeholder.dataset.svdFooterLoaded =
                    "true";

            } else {

                var replacement =
                    document.createElement("div");

                replacement.id =
                    "site-footer";

                replacement.appendChild(
                    fetchedFooter
                );

                target.replaceWith(
                    replacement
                );

                replacement.dataset.svdFooterLoaded =
                    "true";
            }

        } catch (error) {

            console.error(
                "ShriVatsaDarbar footer loading error:",
                error
            );

            /*
             * Do not destroy an existing footer if loading fails.
             * This gives us graceful degradation.
             */
        }
    }


    /* =========================================================
       MOBILE NAVIGATION
       ========================================================= */

    function initMobileMenu() {

        var button =
            document.getElementById(
                "mobileMenuButton"
            );

        var navigation =
            document.getElementById(
                "mainNavigation"
            );

        if (!button || !navigation) {
            return;
        }


        function closeMenu() {

            navigation.classList.remove(
                "open"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            button.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            document.body.classList.remove(
                "menu-open"
            );


            var icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );
            }
        }


        function openMenu() {

            navigation.classList.add(
                "open"
            );

            button.setAttribute(
                "aria-expanded",
                "true"
            );

            button.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

            document.body.classList.add(
                "menu-open"
            );


            var icon =
                button.querySelector("i");

            if (icon) {

                icon.classList.remove(
                    "fa-bars"
                );

                icon.classList.add(
                    "fa-xmark"
                );
            }
        }


        button.addEventListener(
            "click",
            function () {

                var isOpen =
                    navigation.classList.contains(
                        "open"
                    );

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }
            }
        );


        /* -----------------------------------------------------
           Close after navigation link click
           ----------------------------------------------------- */

        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {
                        closeMenu();
                    }
                );
            });


        /* -----------------------------------------------------
           Escape closes menu
           ----------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    navigation.classList.contains(
                        "open"
                    )
                ) {
                    closeMenu();

                    button.focus();
                }
            }
        );


        /* -----------------------------------------------------
           Clicking outside closes menu
           ----------------------------------------------------- */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navigation.classList.contains(
                        "open"
                    )
                ) {
                    return;
                }

                if (
                    navigation.contains(
                        event.target
                    ) ||
                    button.contains(
                        event.target
                    )
                ) {
                    return;
                }

                closeMenu();
            }
        );


        /* -----------------------------------------------------
           Resize safety
           ----------------------------------------------------- */

        window.addEventListener(
            "resize",
            function () {

                if (
                    window.innerWidth > 900
                ) {
                    closeMenu();
                }
            }
        );
    }


    /* =========================================================
       SEARCH OVERLAY
       ========================================================= */

    function initSearch() {

        var button =
            document.getElementById(
                "searchButton"
            );

        var overlay =
            document.getElementById(
                "searchOverlay"
            );

        var closeButton =
            document.getElementById(
                "searchClose"
            );

        var input =
            document.getElementById(
                "siteSearch"
            );


        if (!button || !overlay) {
            return;
        }


        function openSearch() {

            overlay.classList.add(
                "active"
            );

            document.body.classList.add(
                "search-open"
            );

            if (input) {

                window.setTimeout(
                    function () {
                        input.focus();
                    },
                    80
                );
            }
        }


        function closeSearch() {

            overlay.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "search-open"
            );
        }


        button.addEventListener(
            "click",
            openSearch
        );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                closeSearch
            );
        }


        /* -----------------------------------------------------
           Clicking the dark/empty overlay closes it
           ----------------------------------------------------- */

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {
                    closeSearch();
                }
            }
        );


        /* -----------------------------------------------------
           Escape closes search
           ----------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    overlay.classList.contains(
                        "active"
                    )
                ) {
                    closeSearch();
                }
            }
        );


        /* -----------------------------------------------------
           Product page already has its own product-search
           behaviour. We therefore only provide the shared
           behaviour on pages where a product page controller
           is not present.
           ----------------------------------------------------- */

        if (
            input &&
            !document.getElementById(
                "productPage"
            )
        ) {

            input.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key !== "Enter"
                    ) {
                        return;
                    }

                    var query =
                        input.value.trim();

                    if (!query) {
                        return;
                    }


                    /*
                     * If the central product database is loaded,
                     * find an exact/partial product match.
                     */

                    if (
                        Array.isArray(
                            window.SVD_PRODUCT_LIST
                        )
                    ) {

                        var normalized =
                            query.toLowerCase();

                        var match =
                            window.SVD_PRODUCT_LIST.find(
                                function (product) {

                                    return (
                                        String(
                                            product.title || ""
                                        )
                                            .toLowerCase()
                                            .includes(
                                                normalized
                                            ) ||

                                        String(
                                            product.code || ""
                                        )
                                            .toLowerCase()
                                            .includes(
                                                normalized
                                            ) ||

                                        String(
                                            product.category || ""
                                        )
                                            .toLowerCase()
                                            .includes(
                                                normalized
                                            )
                                    );
                                }
                            );


                        if (match) {

                            window.location.href =
                                resolveSiteUrl(
                                    "product.html?product=" +
                                    encodeURIComponent(
                                        match.id
                                    )
                                );

                            return;
                        }
                    }


                    /*
                     * No exact product match.
                     *
                     * Send the visitor to the central
                     * collection rather than pretending a
                     * search result exists.
                     */

                    window.location.href =
                        resolveSiteUrl(
                            "collections/collections.html"
                        );
                }
            );
        }
    }


    /* =========================================================
       HERO SLIDER
       ========================================================= */

    function initHeroSlider() {

        var slider =
            document.querySelector(
                ".hero-slider"
            );

        if (!slider) {
            return;
        }


        var slides =
            slider.querySelectorAll(
                ".hero-slide"
            );

        if (!slides.length) {
            return;
        }


        var nextButton =
            document.getElementById(
                "heroNext"
            );

        var previousButton =
            document.getElementById(
                "heroPrev"
            );

        var dotsContainer =
            document.getElementById(
                "heroDots"
            );


        var currentIndex = 0;

        var autoplayTimer = null;

        var touchStartX = 0;

        var touchEndX = 0;


        /* -----------------------------------------------------
           Dots
           ----------------------------------------------------- */

        if (dotsContainer) {

            dotsContainer.innerHTML = "";

            slides.forEach(
                function (slide, index) {

                    var dot =
                        document.createElement(
                            "button"
                        );

                    dot.type =
                        "button";

                    dot.className =
                        "hero-dot";

                    dot.setAttribute(
                        "aria-label",
                        "Go to slide " +
                        (index + 1)
                    );

                    dot.addEventListener(
                        "click",
                        function () {

                            showSlide(
                                index
                            );
                        }
                    );

                    dotsContainer.appendChild(
                        dot
                    );
                }
            );
        }


        function updateDots() {

            if (!dotsContainer) {
                return;
            }

            var dots =
                dotsContainer.querySelectorAll(
                    ".hero-dot"
                );

            dots.forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                    dot.setAttribute(
                        "aria-current",
                        index === currentIndex
                            ? "true"
                            : "false"
                    );
                }
            );
        }


        function showSlide(index) {

            currentIndex =
                (index + slides.length) %
                slides.length;


            slides.forEach(
                function (slide, slideIndex) {

                    slide.classList.toggle(
                        "active",
                        slideIndex === currentIndex
                    );
                }
            );

            updateDots();
        }


        function nextSlide() {

            showSlide(
                currentIndex + 1
            );
        }


        function previousSlide() {

            showSlide(
                currentIndex - 1
            );
        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                nextSlide
            );
        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                previousSlide
            );
        }


        /* -----------------------------------------------------
           Keyboard controls
           ----------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "ArrowRight"
                ) {
                    nextSlide();
                }

                if (
                    event.key === "ArrowLeft"
                ) {
                    previousSlide();
                }
            }
        );


        /* -----------------------------------------------------
           Touch / swipe
           ----------------------------------------------------- */

        slider.addEventListener(
            "touchstart",
            function (event) {

                if (
                    !event.touches ||
                    !event.touches.length
                ) {
                    return;
                }

                touchStartX =
                    event.touches[0].clientX;
            },
            { passive: true }
        );


        slider.addEventListener(
            "touchend",
            function (event) {

                if (
                    !event.changedTouches ||
                    !event.changedTouches.length
                ) {
                    return;
                }

                touchEndX =
                    event.changedTouches[0].clientX;

                var distance =
                    touchStartX -
                    touchEndX;

                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }

                if (distance > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            },
            { passive: true }
        );


        /* -----------------------------------------------------
           Autoplay
           ----------------------------------------------------- */

        function stopAutoplay() {

            if (autoplayTimer) {

                clearInterval(
                    autoplayTimer
                );

                autoplayTimer = null;
            }
        }


        function startAutoplay() {

            stopAutoplay();

            if (slides.length <= 1) {
                return;
            }

            autoplayTimer =
                setInterval(
                    nextSlide,
                    5500
                );
        }


        slider.addEventListener(
            "mouseenter",
            stopAutoplay
        );


        slider.addEventListener(
            "mouseleave",
            startAutoplay
        );


        document.addEventListener(
            "visibilitychange",
            function () {

                if (
                    document.hidden
                ) {
                    stopAutoplay();
                } else {
                    startAutoplay();
                }
            }
        );


        /* -----------------------------------------------------
           Initial state
           ----------------------------------------------------- */

        showSlide(0);

        startAutoplay();
    }


    /* =========================================================
       TOAST SYSTEM
       ========================================================= */

    function showToast(message) {

        var toast =
            document.getElementById(
                "siteToast"
            );

        if (!toast) {

            console.info(
                "ShriVatsaDarbar:",
                message
            );

            return;
        }


        toast.textContent =
            message;

        toast.classList.add(
            "active"
        );


        clearTimeout(
            window.shrivatsaToastTimer
        );


        window.shrivatsaToastTimer =
            setTimeout(
                function () {

                    toast.classList.remove(
                        "active"
                    );

                },
                2400
            );
    }


    window.showToast =
        showToast;


    /* =========================================================
       COMING SOON
       ---------------------------------------------------------
       Existing pages use:
       showComingSoon("Wishlist")
       showComingSoon("Account")
       etc.
       ========================================================= */

    function showComingSoon(feature) {

        var name =
            feature || "This feature";

        showToast(
            name +
            " will be available soon."
        );
    }


    window.showComingSoon =
        showComingSoon;


    /* =========================================================
       NEWSLETTER HANDLER
       ---------------------------------------------------------
       Kept for compatibility with the current homepage.
       This does NOT pretend to create a real subscription.
       ========================================================= */

    function handleNewsletter(event) {

        if (event) {
            event.preventDefault();
        }

        var form =
            event &&
            event.target
                ? event.target
                : null;

        showToast(
            "Thank you for your interest in ShriVatsaDarbar."
        );


        if (form) {
            form.reset();
        }

        return false;
    }


    window.handleNewsletter =
        handleNewsletter;


    /* =========================================================
       BAG COUNT
       ---------------------------------------------------------
       The product and collection pages currently own their
       respective cart drawers.

       This shared controller therefore synchronizes ONLY the
       visible bag count and does not attach duplicate drawer
       handlers.
       ========================================================= */

    var CART_STORAGE_KEY =
        "shrivatsaDarbarFashionCart";


    function getStoredCart() {

        try {

            var raw =
                localStorage.getItem(
                    CART_STORAGE_KEY
                );

            if (!raw) {
                return [];
            }

            var parsed =
                JSON.parse(raw);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.warn(
                "Unable to read ShriVatsaDarbar cart:",
                error
            );

            return [];
        }
    }


    function getCartItemCount() {

        var cart =
            getStoredCart();

        return cart.reduce(
            function (total, item) {

                var quantity =
                    Number(
                        item.quantity
                    );

                if (
                    !Number.isFinite(
                        quantity
                    ) ||
                    quantity < 0
                ) {
                    return total;
                }

                return total + quantity;

            },
            0
        );
    }


    function updateBagCount() {

        var count =
            getCartItemCount();


        var counters =
            document.querySelectorAll(
                "#bagCount, .bag-count"
            );


        counters.forEach(
            function (counter) {

                counter.textContent =
                    String(count);
            }
        );
    }


    window.updateBagCount =
        updateBagCount;


    /* ---------------------------------------------------------
       Keep count synchronized if another page/controller
       changes localStorage.
       --------------------------------------------------------- */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                CART_STORAGE_KEY
            ) {
                updateBagCount();
            }
        }
    );


    /* ---------------------------------------------------------
       Custom event support for same-page cart controllers
       --------------------------------------------------------- */

    window.addEventListener(
        "svd:cart-updated",
        function () {
            updateBagCount();
        }
    );


    /* =========================================================
       GENERIC BAG BUTTON
       ---------------------------------------------------------
       If the current page has a cart drawer, its page-specific
       controller owns the button.

       If no cart drawer exists, do not create a fake checkout.
       Show a clear message instead.
       ========================================================= */

    function initGenericBagButton() {

        var button =
            document.getElementById(
                "shoppingBagButton"
            );

        if (!button) {
            return;
        }


        /*
         * Product and collection pages have their own
         * #cartDrawer controller.
         */

        var cartDrawer =
            document.getElementById(
                "cartDrawer"
            );

        if (cartDrawer) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                if (
                    getCartItemCount() > 0
                ) {

                    showToast(
                        "Your collection is ready. Please open a product to manage it."
                    );

                } else {

                    showToast(
                        "Your collection is currently empty."
                    );
                }
            }
        );
    }


    /* =========================================================
       ACCESSIBILITY — PREVENT BACKGROUND SCROLL
       ---------------------------------------------------------
       The CSS may already handle this, but this controller keeps
       the body state synchronized.
       ========================================================= */

    function syncBodyStates() {

        var menuOpen =
            document.querySelector(
                ".main-navigation.open"
            );

        var searchOpen =
            document.querySelector(
                ".search-overlay.active"
            );


        document.body.classList.toggle(
            "menu-open",
            !!menuOpen
        );

        document.body.classList.toggle(
            "search-open",
            !!searchOpen
        );
    }


    /* =========================================================
       INITIALIZATION
       ========================================================= */

    onReady(
        function () {

            /*
             * Footer is intentionally loaded first.
             * It is independent of the other controllers.
             */

            loadMasterFooter();


            /*
             * Shared UI
             */

            initMobileMenu();

            initSearch();

            initHeroSlider();

            initGenericBagButton();


            /*
             * Shared state
             */

            updateBagCount();

            syncBodyStates();


            /*
             * Allow other scripts/controllers to refresh
             * the bag count after their own initialization.
             */

            window.dispatchEvent(
                new CustomEvent(
                    "svd:shared-ready"
                )
            );
        }
    );


    /* =========================================================
       DEBUG / PUBLIC SITE CONFIG
       ========================================================= */

    window.SVD_SITE =
        window.SVD_SITE || {};

    window.SVD_SITE.root =
        siteRoot.href;

    window.SVD_SITE.resolveUrl =
        resolveSiteUrl;

})();
