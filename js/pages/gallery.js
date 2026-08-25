import { supabase } from "../supabase.js";


/* ==========================================================
   DOM ELEMENTS
========================================================== */

const galleryGrid =
    document.getElementById("galleryGrid");

const loadingState =
    document.getElementById("galleryLoading");

const errorState =
    document.getElementById("galleryError");

const emptyState =
    document.getElementById("galleryEmpty");

const retryButton =
    document.getElementById("galleryRetry");


/* ==========================================================
   LIGHTBOX ELEMENTS
========================================================== */

const lightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("galleryLightboxImage");

const lightboxCaption =
    document.getElementById("galleryLightboxCaption");

const lightboxClose =
    document.getElementById("galleryLightboxClose");

const previousButton =
    document.getElementById("galleryPrevious");

const nextButton =
    document.getElementById("galleryNext");


/* ==========================================================
   STATE
========================================================== */

let galleryImages = [];

let currentImageIndex = 0;


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    loadGallery
);


/* ==========================================================
   LOAD GALLERY
========================================================== */

async function loadGallery() {

    showLoading();


    try {

        /*
         * Load only images from the existing media table.
         */

        const {
            data,
            error
        } = await supabase

            .from("media")

            .select(`
                id,
                file_name,
                storage_path,
                file_type,
                created_at
            `)

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {
            throw error;
        }


        /*
         * Only image files belong in the public gallery.
         */

        galleryImages =
            (data || [])

                .filter(media => {

                    return (
                        media.file_type &&
                        media.file_type
                            .toLowerCase()
                            .startsWith("image/")
                    );

                })

                .map(media => {

                    const {
                        data: publicUrlData
                    } = supabase

                        .storage

                        .from("media")

                        .getPublicUrl(
                            media.storage_path
                        );


                    return {

                        ...media,

                        publicUrl:
                            publicUrlData?.publicUrl || ""

                    };

                })

                .filter(
                    media => media.publicUrl
                );


        if (!galleryImages.length) {

            showEmpty();

            return;

        }


        renderGallery();


    } catch (error) {

        console.error(
            "Failed to load gallery:",
            error
        );

        showError();

    }

}


/* ==========================================================
   RENDER GALLERY
========================================================== */

function renderGallery() {

    galleryGrid.innerHTML =
        galleryImages

            .map(
                (image, index) =>
                    createGalleryItem(
                        image,
                        index
                    )
            )

            .join("");


    galleryGrid
        .querySelectorAll(
            ".gallery-item"
        )
        .forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            item.dataset.index
                        );

                    openLightbox(index);

                }
            );

        });


    hideStates();

    galleryGrid.classList.remove(
        "hidden"
    );

}


/* ==========================================================
   GALLERY ITEM
========================================================== */

function createGalleryItem(
    image,
    index
) {

    const title =
        getDisplayName(
            image.file_name
        );


    return `

        <button
            type="button"
            class="gallery-item"
            data-index="${index}"
            aria-label="Open ${escapeAttribute(title)}"
        >

            <img
                src="${escapeAttribute(image.publicUrl)}"
                alt="${escapeAttribute(title)}"
                loading="lazy"
                onerror="this.closest('.gallery-item').remove();"
            >


            <span class="gallery-overlay">

                <span class="gallery-view-icon">

                    <i class="fas fa-expand"></i>

                </span>

            </span>


            <span class="gallery-caption">

                ${escapeHtml(title)}

            </span>

        </button>

    `;

}


/* ==========================================================
   LIGHTBOX
========================================================== */

function openLightbox(index) {

    if (
        index < 0 ||
        index >= galleryImages.length
    ) {
        return;
    }


    currentImageIndex = index;


    updateLightbox();


    lightbox.classList.remove(
        "hidden"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "gallery-lightbox-open"
    );

}


function closeLightbox() {

    lightbox.classList.add(
        "hidden"
    );


    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "gallery-lightbox-open"
    );


    lightboxImage.src = "";

}


function updateLightbox() {

    const image =
        galleryImages[
            currentImageIndex
        ];


    if (!image) {
        return;
    }


    lightboxImage.src =
        image.publicUrl;


    lightboxImage.alt =
        getDisplayName(
            image.file_name
        );


    lightboxCaption.textContent =
        getDisplayName(
            image.file_name
        );

}


/* ==========================================================
   PREVIOUS / NEXT
========================================================== */

function showPreviousImage() {

    if (!galleryImages.length) {
        return;
    }


    currentImageIndex =
        (
            currentImageIndex -
            1 +
            galleryImages.length
        )
        %
        galleryImages.length;


    updateLightbox();

}


function showNextImage() {

    if (!galleryImages.length) {
        return;
    }


    currentImageIndex =
        (
            currentImageIndex +
            1
        )
        %
        galleryImages.length;


    updateLightbox();

}


/* ==========================================================
   LIGHTBOX EVENTS
========================================================== */

lightboxClose?.addEventListener(
    "click",
    closeLightbox
);


previousButton?.addEventListener(
    "click",
    showPreviousImage
);


nextButton?.addEventListener(
    "click",
    showNextImage
);


/*
 * Clicking the dark background closes
 * the lightbox.
 */

lightbox?.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/*
 * Keyboard navigation.
 */

document.addEventListener(
    "keydown",
    event => {

        if (
            lightbox.classList.contains(
                "hidden"
            )
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();

            return;

        }


        if (event.key === "ArrowLeft") {

            showPreviousImage();

            return;

        }


        if (event.key === "ArrowRight") {

            showNextImage();

        }

    }
);


/* ==========================================================
   RETRY
========================================================== */

retryButton?.addEventListener(
    "click",
    loadGallery
);


/* ==========================================================
   UI STATES
========================================================== */

function showLoading() {

    galleryGrid.classList.add(
        "hidden"
    );

    loadingState.classList.remove(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

}


function showError() {

    galleryGrid.classList.add(
        "hidden"
    );

    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.remove(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

}


function showEmpty() {

    galleryGrid.classList.add(
        "hidden"
    );

    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.remove(
        "hidden"
    );

}


function hideStates() {

    loadingState.classList.add(
        "hidden"
    );

    errorState.classList.add(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

}


/* ==========================================================
   HELPERS
========================================================== */

function getDisplayName(
    fileName
) {

    if (!fileName) {

        return "Historical Photograph";

    }


    /*
     * Remove extension.
     */

    return fileName

        .replace(
            /\.[^/.]+$/,
            ""
        )

        .replace(
            /[-_]+/g,
            " "
        )

        .replace(
            /\s+/g,
            " "
        )

        .trim();

}


function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


function escapeAttribute(
    value
) {

    return escapeHtml(
        value
    );

}