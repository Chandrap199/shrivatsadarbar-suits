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
            "open"
        );

        overlay.setAttribute(
            "aria-hidden",
            "false"
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
            "open"
        );

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "search-open"
        );

    }


    function loadProductDatabase() {

        if (
            Array.isArray(
                window.SVD_PRODUCT_LIST
            )
        ) {

            return Promise.resolve();

        }


        return new Promise(
            function (resolve) {

                var existingScript =
                    document.querySelector(
                        'script[src*="products.js"]'
                    );


                if (existingScript) {

                    var waitForProducts =
                        setInterval(
                            function () {

                                if (
                                    Array.isArray(
                                        window.SVD_PRODUCT_LIST
                                    )
                                ) {

                                    clearInterval(
                                        waitForProducts
                                    );

                                    resolve();

                                }

                            },
                            50
                        );


                    setTimeout(
                        function () {

                            clearInterval(
                                waitForProducts
                            );

                            resolve();

                        },
                        3000
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


    function performSearch() {

        if (!input) {
            return;
        }


        var query =
            input.value.trim();


        if (!query) {
            return;
        }


        loadProductDatabase()
            .then(
                function () {

                    var normalized =
                        query.toLowerCase();


                    var products =
                        Array.isArray(
                            window.SVD_PRODUCT_LIST
                        )
                            ? window.SVD_PRODUCT_LIST
                            : [];


                    /*
                     * CATEGORY SEARCH
                     *
                     * "saree" / "sarees"
                     * "suit" / "suits"
                     */
                    if (
                        normalized === "saree" ||
                        normalized === "sarees"
                    ) {

                        window.location.href =
                            resolveSiteUrl(
                                "collections/collections.html?category=saree"
                            );

                        return;

                    }


                    if (
                        normalized === "suit" ||
                        normalized === "suits"
                    ) {

                        window.location.href =
                            resolveSiteUrl(
                                "collections/collections.html?category=suit"
                            );

                        return;

                    }


                    /*
                     * PRODUCT SEARCH
                     *
                     * Search title,
                     * product code,
                     * category,
                     * subtitle,
                     * collection,
                     * product ID.
                     */
                    var match =
                        products.find(
                            function (product) {

                                var title =
                                    String(
                                        product.title || ""
                                    ).toLowerCase();

                                var code =
                                    String(
                                        product.code || ""
                                    ).toLowerCase();

                                var category =
                                    String(
                                        product.category || ""
                                    ).toLowerCase();

                                var subtitle =
                                    String(
                                        product.subtitle || ""
                                    ).toLowerCase();

                                var collection =
                                    String(
                                        product.collection || ""
                                    ).toLowerCase();

                                var id =
                                    String(
                                        product.id || ""
                                    ).toLowerCase();


                                return (
                                    title.includes(
                                        normalized
                                    ) ||

                                    code.includes(
                                        normalized
                                    ) ||

                                    category.includes(
                                        normalized
                                    ) ||

                                    subtitle.includes(
                                        normalized
                                    ) ||

                                    collection.includes(
                                        normalized
                                    ) ||

                                    id.includes(
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


                    /*
                     * NO EXACT PRODUCT MATCH
                     *
                     * Send the customer to
                     * the complete collection
                     * instead of doing nothing.
                     */
                    window.location.href =
                        resolveSiteUrl(
                            "collections/collections.html"
                        );

                }
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
                    "open"
                )
            ) {

                closeSearch();

            }

        }
    );


    if (input) {

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    performSearch();

                }

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
       UNIVERSAL CART
       ---------------------------------------------------------
       One cart store for every page.
       Supports:
       - Homepage product cards
       - New Arrivals
       - Best Sellers
       - Collections
       - Product page cart drawer
       - Shared cart.html drawer
       ---------------------------------------------------------
       Important: uses event delegation so it remains compatible
       with the master header being replaced at runtime.
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


    function saveSharedCart(cart) {

        try {

            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(cart)
            );

        } catch (error) {

            console.warn(
                "Unable to save cart:",
                error
            );
        }

        updateBagCount();

        window.dispatchEvent(
            new CustomEvent(
                "svd:cart-updated"
            )
        );
    }


    function getCartItemCount() {

        return getStoredCart().reduce(
            function (total, item) {

                var quantity =
                    Number(item.quantity);

                if (
                    !Number.isFinite(quantity) ||
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


    function escapeCartHtml(value) {

        return String(value || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function getProductFromDatabase(id) {

        var productId =
            String(id || "").trim();

        if (!productId) {
            return null;
        }

        if (
            window.SVD_PRODUCTS &&
            window.SVD_PRODUCTS[productId]
        ) {
            return Object.assign(
                { id: productId },
                window.SVD_PRODUCTS[productId]
            );
        }

        if (
            Array.isArray(
                window.SVD_PRODUCT_LIST
            )
        ) {

            var match =
                window.SVD_PRODUCT_LIST.find(
                    function (product) {
                        return String(
                            product.id || ""
                        ) === productId;
                    }
                );

            if (match) {
                return Object.assign(
                    { id: productId },
                    match
                );
            }
        }

        return null;
    }


    function loadProductsForCart() {

        if (
            window.SVD_PRODUCTS ||
            Array.isArray(
                window.SVD_PRODUCT_LIST
            )
        ) {
            return Promise.resolve();
        }

        return new Promise(
            function (resolve) {

                var existing =
                    document.querySelector(
                        'script[src*="products.js"]'
                    );

                if (existing) {

                    if (
                        existing.dataset.svdCartProductsWait ===
                        "true"
                    ) {
                        resolve();
                        return;
                    }

                    existing.dataset.svdCartProductsWait =
                        "true";

                    var done = false;

                    function finish() {
                        if (done) {
                            return;
                        }
                        done = true;
                        resolve();
                    }

                    existing.addEventListener(
                        "load",
                        finish,
                        { once: true }
                    );

                    existing.addEventListener(
                        "error",
                        finish,
                        { once: true }
                    );

                    setTimeout(
                        finish,
                        2500
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

                script.onload = resolve;
                script.onerror = resolve;

                document.head.appendChild(
                    script
                );
            }
        );
    }


    function getProductInfoFromButton(button) {

        var card =
            button.closest(
                "[data-product-id], .product-card, .collection-product-card, .new-arrival-card, .best-seller-card"
            );

        var id =
            button.getAttribute(
                "data-add-product"
            ) ||
            button.getAttribute(
                "data-product-id"
            ) ||
            (card && card.getAttribute(
                "data-product-id"
            )) ||
            "";

        id = String(id).trim();

        var product =
            getProductFromDatabase(id);

        var imageElement =
            card && card.querySelector(
                "img"
            );

        var image =
            product && product.images &&
            product.images.length
                ? product.images[0]
                : (imageElement
                    ? imageElement.getAttribute("src")
                    : "");

        var title =
            product && product.title
                ? product.title
                : (card
                    ? card.getAttribute("data-product-name") ||
                      card.getAttribute("data-title") ||
                      (card.querySelector("h3, h2") || {}).textContent ||
                      ""
                    : "");

        var code =
            product && product.code
                ? product.code
                : (card
                    ? card.getAttribute("data-product-code") ||
                      ""
                    : "");

        var category =
            product && product.category
                ? product.category
                : (card
                    ? card.getAttribute("data-category") ||
                      ""
                    : "");

        return {
            id: id,
            title: String(title || "").trim(),
            code: String(code || "").trim(),
            category: String(category || "").trim(),
            image: image || ""
        };
    }


    async function addProductToUniversalCart(button) {

        var info =
            getProductInfoFromButton(button);

        if (!info.id) {

            showToast(
                "This product could not be added to your collection."
            );

            return false;
        }

        await loadProductsForCart();

        var databaseProduct =
            getProductFromDatabase(info.id);

        if (databaseProduct) {

            info.title =
                databaseProduct.title ||
                info.title;

            info.code =
                databaseProduct.code ||
                info.code;

            info.category =
                databaseProduct.category ||
                info.category;

            if (
                databaseProduct.images &&
                databaseProduct.images.length
            ) {
                info.image =
                    databaseProduct.images[0];
            }
        }

        var cart =
            getStoredCart();

        var existing =
            cart.find(
                function (item) {
                    return String(item.id) ===
                        String(info.id);
                }
            );

        if (existing) {

            existing.quantity =
                Number(existing.quantity || 0) + 1;

            if (info.title) {
                existing.title = info.title;
            }
            if (info.code) {
                existing.code = info.code;
            }
            if (info.category) {
                existing.category = info.category;
            }
            if (info.image) {
                existing.image = info.image;
            }

        } else {

            cart.push({
                id: info.id,
                title: info.title || info.id,
                code: info.code || info.id.toUpperCase(),
                category: info.category || "",
                image: info.image || "",
                quantity: 1
            });
        }

        saveSharedCart(cart);
        renderAllCartViews();

        showToast(
            existing
                ? "Added another item to your collection."
                : "Added to your collection."
        );

        return true;
    }


    function renderStandardCart() {

        var body =
            document.getElementById(
                "cartBody"
            );

        var footer =
            document.getElementById(
                "cartFooter"
            );

        var total =
            document.getElementById(
                "cartTotalItems"
            );

        if (!body) {
            return false;
        }

        var cart =
            getStoredCart();

        if (total) {
            total.textContent =
                String(getCartItemCount());
        }

        if (!cart.length) {

            body.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <strong>Your collection is empty</strong>
                    <span>Add beautiful pieces to your collection.</span>
                </div>
            `;

            if (footer) {
                footer.style.display = "none";
            }

            return true;
        }

        if (footer) {
            footer.style.display = "block";
        }

        body.innerHTML =
            cart.map(
                function (item) {
                    return `
                        <article class="cart-item">
                            <img
                                class="cart-item-image"
                                src="${escapeCartHtml(resolveSiteUrl(item.image || ""))}"
                                alt="${escapeCartHtml(item.title || "Product")}">

                            <div class="cart-item-details">
                                <h3>${escapeCartHtml(item.title || "Product")}</h3>
                                <div class="cart-item-code">
                                    ${escapeCartHtml(item.code || "")}
                                </div>

                                <div class="cart-item-controls">
                                    <button
                                        class="cart-qty-button"
                                        type="button"
                                        data-universal-cart-action="minus"
                                        data-id="${escapeCartHtml(item.id || "")}">−</button>

                                    <span class="cart-qty-value">
                                        ${Number(item.quantity || 0)}
                                    </span>

                                    <button
                                        class="cart-qty-button"
                                        type="button"
                                        data-universal-cart-action="plus"
                                        data-id="${escapeCartHtml(item.id || "")}">+</button>
                                </div>
                            </div>

                            <button
                                class="cart-remove"
                                type="button"
                                data-universal-cart-remove="${escapeCartHtml(item.id || "")}"\n                                aria-label="Remove item">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </article>
                    `;
                }
            )
            .join("");

        return true;
    }


    function renderPageSpecificCart() {

        var body =
            document.getElementById(
                "cartItems"
            );

        if (!body) {
            return false;
        }

        var cart =
            getStoredCart();

        if (!cart.length) {

            body.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <strong>Your collection is empty</strong>
                    <span>Add beautiful pieces to your collection.</span>
                </div>
            `;

            return true;
        }

        body.innerHTML =
            cart.map(
                function (item) {
                    return `
                        <article class="cart-item" data-cart-item-id="${escapeCartHtml(item.id || "")}">
                            <img
                                class="cart-item-image"
                                src="${escapeCartHtml(resolveSiteUrl(item.image || ""))}"
                                alt="${escapeCartHtml(item.title || "Product")}">

                            <div class="cart-item-details">
                                <h3>${escapeCartHtml(item.title || "Product")}</h3>
                                <div class="cart-item-code">
                                    ${escapeCartHtml(item.code || "")}
                                </div>

                                <div class="cart-item-controls">
                                    <button
                                        type="button"
                                        class="cart-qty-button"
                                        data-universal-cart-action="minus"
                                        data-id="${escapeCartHtml(item.id || "")}">−</button>

                                    <span class="cart-qty-value">
                                        ${Number(item.quantity || 0)}
                                    </span>

                                    <button
                                        type="button"
                                        class="cart-qty-button"
                                        data-universal-cart-action="plus"
                                        data-id="${escapeCartHtml(item.id || "")}">+</button>
                                </div>
                            </div>

                            <button
                                type="button"
                                class="cart-remove"
                                data-universal-cart-remove="${escapeCartHtml(item.id || "")}"\n                                aria-label="Remove item">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </article>
                    `;
                }
            )
            .join("");

        return true;
    }


    function renderAllCartViews() {

        renderStandardCart();
        renderPageSpecificCart();
        updateBagCount();
    }


    function changeUniversalCartQuantity(id, change) {

        var cart =
            getStoredCart();

        var item =
            cart.find(
                function (product) {
                    return String(product.id) ===
                        String(id);
                }
            );

        if (!item) {
            return;
        }

        item.quantity =
            Number(item.quantity || 0) +
            Number(change || 0);

        if (item.quantity <= 0) {
            cart = cart.filter(
                function (product) {
                    return String(product.id) !==
                        String(id);
                }
            );
        }

        saveSharedCart(cart);
        renderAllCartViews();
    }


    function removeUniversalCartItem(id) {

        var cart =
            getStoredCart().filter(
                function (item) {
                    return String(item.id) !==
                        String(id);
                }
            );

        saveSharedCart(cart);
        renderAllCartViews();
    }


    function openUniversalCart() {

        var drawer =
            document.getElementById(
                "cartDrawer"
            );

        var overlay =
            document.getElementById(
                "cartOverlay"
            );

        if (!drawer || !overlay) {
            loadSharedCart().then(
                function (loaded) {
                    if (loaded) {
                        openUniversalCart();
                    }
                }
            );
            return;
        }

        renderAllCartViews();

        drawer.classList.add("active");
        overlay.classList.add("active");
        drawer.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";
    }


    function closeUniversalCart() {

        var drawer =
            document.getElementById(
                "cartDrawer"
            );

        var overlay =
            document.getElementById(
                "cartOverlay"
            );

        if (drawer) {
            drawer.classList.remove("active");
            drawer.setAttribute(
                "aria-hidden",
                "true"
            );
        }

        if (overlay) {
            overlay.classList.remove("active");
        }

        document.body.style.overflow =
            "";
    }


    async function loadSharedCart() {

        if (
            document.getElementById(
                "cartDrawer"
            )
        ) {
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


    function sendUniversalCartToWhatsApp() {

        var cart =
            getStoredCart();

        if (!cart.length) {

            showToast(
                "Your collection is empty"
            );

            return;
        }

        var message =
            "Hello ShriVatsaDarbar,\n\n" +
            "I would like to enquire about the following products:\n\n";

        cart.forEach(
            function (item, index) {
                message +=
                    (index + 1) +
                    ". " +
                    (item.title || item.id) +
                    " (" +
                    (item.code || item.id) +
                    ") × " +
                    (item.quantity || 1) +
                    "\n";
            }
        );

        message +=
            "\nPlease share the price, availability, size options and final details.\n\nThank you.";

        window.open(
            "https://wa.me/918826196544?text=" +
            encodeURIComponent(message),
            "_blank",
            "noopener"
        );
    }


    function initUniversalCart() {

        /*
         * Capture-phase Add to Cart controller.
         * This runs before old page-specific handlers so all
         * product-list pages use the same localStorage cart.
         */
        document.addEventListener(
            "click",
            function (event) {

                var button =
                    event.target.closest(
                        "button, a"
                    );

                if (!button) {
                    return;
                }

                if (
                    button.id === "addToCartButton"
                ) {
                    /*
                     * product.html already has its own complete
                     * product-page cart controller. Leave its
                     * Add to Cart action untouched.
                     */
                    return;
                }

                var isAddButton =
                    button.matches(
                        ".universal-add-to-cart, .new-arrival-add, .best-seller-add, [data-add-product]"
                    );

                var isCollectionAdd =
                    button.closest(
                        ".collection-product-card"
                    ) &&
                    /add\s+(to|in)\s+(cart|bag)/i.test(
                        button.textContent || ""
                    );

                if (
                    !isAddButton &&
                    !isCollectionAdd
                ) {
                    return;
                }

                event.preventDefault();
                event.stopImmediatePropagation();

                addProductToUniversalCart(
                    button
                );
            },
            true
        );


        /*
         * Header bag button is delegated as well. This prevents
         * stale references when header.html replaces the header.
         */
        document.addEventListener(
            "click",
            function (event) {

                var bagButton =
                    event.target.closest(
                        "#shoppingBagButton"
                    );

                if (!bagButton) {
                    return;
                }

                event.preventDefault();
                event.stopImmediatePropagation();

                openUniversalCart();
            },
            true
        );


        /* Cart controls */
        document.addEventListener(
            "click",
            function (event) {

                var quantityButton =
                    event.target.closest(
                        "[data-universal-cart-action]"
                    );

                if (quantityButton) {

                    event.preventDefault();
                    event.stopImmediatePropagation();

                    var quantityId =
                        quantityButton.getAttribute(
                            "data-id"
                        );

                    var action =
                        quantityButton.getAttribute(
                            "data-universal-cart-action"
                        );

                    changeUniversalCartQuantity(
                        quantityId,
                        action === "plus"
                            ? 1
                            : -1
                    );

                    return;
                }

                var removeButton =
                    event.target.closest(
                        "[data-universal-cart-remove]"
                    );

                if (removeButton) {

                    event.preventDefault();
                    event.stopImmediatePropagation();

                    removeUniversalCartItem(
                        removeButton.getAttribute(
                            "data-universal-cart-remove"
                        )
                    );

                    return;
                }

                var closeButton =
                    event.target.closest(
                        "#cartClose"
                    );

                if (closeButton) {
                    event.preventDefault();
                    closeUniversalCart();
                    return;
                }

                var overlay =
                    event.target.closest(
                        "#cartOverlay"
                    );

                if (
                    overlay &&
                    event.target === overlay
                ) {
                    closeUniversalCart();
                    return;
                }

                var clearButton =
                    event.target.closest(
                        "#cartClear, #cartClearButton"
                    );

                if (clearButton) {

                    event.preventDefault();

                    if (!getStoredCart().length) {
                        return;
                    }

                    saveSharedCart([]);
                    renderAllCartViews();
                    showToast(
                        "Your collection has been cleared"
                    );

                    return;
                }

                var whatsappButton =
                    event.target.closest(
                        "#cartWhatsapp, #cartWhatsappButton"
                    );

                if (whatsappButton) {

                    event.preventDefault();
                    sendUniversalCartToWhatsApp();
                }
            },
            true
        );


        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Escape") {
                    closeUniversalCart();
                }
            }
        );


        window.addEventListener(
            "storage",
            function (event) {
                if (
                    event.key ===
                    CART_STORAGE_KEY
                ) {
                    renderAllCartViews();
                }
            }
        );


        window.addEventListener(
            "svd:cart-updated",
            function () {
                updateBagCount();
                renderAllCartViews();
            }
        );


        updateBagCount();
        renderAllCartViews();
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

        initUniversalCart();

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
