/* =========================================================
   ShriVatsaDarbar Fashion
   SHARED SITE CONTROLLER
   ---------------------------------------------------------
   Handles:
   - GitHub Pages paths
   - Master footer
   - Mobile navigation
   - Search
   - Hero slider
   - Wishlist
   - Newsletter email request
   - Shared bag count
   - Toast notifications
   ========================================================= */

(function () {

    "use strict";


    /* =========================================================
       SITE ROOT
    ========================================================= */

    var scriptElement = document.currentScript;

    var scriptUrl = scriptElement
        ? scriptElement.src
        : window.location.href;

    var siteRoot = new URL("./", scriptUrl);


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

        trimmed = trimmed.replace(/^\/+/, "");

        return new URL(trimmed, siteRoot).href;
    }


    window.SVD_SITE = window.SVD_SITE || {};

    window.SVD_SITE.root = siteRoot.href;

    window.SVD_SITE.resolveUrl = resolveSiteUrl;



    /* =========================================================
       DOM READY
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
   MASTER HEADER
   ---------------------------------------------------------
   Loads the shared announcement bar, header navigation,
   header actions and search overlay from header.html.
   ========================================================= */

function normalizeHeaderPaths(container) {

    if (!container) {
        return;
    }


    container
        .querySelectorAll("a[href]")
        .forEach(function (link) {

            var href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            link.setAttribute(
                "href",
                resolveSiteUrl(href)
            );

        });


    container
        .querySelectorAll("img[src]")
        .forEach(function (image) {

            var src =
                image.getAttribute("src");

            if (!src) {
                return;
            }

            image.setAttribute(
                "src",
                resolveSiteUrl(src)
            );

        });

}


async function loadMasterHeader() {

    var headerUrl =
        new URL(
            "header.html",
            siteRoot
        ).href;


    try {

        var response =
            await fetch(
                headerUrl,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Header request failed: " +
                response.status
            );

        }


        var html =
            await response.text();


        var parser =
            new DOMParser();


        var headerDocument =
            parser.parseFromString(
                html,
                "text/html"
            );


        var fetchedAnnouncement =
            headerDocument.querySelector(
                ".announcement-bar"
            );


        var fetchedHeader =
            headerDocument.querySelector(
                "header.site-header"
            );


        var fetchedSearch =
            headerDocument.querySelector(
                "#searchOverlay"
            );


        if (!fetchedHeader) {

            throw new Error(
                "Master header element not found"
            );

        }


        normalizeHeaderPaths(
            headerDocument
        );


        /*
         * -----------------------------------------------------
         * ANNOUNCEMENT BAR
         * -----------------------------------------------------
         */

        var existingAnnouncement =
            document.querySelector(
                ".announcement-bar"
            );


        if (
            existingAnnouncement &&
            fetchedAnnouncement
        ) {

            existingAnnouncement.replaceWith(
                fetchedAnnouncement
            );

        } else if (
            fetchedAnnouncement &&
            !existingAnnouncement
        ) {

            document.body.prepend(
                fetchedAnnouncement
            );

        }


        /*
         * -----------------------------------------------------
         * MAIN HEADER
         * -----------------------------------------------------
         */

        var existingHeader =
            document.querySelector(
                "header.site-header"
            );


        if (existingHeader) {

            existingHeader.replaceWith(
                fetchedHeader
            );

        } else {

            document.body.prepend(
                fetchedHeader
            );

        }


        /*
         * -----------------------------------------------------
         * SEARCH OVERLAY
         * -----------------------------------------------------
         */

        var existingSearch =
            document.getElementById(
                "searchOverlay"
            );


        if (existingSearch) {

            if (fetchedSearch) {

                existingSearch.replaceWith(
                    fetchedSearch
                );

            }

        } else if (fetchedSearch) {

            document.body.appendChild(
                fetchedSearch
            );

        }


    } catch (error) {

        console.error(
            "ShriVatsaDarbar header error:",
            error
        );

    }

}

   


    /* =========================================================
       MASTER FOOTER
    ========================================================= */

    function normalizeFooterPaths(container) {

        if (!container) {
            return;
        }


        container
            .querySelectorAll("a[href]")
            .forEach(function (link) {

                var href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                link.setAttribute(
                    "href",
                    resolveSiteUrl(href)
                );

            });


        container
            .querySelectorAll("img[src]")
            .forEach(function (image) {

                var src =
                    image.getAttribute("src");

                if (!src) {
                    return;
                }

                image.setAttribute(
                    "src",
                    resolveSiteUrl(src)
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


        if (
            placeholder &&
            placeholder.dataset.svdFooterLoaded === "true"
        ) {
            return;
        }


        var target =
            placeholder || existingFooter;


        if (!target) {
            return;
        }


        if (
            target.dataset &&
            target.dataset.svdFooterLoaded === "true"
        ) {
            return;
        }


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
                    "Footer element not found"
                );
            }


            normalizeFooterPaths(
                fetchedFooter
            );


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
                "ShriVatsaDarbar footer error:",
                error
            );

        }

    }



    /* =========================================================
       MOBILE MENU
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

            navigation.classList.remove("open");

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

            navigation.classList.add("open");

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

                if (
                    navigation.classList.contains(
                        "open"
                    )
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });


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

                }

            }
        );


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


        window.addEventListener(
            "resize",
            function () {

                if (window.innerWidth > 900) {
                    closeMenu();
                }

            }
        );

    }



    /* =========================================================
       SEARCH
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

                setTimeout(
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
                                            )

                                        ||

                                        String(
                                            product.code || ""
                                        )
                                            .toLowerCase()
                                            .includes(
                                                normalized
                                            )

                                        ||

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
       ---------------------------------------------------------
       Supports BOTH:
       heroPrev / heroNext / heroDots
       AND:
       sliderPrev / sliderNext / sliderDots

       This makes the controller compatible with
       the current homepage without changing its design.
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
            ) ||
            document.getElementById(
                "sliderNext"
            );


        var previousButton =
            document.getElementById(
                "heroPrev"
            ) ||
            document.getElementById(
                "sliderPrev"
            );


        var dotsContainer =
            document.getElementById(
                "heroDots"
            ) ||
            document.getElementById(
                "sliderDots"
            );


        var currentIndex = 0;

        var autoplayTimer = null;

        var touchStartX = 0;

        var touchEndX = 0;



        /* -----------------------------------------------------
           CREATE DOTS
        ----------------------------------------------------- */

        if (dotsContainer) {

            dotsContainer.innerHTML = "";


            slides.forEach(
                function (slide, index) {

                    var dot =
                        document.createElement(
                            "button"
                        );


                    dot.type = "button";

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

                            showSlide(index);

                            restartAutoplay();

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


            dotsContainer
                .querySelectorAll(
                    ".hero-dot"
                )
                .forEach(
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
                function () {

                    nextSlide();

                    restartAutoplay();

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    previousSlide();

                    restartAutoplay();

                }
            );

        }



        /* -----------------------------------------------------
           KEYBOARD
        ----------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

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



        /* -----------------------------------------------------
           MOBILE SWIPE
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
            {
                passive: true
            }
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


                restartAutoplay();

            },
            {
                passive: true
            }
        );



        /* -----------------------------------------------------
           AUTOPLAY
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
                    5000
                );

        }


        function restartAutoplay() {

            startAutoplay();

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

                if (document.hidden) {

                    stopAutoplay();

                } else {

                    startAutoplay();

                }

            }
        );


        showSlide(0);

        startAutoplay();

    }



    /* =========================================================
       TOAST
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
                2600
            );

    }


    window.showToast =
        showToast;



    /* =========================================================
       WISHLIST
       ---------------------------------------------------------
       Shared across the entire site.
    ========================================================= */

    var WISHLIST_STORAGE_KEY =
        "shrivatsaDarbarWishlist";


    function getWishlist() {

        try {

            var raw =
                localStorage.getItem(
                    WISHLIST_STORAGE_KEY
                );


            if (!raw) {
                return [];
            }


            var parsed =
                JSON.parse(raw);


            if (!Array.isArray(parsed)) {
                return [];
            }


            return parsed.filter(
                function (id) {
                    return (
                        typeof id === "string" &&
                        id.trim() !== ""
                    );
                }
            );


        } catch (error) {

            console.warn(
                "Unable to read wishlist:",
                error
            );


            return [];

        }

    }



    function saveWishlist(items) {

        try {

            localStorage.setItem(
                WISHLIST_STORAGE_KEY,
                JSON.stringify(items)
            );


            window.dispatchEvent(
                new CustomEvent(
                    "svd:wishlist-updated"
                )
            );


        } catch (error) {

            console.warn(
                "Unable to save wishlist:",
                error
            );

        }

    }



    function isInWishlist(productId) {

        return getWishlist().includes(
            String(productId)
        );

    }



    function addToWishlist(productId) {

        var id =
            String(productId || "").trim();


        if (!id) {
            return false;
        }


        var wishlist =
            getWishlist();


        if (
            !wishlist.includes(id)
        ) {

            wishlist.push(id);

            saveWishlist(wishlist);

        }


        return true;

    }



    function removeFromWishlist(productId) {

        var id =
            String(productId || "").trim();


        var wishlist =
            getWishlist().filter(
                function (item) {
                    return item !== id;
                }
            );


        saveWishlist(wishlist);

    }



    function toggleWishlist(productId) {

        var id =
            String(productId || "").trim();


        if (!id) {

            showToast(
                "This product could not be added to your wishlist."
            );

            return;

        }


        if (isInWishlist(id)) {

            removeFromWishlist(id);

            showToast(
                "Removed from your wishlist."
            );

        } else {

            addToWishlist(id);

            showToast(
                "Added to your wishlist."
            );

        }


        updateWishlistButtons();

        updateWishlistCount();

    }



    window.getSVDWishlist =
        getWishlist;


    window.isSVDWishlisted =
        isInWishlist;


    window.toggleSVDWishlist =
        toggleWishlist;


    window.removeSVDWishlist =
        removeFromWishlist;



    /* =========================================================
       FIND PRODUCT ID FROM A WISHLIST BUTTON
    ========================================================= */

    function getWishlistProductId(button) {

        if (!button) {
            return "";
        }


        var id =
            button.getAttribute(
                "data-wishlist-product"
            );


        if (id) {
            return id;
        }


        var card =
            button.closest(
                "[data-product-id]"
            );


        if (card) {

            id =
                card.getAttribute(
                    "data-product-id"
                );


            if (id) {
                return id;
            }

        }


        var link =
            button.closest(
                ".product-card, .collection-card, article"
            );


        if (link) {

            var productLink =
                link.querySelector(
                    'a[href*="product.html?product="]'
                );


            if (productLink) {

                var href =
                    productLink.getAttribute(
                        "href"
                    );


                var match =
                    href &&
                    href.match(
                        /product=([^&]+)/i
                    );


                if (match) {

                    return decodeURIComponent(
                        match[1]
                    );

                }

            }

        }


        return "";

    }



    /* =========================================================
       UPDATE HEART STATES
    ========================================================= */

    function updateWishlistButtons() {

        var wishlist =
            getWishlist();


        document
            .querySelectorAll(
                ".product-wishlist, .collection-wishlist, .best-seller-wishlist, [data-wishlist-product]"
            )
            .forEach(
                function (button) {

                    var id =
                        getWishlistProductId(
                            button
                        );


                    var active =
                        id &&
                        wishlist.includes(id);


                    button.classList.toggle(
                        "is-wishlisted",
                        !!active
                    );


                    var icon =
                        button.querySelector(
                            "i"
                        );


                    if (icon) {

                        icon.classList.toggle(
                            "fa-regular",
                            !active
                        );


                        icon.classList.toggle(
                            "fa-solid",
                            !!active
                        );


                        icon.classList.toggle(
                            "fa-heart",
                            true
                        );

                    }


                    button.setAttribute(
                        "aria-pressed",
                        active
                            ? "true"
                            : "false"
                    );

                }
            );



        var headerButton =
            document.querySelector(
                "#wishlistButton, .icon-button[aria-label='Wishlist'], .icon-button[aria-label='Open Wishlist']"
            );


        if (headerButton) {

            var headerIcon =
                headerButton.querySelector(
                    "i"
                );


            var hasItems =
                wishlist.length > 0;


            headerButton.classList.toggle(
                "is-wishlisted",
                hasItems
            );


            if (headerIcon) {

                headerIcon.classList.toggle(
                    "fa-regular",
                    !hasItems
                );


                headerIcon.classList.toggle(
                    "fa-solid",
                    hasItems
                );

            }

        }

    }



    /* =========================================================
       PRODUCT DATA
       ---------------------------------------------------------
       Loads products.js when needed for wishlist rendering.
    ========================================================= */

    function loadProductsData() {

        return new Promise(
            function (resolve) {

                if (
                    window.SVD_PRODUCTS ||
                    window.SVD_PRODUCT_LIST
                ) {

                    resolve();

                    return;

                }


                var existing =
                    document.querySelector(
                        'script[src*="products.js"]'
                    );


                if (existing) {

                    existing.addEventListener(
                        "load",
                        function () {
                            resolve();
                        },
                        {
                            once: true
                        }
                    );


                    setTimeout(
                        resolve,
                        1200
                    );


                    return;

                }


                var script =
                    document.createElement(
                        "script"
                    );


                script.src =
                    resolveSiteUrl(
                        "products.js"
                    );


                script.onload =
                    function () {
                        resolve();
                    };


                script.onerror =
                    function () {
                        resolve();
                    };


                document.head.appendChild(
                    script
                );

            }
        );

    }



    function getWishlistProduct(productId) {

        var id =
            String(productId || "");


        if (
            window.SVD_PRODUCTS &&
            window.SVD_PRODUCTS[id]
        ) {

            var product =
                window.SVD_PRODUCTS[id];


            return Object.assign(
                {
                    id: id
                },
                product
            );

        }


        return {
            id: id,

            title:
                id
                    .replace(
                        /^saree-/i,
                        "Saree "
                    )
                    .replace(
                        /^suit-/i,
                        "Suit "
                    ),

            category:
                id.startsWith("saree-")
                    ? "Saree"
                    : "Suit",

            code:
                id.toUpperCase(),

            images: []

        };

    }



    /* =========================================================
       WISHLIST DRAWER
    ========================================================= */

    function ensureWishlistStyles() {

        if (
            document.getElementById(
                "svdWishlistStyles"
            )
        ) {
            return;
        }


        var style =
            document.createElement(
                "style"
            );


        style.id =
            "svdWishlistStyles";


        style.textContent = `

            .svd-wishlist-overlay {
                position: fixed;
                inset: 0;
                background: rgba(35, 5, 10, .48);
                z-index: 99990;
                opacity: 0;
                visibility: hidden;
                transition: opacity .25s ease,
                            visibility .25s ease;
            }

            .svd-wishlist-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .svd-wishlist-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: min(430px, 94vw);
                height: 100vh;
                background: #fffdf9;
                z-index: 99991;
                transform: translateX(105%);
                transition: transform .3s ease;
                box-shadow: -12px 0 40px rgba(50, 5, 15, .18);
                display: flex;
                flex-direction: column;
            }

            .svd-wishlist-drawer.active {
                transform: translateX(0);
            }

            .svd-wishlist-header {
                padding: 24px 22px;
                background: #4b0713;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .svd-wishlist-header h2 {
                margin: 0;
                font-family: Georgia, serif;
                font-size: 27px;
                font-weight: 500;
            }

            .svd-wishlist-close {
                width: 40px;
                height: 40px;
                border: 1px solid rgba(255,255,255,.35);
                border-radius: 50%;
                background: transparent;
                color: #fff;
                cursor: pointer;
                font-size: 18px;
            }

            .svd-wishlist-body {
                flex: 1;
                overflow-y: auto;
                padding: 18px;
            }

            .svd-wishlist-empty {
                min-height: 280px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: #71665f;
            }

            .svd-wishlist-empty i {
                font-size: 46px;
                color: #a4772d;
                margin-bottom: 18px;
            }

            .svd-wishlist-empty h3 {
                margin: 0 0 8px;
                color: #4b0713;
                font-family: Georgia, serif;
                font-size: 24px;
            }

            .svd-wishlist-item {
                display: grid;
                grid-template-columns: 82px 1fr 36px;
                gap: 13px;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid #eadfce;
            }

            .svd-wishlist-image {
                width: 82px;
                height: 100px;
                object-fit: cover;
                border-radius: 8px;
                background: #f2eadf;
            }

            .svd-wishlist-info h3 {
                margin: 0 0 5px;
                color: #4b0713;
                font-family: Georgia, serif;
                font-size: 18px;
                line-height: 1.2;
            }

            .svd-wishlist-info p {
                margin: 0 0 8px;
                color: #766d65;
                font-size: 12px;
            }

            .svd-wishlist-view {
                color: #9b7129;
                font-size: 12px;
                font-weight: 600;
                text-decoration: none;
            }

            .svd-wishlist-remove {
                border: 0;
                background: transparent;
                color: #7a2635;
                cursor: pointer;
                font-size: 17px;
            }

            .svd-wishlist-footer {
                padding: 16px 20px 20px;
                border-top: 1px solid #eadfce;
                background: #fbf6ee;
            }

            .svd-wishlist-footer p {
                margin: 0;
                color: #766d65;
                font-size: 12px;
                line-height: 1.5;
            }

            @media (max-width: 480px) {
                .svd-wishlist-drawer {
                    width: 100vw;
                }
            }

        `;


        document.head.appendChild(
            style
        );

    }



    function ensureWishlistDrawer() {

        if (
            document.getElementById(
                "svdWishlistDrawer"
            )
        ) {
            return;
        }


        ensureWishlistStyles();


        var overlay =
            document.createElement(
                "div"
            );


        overlay.id =
            "svdWishlistOverlay";


        overlay.className =
            "svd-wishlist-overlay";


        var drawer =
            document.createElement(
                "aside"
            );


        drawer.id =
            "svdWishlistDrawer";


        drawer.className =
            "svd-wishlist-drawer";


        drawer.setAttribute(
            "aria-label",
            "Wishlist"
        );


        drawer.innerHTML = `

            <div class="svd-wishlist-header">

                <h2>
                    My Wishlist
                </h2>

                <button
                    type="button"
                    class="svd-wishlist-close"
                    aria-label="Close wishlist">
                    <i class="fa-solid fa-xmark"></i>
                </button>

            </div>

            <div
                class="svd-wishlist-body"
                id="svdWishlistBody">
            </div>

            <div class="svd-wishlist-footer">

                <p>
                    Your wishlist is saved on this device
                    so you can return to your favourite pieces.
                </p>

            </div>

        `;


        document.body.appendChild(
            overlay
        );


        document.body.appendChild(
            drawer
        );


        overlay.addEventListener(
            "click",
            closeWishlist
        );


        drawer
            .querySelector(
                ".svd-wishlist-close"
            )
            .addEventListener(
                "click",
                closeWishlist
            );


        drawer.addEventListener(
            "click",
            function (event) {

                var removeButton =
                    event.target.closest(
                        "[data-wishlist-remove]"
                    );


                if (removeButton) {

                    removeFromWishlist(
                        removeButton.getAttribute(
                            "data-wishlist-remove"
                        )
                    );


                    renderWishlist();

                    updateWishlistButtons();

                    updateWishlistCount();

                    return;

                }

            }
        );

    }



    async function renderWishlist() {

        ensureWishlistDrawer();


        var body =
            document.getElementById(
                "svdWishlistBody"
            );


        if (!body) {
            return;
        }


        var wishlist =
            getWishlist();


        if (!wishlist.length) {

            body.innerHTML = `

                <div class="svd-wishlist-empty">

                    <i class="fa-regular fa-heart"></i>

                    <h3>
                        Your wishlist is empty
                    </h3>

                    <p>
                        Tap the heart on any product
                        you love to save it here.
                    </p>

                </div>

            `;


            return;

        }


        await loadProductsData();


        body.innerHTML = "";


        wishlist.forEach(
            function (id) {

                var product =
                    getWishlistProduct(id);


                var image =
                    product.images &&
                    product.images.length
                        ? product.images[0]
                        : "";


                var imageUrl =
                    image
                        ? resolveSiteUrl(image)
                        : "";


                var item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "svd-wishlist-item";


                item.innerHTML = `

                    ${
                        imageUrl
                            ? `
                                <img
                                    class="svd-wishlist-image"
                                    src="${imageUrl}"
                                    alt="${escapeHtml(
                                        product.title || id
                                    )}">
                              `
                            : `
                                <div
                                    class="svd-wishlist-image">
                                </div>
                              `
                    }


                    <div class="svd-wishlist-info">

                        <h3>
                            ${escapeHtml(
                                product.title || id
                            )}
                        </h3>

                        <p>
                            ${escapeHtml(
                                product.code ||
                                product.category ||
                                ""
                            )}
                        </p>

                        <a
                            class="svd-wishlist-view"
                            href="${resolveSiteUrl(
                                "product.html?product=" +
                                encodeURIComponent(id)
                            )}">

                            View Product
                            <i class="fa-solid fa-arrow-right"></i>

                        </a>

                    </div>


                    <button
                        type="button"
                        class="svd-wishlist-remove"
                        data-wishlist-remove="${escapeHtml(id)}"
                        aria-label="Remove from wishlist">

                        <i class="fa-solid fa-trash-can"></i>

                    </button>

                `;


                body.appendChild(
                    item
                );

            }
        );

    }



    function escapeHtml(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }



    async function openWishlist() {

        ensureWishlistDrawer();


        var overlay =
            document.getElementById(
                "svdWishlistOverlay"
            );


        var drawer =
            document.getElementById(
                "svdWishlistDrawer"
            );


        await renderWishlist();


        overlay.classList.add(
            "active"
        );


        drawer.classList.add(
            "active"
        );


        document.body.classList.add(
            "svd-wishlist-open"
        );

    }



    function closeWishlist() {

        var overlay =
            document.getElementById(
                "svdWishlistOverlay"
            );


        var drawer =
            document.getElementById(
                "svdWishlistDrawer"
            );


        if (overlay) {

            overlay.classList.remove(
                "active"
            );

        }


        if (drawer) {

            drawer.classList.remove(
                "active"
            );

        }


        document.body.classList.remove(
            "svd-wishlist-open"
        );

    }



    window.openWishlist =
        openWishlist;


    window.closeWishlist =
        closeWishlist;



    /* =========================================================
       WISHLIST COUNT
    ========================================================= */

    function updateWishlistCount() {

        var count =
            getWishlist().length;


        document
            .querySelectorAll(
                ".wishlist-count"
            )
            .forEach(
                function (element) {

                    element.textContent =
                        String(count);

                }
            );

    }



    /* =========================================================
       WISHLIST CLICK CONTROLLER
       ---------------------------------------------------------
       Capture phase deliberately intercepts old page-specific
       "showComingSoon('Wishlist')" handlers.
    ========================================================= */

    function initWishlistController() {

        document.addEventListener(
            "click",
            function (event) {

                var button =
                    event.target.closest(
                        ".product-wishlist, .collection-wishlist, .best-seller-wishlist, [data-wishlist-product]"
                    );


                if (button) {

                    event.preventDefault();

                    event.stopImmediatePropagation();


                    var id =
                        getWishlistProductId(
                            button
                        );


                    if (id) {

                        toggleWishlist(id);

                    }


                    return;

                }


                var headerWishlist =
                    event.target.closest(
                        "#wishlistButton, .icon-button[aria-label='Wishlist'], .icon-button[aria-label='Open Wishlist']"
                    );


                if (headerWishlist) {

                    event.preventDefault();

                    event.stopImmediatePropagation();

                    openWishlist();

                }

            },
            true
        );


        window.addEventListener(
            "svd:wishlist-updated",
            function () {

                updateWishlistButtons();

                updateWishlistCount();

            }
        );


        window.addEventListener(
            "storage",
            function (event) {

                if (
                    event.key ===
                    WISHLIST_STORAGE_KEY
                ) {

                    updateWishlistButtons();

                    updateWishlistCount();

                }

            }
        );

    }



    /* =========================================================
       COMING SOON
       ---------------------------------------------------------
       Wishlist is NO LONGER coming soon.
    ========================================================= */

    function showComingSoon(feature) {

        if (
            String(feature || "")
                .toLowerCase() ===
            "wishlist"
        ) {

            openWishlist();

            return;

        }


        var name =
            feature ||
            "This feature";


        showToast(
            name +
            " will be available soon."
        );

    }


    window.showComingSoon =
        showComingSoon;



    /* =========================================================
       NEWSLETTER
       ---------------------------------------------------------
       Static GitHub Pages site:
       creates a real email request using mailto.
    ========================================================= */

    function handleNewsletter(event) {

        if (event) {
            event.preventDefault();
        }


        var form =
            event &&
            event.target
                ? event.target
                : document.getElementById(
                    "newsletterForm"
                );


        if (!form) {
            return false;
        }


        var input =
            form.querySelector(
                'input[type="email"]'
            );


        if (!input) {
            return false;
        }


        var email =
            input.value.trim();


        if (!email) {

            showToast(
                "Please enter your email address."
            );

            input.focus();

            return false;

        }


        var subject =
            encodeURIComponent(
                "ShriVatsaDarbar Email Updates Subscription"
            );


        var body =
            encodeURIComponent(
                "Hello ShriVatsaDarbar Team,\n\n" +
                "I would like to receive ShriVatsaDarbar " +
                "new-arrival and collection updates.\n\n" +
                "My email address is:\n" +
                email +
                "\n\nThank you."
            );


        var mailto =
            "mailto:shrivatsadarbar@gmail.com" +
            "?subject=" +
            subject +
            "&body=" +
            body;


        window.location.href =
            mailto;


        showToast(
            "Your email app is opening to send the subscription request."
        );


        return false;

    }


    window.handleNewsletter =
        handleNewsletter;



    /* =========================================================
       BAG COUNT
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
                "Unable to read cart:",
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


        document
            .querySelectorAll(
                "#bagCount, .bag-count"
            )
            .forEach(
                function (counter) {

                    counter.textContent =
                        String(count);

                }
            );

    }


    window.updateBagCount =
        updateBagCount;



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


    window.addEventListener(
        "svd:cart-updated",
        updateBagCount
    );



    /* =========================================================
    /* =========================================================
   SHARED CART
   ---------------------------------------------------------
   Loads the shared cart drawer and opens it from the
   master header shopping-bag button.
========================================================= */

async function loadSharedCart() {

    var existingCart =
        document.getElementById("cartDrawer");

    if (existingCart) {
        return true;
    }


    var cartUrl =
        new URL(
            "cart.html",
            siteRoot
        ).href;


    try {

        var response =
            await fetch(
                cartUrl,
                {
                    cache: "no-cache"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Cart request failed: " +
                response.status
            );

        }


        var html =
            await response.text();


        var parser =
            new DOMParser();


        var cartDocument =
            parser.parseFromString(
                html,
                "text/html"
            );


        var cartDrawer =
            cartDocument.getElementById(
                "cartDrawer"
            );


        var cartOverlay =
            cartDocument.getElementById(
                "cartOverlay"
            );


        if (!cartDrawer) {

            throw new Error(
                "Cart drawer not found"
            );

        }


        if (cartOverlay) {

            document.body.appendChild(
                cartOverlay
            );

        }


        document.body.appendChild(
            cartDrawer
        );


        return true;


    } catch (error) {

        console.error(
            "ShriVatsaDarbar cart error:",
            error
        );


        return false;

    }

}


async function initGenericBagButton() {

    var button =
        document.getElementById(
            "shoppingBagButton"
        );


    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        async function () {

            var loaded =
                await loadSharedCart();


            if (!loaded) {

                showToast(
                    "Unable to open your collection. Please try again."
                );

                return;

            }


            var cartDrawer =
                document.getElementById(
                    "cartDrawer"
                );


            var cartOverlay =
                document.getElementById(
                    "cartOverlay"
                );


            if (cartOverlay) {

                cartOverlay.classList.add(
                    "active"
                );

            }


            if (cartDrawer) {

                cartDrawer.classList.add(
                    "active"
                );

                cartDrawer.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }


            document.body.classList.add(
                "cart-open"
            );

        }
    );

}


    /* =========================================================
       INITIALIZATION
    ========================================================= */

    onReady(
    async function () {

        /*
         * Load the Master Header first.
         * Header controls must exist before their
         * JavaScript controllers are initialized.
         */

        await loadMasterHeader();


        /*
         * Load the Master Footer.
         */

        await loadMasterFooter();


        /*
         * Initialize shared site functionality.
         */

        initMobileMenu();

        initSearch();

        initHeroSlider();

        initWishlistController();

        initGenericBagButton();

        updateBagCount();

        updateWishlistButtons();

        updateWishlistCount();


        /*
         * Tell page-level scripts that the shared
         * site components are ready.
         */

        window.dispatchEvent(
            new CustomEvent(
                "svd:shared-ready"
            )
        );

    }
);

})();
