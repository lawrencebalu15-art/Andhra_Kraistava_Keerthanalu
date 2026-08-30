import { supabase } from "./supabase.js";


/* ==========================================================
   HOME SLIDES CMS
========================================================== */


/* ==========================================================
   DOM
========================================================== */

const addSlideButton =
    document.getElementById("addSlideButton");

const emptyAddSlideButton =
    document.getElementById("emptyAddSlideButton");

const retrySlidesButton =
    document.getElementById("retrySlidesButton");

const slidesLoading =
    document.getElementById("slidesLoading");

const slidesError =
    document.getElementById("slidesError");

const slidesErrorMessage =
    document.getElementById("slidesErrorMessage");

const slidesEmpty =
    document.getElementById("slidesEmpty");

const slidesTableWrapper =
    document.getElementById("slidesTableWrapper");

const slidesTableBody =
    document.getElementById("slidesTableBody");

const slidesCount =
    document.getElementById("slidesCount");


/* ==========================================================
   MODAL
========================================================== */

const slideModal =
    document.getElementById("slideModal");

const slideModalTitle =
    document.getElementById("slideModalTitle");

const closeSlideModal =
    document.getElementById("closeSlideModal");

const cancelSlideButton =
    document.getElementById("cancelSlideButton");

const slideForm =
    document.getElementById("slideForm");


/* ==========================================================
   FORM
========================================================== */

const slideId =
    document.getElementById("slideId");

const slideImage =
    document.getElementById("slideImage");

const slideImagePreview =
    document.getElementById("slideImagePreview");

const slidePreviewImage =
    document.getElementById("slidePreviewImage");

const slideOrder =
    document.getElementById("slideOrder");

const slideActive =
    document.getElementById("slideActive");

const slideKicker =
    document.getElementById("slideKicker");

const slideTitle =
    document.getElementById("slideTitle");

const slideDescription =
    document.getElementById("slideDescription");

const slideButtonText =
    document.getElementById("slideButtonText");

const slideButtonUrl =
    document.getElementById("slideButtonUrl");

const saveSlideButton =
    document.getElementById("saveSlideButton");


/* ==========================================================
   DELETE MODAL
========================================================== */

const deleteSlideModal =
    document.getElementById("deleteSlideModal");

const cancelDeleteSlide =
    document.getElementById("cancelDeleteSlide");

const confirmDeleteSlide =
    document.getElementById("confirmDeleteSlide");

const deleteSlideMessage =
    document.getElementById("deleteSlideMessage");


/* ==========================================================
   STATE
========================================================== */

let slides = [];

let slideToDelete = null;

let currentEditingImagePath = null;


/* ==========================================================
   INIT
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupEvents();

        loadSlides();

    }
);


/* ==========================================================
   EVENTS
========================================================== */

function setupEvents() {

    addSlideButton?.addEventListener(
        "click",
        () => openAddSlideModal()
    );


    emptyAddSlideButton?.addEventListener(
        "click",
        () => openAddSlideModal()
    );


    retrySlidesButton?.addEventListener(
        "click",
        () => loadSlides()
    );


    closeSlideModal?.addEventListener(
        "click",
        closeSlideModalHandler
    );


    cancelSlideButton?.addEventListener(
        "click",
        closeSlideModalHandler
    );


    slideModal?.querySelectorAll(
        "[data-close-slide-modal]"
    ).forEach(element => {

        element.addEventListener(
            "click",
            closeSlideModalHandler
        );

    });


    slideForm?.addEventListener(
        "submit",
        handleFormSubmit
    );


    slideImage?.addEventListener(
        "change",
        handleImagePreview
    );


    cancelDeleteSlide?.addEventListener(
        "click",
        closeDeleteModal
    );


    confirmDeleteSlide?.addEventListener(
        "click",
        deleteSlide
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            if (
                slideModal &&
                !slideModal.hidden
            ) {

                closeSlideModalHandler();

            }


            if (
                deleteSlideModal &&
                !deleteSlideModal.hidden
            ) {

                closeDeleteModal();

            }

        }
    );

}


/* ==========================================================
   LOAD SLIDES
========================================================== */

async function loadSlides() {

    showLoading();

    try {

        const {
            data,
            error
        } = await supabase

            .from("home_slides")

            .select("*")

            .order(
                "slide_order",
                {
                    ascending: true
                }
            );


        if (error) {
            throw error;
        }


        slides =
            data || [];


        slidesCount.textContent =
            slides.length;


        renderSlides();


    } catch (error) {

        console.error(
            "[Home Slides] Load failed:",
            error
        );


        showError(
            error?.message ||
            "Unable to load home slides."
        );

    }

}


/* ==========================================================
   RENDER
========================================================== */

function renderSlides() {

    if (!slides.length) {

        showEmpty();

        return;

    }


    slidesTableBody.innerHTML =
        slides
            .map(
                slide =>
                    createSlideRow(slide)
            )
            .join("");


    slidesTableBody
        .querySelectorAll(
            "[data-edit-slide]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.editSlide;

                    const slide =
                        slides.find(
                            item =>
                                item.id === id
                        );

                    if (slide) {
                        openEditSlideModal(
                            slide
                        );
                    }

                }
            );

        });


    slidesTableBody
        .querySelectorAll(
            "[data-delete-slide]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        button.dataset.deleteSlide;

                    const slide =
                        slides.find(
                            item =>
                                item.id === id
                        );

                    if (slide) {
                        openDeleteModal(
                            slide
                        );
                    }

                }
            );

        });


    showTable();

}


/* ==========================================================
   SLIDE ROW
========================================================== */

function createSlideRow(slide) {

    const imageUrl =
        getSlidePublicUrl(
            slide.image_path
        );


    const status =
        slide.is_active
            ? `
                <span class="status-badge status-active">
                    Active
                </span>
              `
            : `
                <span class="status-badge status-inactive">
                    Inactive
                </span>
              `;


    return `

        <tr>

            <td>

                <span
                    class="home-slide-order"
                >
                    ${escapeHTML(
                        slide.slide_order
                    )}
                </span>

            </td>


            <td>

                <div
                    class="home-slide-table-image"
                >

                    ${
                        imageUrl
                            ? `
                                <img
                                    src="${escapeAttribute(
                                        imageUrl
                                    )}"
                                    alt="${escapeAttribute(
                                        slide.title
                                    )}"
                                >
                              `
                            : `
                                <div>
                                    <i class="fa-regular fa-image"></i>
                                </div>
                              `
                    }

                </div>

            </td>


            <td>

                <div class="home-slide-table-content">

                    ${
                        slide.kicker
                            ? `
                                <span>
                                    ${escapeHTML(
                                        slide.kicker
                                    )}
                                </span>
                              `
                            : ""
                    }


                    <strong>
                        ${escapeHTML(
                            slide.title
                        )}
                    </strong>


                    ${
                        slide.description
                            ? `
                                <p>
                                    ${escapeHTML(
                                        truncate(
                                            slide.description,
                                            100
                                        )
                                    )}
                                </p>
                              `
                            : ""
                    }

                </div>

            </td>


            <td>

                ${status}

            </td>


            <td>

                <div class="home-slide-actions">

                    <button
    type="button"
    class="table-action edit"
    data-edit-slide="${escapeAttribute(
        slide.id
    )}"
>
    <i class="fa-solid fa-pen"></i>
</button>


                    <button
    type="button"
    class="table-action delete"
    data-delete-slide="${escapeAttribute(
        slide.id
    )}"
>
    <i class="fa-solid fa-trash"></i>
</button>

                </div>

            </td>

        </tr>

    `;

}


/* ==========================================================
   ADD MODAL
========================================================== */

function openAddSlideModal() {

    slideForm.reset();


    slideId.value =
        "";


    slideOrder.value =
        getNextOrder();


    slideActive.checked =
        true;


    currentEditingImagePath =
        null;


    slideImage.required =
        true;


    slideImagePreview.hidden =
        true;


    slidePreviewImage.src =
        "";


    slideModalTitle.textContent =
        "Add Home Slide";


    saveSlideButton.textContent =
        "Save Home Slide";


    slideModal.hidden =
        false;


    document.body.classList.add(
        "home-slide-modal-open"
    );


    setTimeout(
        () => slideTitle?.focus(),
        50
    );

}


/* ==========================================================
   EDIT MODAL
========================================================== */

function openEditSlideModal(slide) {

    slideId.value =
        slide.id;


    slideOrder.value =
        slide.slide_order;


    slideActive.checked =
        slide.is_active;


    slideKicker.value =
        slide.kicker || "";


    slideTitle.value =
        slide.title || "";


    slideDescription.value =
        slide.description || "";


    slideButtonText.value =
        slide.button_text || "";


    slideButtonUrl.value =
        slide.button_url || "";


    currentEditingImagePath =
        slide.image_path;


    slideImage.required =
        false;


    const imageUrl =
        getSlidePublicUrl(
            slide.image_path
        );


    if (imageUrl) {

        slidePreviewImage.src =
            imageUrl;

        slideImagePreview.hidden =
            false;

    } else {

        slideImagePreview.hidden =
            true;

    }


    slideModalTitle.textContent =
        "Edit Home Slide";


    saveSlideButton.textContent =
        "Update Home Slide";


    slideModal.hidden =
        false;


    document.body.classList.add(
        "home-slide-modal-open"
    );

}


/* ==========================================================
   IMAGE PREVIEW
========================================================== */

function handleImagePreview() {

    const file =
        slideImage.files?.[0];


    if (!file) {

        if (currentEditingImagePath) {

            const currentUrl =
                getSlidePublicUrl(
                    currentEditingImagePath
                );

            slidePreviewImage.src =
                currentUrl;

            slideImagePreview.hidden =
                !currentUrl;

        } else {

            slideImagePreview.hidden =
                true;

        }

        return;

    }


    if (!file.type.startsWith("image/")) {

        showToast(
            "Please select an image file.",
            "error"
        );

        slideImage.value =
            "";

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        event => {

            slidePreviewImage.src =
                event.target.result;

            slideImagePreview.hidden =
                false;

        };


    reader.readAsDataURL(file);

}


/* ==========================================================
   SAVE
========================================================== */

async function handleFormSubmit(event) {

    event.preventDefault();


    const editing =
        Boolean(
            slideId.value
        );


    const file =
        slideImage.files?.[0];


    const title =
        slideTitle.value.trim();


    const order =
        Number(
            slideOrder.value
        );


    if (!title) {

        showToast(
            "Please enter a slide title.",
            "error"
        );

        slideTitle.focus();

        return;

    }


    if (
        !Number.isInteger(order) ||
        order < 1
    ) {

        showToast(
            "Please enter a valid slide order.",
            "error"
        );

        slideOrder.focus();

        return;

    }


    if (
        !editing &&
        !file
    ) {

        showToast(
            "Please select a slide image.",
            "error"
        );

        return;

    }


    setSaving(true);


    try {

        let imagePath =
            currentEditingImagePath;


        /* ==========================================
           UPLOAD NEW IMAGE
        ========================================== */

        if (file) {

            const extension =
                getFileExtension(
                    file.name
                );


            const uniqueName =
                `${crypto.randomUUID()}${extension}`;


            imagePath =
                `home-slides/${uniqueName}`;


            const {
                error: uploadError
            } = await supabase
                .storage
                .from("home-slides")
                .upload(
                    imagePath,
                    file,
                    {
                        cacheControl: "3600",
                        upsert: false,
                        contentType: file.type
                    }
                );


            if (uploadError) {
                throw uploadError;
            }

        }


        const payload = {

            image_path:
                imagePath,

            image_name:
                file?.name ||
                findExistingImageName(
                    slideId.value
                ) ||
                "home-slide",

            slide_order:
                order,

            kicker:
                slideKicker.value.trim() ||
                null,

            title:
                title,

            description:
                slideDescription.value.trim() ||
                null,

            button_text:
                slideButtonText.value.trim() ||
                null,

            button_url:
                slideButtonUrl.value.trim() ||
                null,

            is_active:
                slideActive.checked

        };


        /* ==========================================
           UPDATE
        ========================================== */

        if (editing) {

            const {
                error
            } = await supabase

                .from("home_slides")

                .update(payload)

                .eq(
                    "id",
                    slideId.value
                );


            if (error) {
                throw error;
            }


            /*
             * Delete old image only after the
             * database update succeeds.
             */

            if (
                file &&
                currentEditingImagePath &&
                currentEditingImagePath !== imagePath
            ) {

                await deleteStorageFile(
                    currentEditingImagePath
                );

            }


            showToast(
                "Home slide updated successfully.",
                "success"
            );

        }


        /* ==========================================
           INSERT
        ========================================== */

        else {

            const {
                error
            } = await supabase

                .from("home_slides")

                .insert(
                    payload
                );


            if (error) {

                /*
                 * If DB insertion fails after upload,
                 * remove the orphaned image.
                 */

                if (imagePath) {

                    await deleteStorageFile(
                        imagePath
                    );

                }

                throw error;
            }


            showToast(
                "Home slide created successfully.",
                "success"
            );

        }


        closeSlideModalHandler();

        await loadSlides();


    } catch (error) {

        console.error(
            "[Home Slides] Save failed:",
            error
        );


        showToast(
            error?.message ||
            "Unable to save the home slide.",
            "error"
        );

    } finally {

        setSaving(false);

    }

}


/* ==========================================================
   DELETE
========================================================== */

function openDeleteModal(slide) {

    slideToDelete =
        slide;


    deleteSlideMessage.textContent =
        `Delete "${slide.title}"? This will remove the slide and its image.`;


    deleteSlideModal.hidden =
        false;


    document.body.classList.add(
        "home-slide-modal-open"
    );

}


function closeDeleteModal() {

    deleteSlideModal.hidden =
        true;


    slideToDelete =
        null;


    if (
        !slideModal ||
        slideModal.hidden
    ) {

        document.body.classList.remove(
            "home-slide-modal-open"
        );

    }

}


async function deleteSlide() {

    if (!slideToDelete) {
        return;
    }


    confirmDeleteSlide.disabled =
        true;


    try {

        const {
            error
        } = await supabase

            .from("home_slides")

            .delete()

            .eq(
                "id",
                slideToDelete.id
            );


        if (error) {
            throw error;
        }


        if (slideToDelete.image_path) {

            await deleteStorageFile(
                slideToDelete.image_path
            );

        }


        showToast(
            "Home slide deleted.",
            "success"
        );


        closeDeleteModal();

        await loadSlides();


    } catch (error) {

        console.error(
            "[Home Slides] Delete failed:",
            error
        );


        showToast(
            error?.message ||
            "Unable to delete the home slide.",
            "error"
        );

    } finally {

        confirmDeleteSlide.disabled =
            false;

    }

}


/* ==========================================================
   STORAGE
========================================================== */

function getSlidePublicUrl(path) {

    if (!path) {
        return "";
    }


    /*
     * If a complete URL was somehow stored,
     * use it directly.
     */

    if (
        path.startsWith("http://") ||
        path.startsWith("https://")
    ) {

        return path;

    }


    const {
        data
    } = supabase

        .storage

        .from("home-slides")

        .getPublicUrl(
            path
        );


    return (
        data?.publicUrl ||
        ""
    );

}


async function deleteStorageFile(path) {

    if (!path) {
        return;
    }


    const {
        error
    } = await supabase

        .storage

        .from("home-slides")

        .remove([
            path
        ]);


    if (error) {

        console.warn(
            "[Home Slides] Storage delete failed:",
            error
        );

    }

}


/* ==========================================================
   HELPERS
========================================================== */

function getNextOrder() {

    if (!slides.length) {
        return 1;
    }


    const orders =
        slides
            .map(
                slide =>
                    Number(
                        slide.slide_order
                    )
            )
            .filter(
                Number.isFinite
            );


    if (!orders.length) {
        return 1;
    }


    return (
        Math.max(
            ...orders
        ) + 1
    );

}


function findExistingImageName(id) {

    const slide =
        slides.find(
            item =>
                item.id === id
        );


    return slide?.image_name || "";
}


function getFileExtension(filename) {

    const match =
        filename.match(
            /\.[^/.]+$/
        );


    return match
        ? match[0].toLowerCase()
        : ".jpg";

}


function truncate(
    value,
    length
) {

    if (
        !value ||
        value.length <= length
    ) {

        return value || "";

    }


    return (
        value.substring(
            0,
            length
        ).trim() +
        "…"
    );

}


/* ==========================================================
   MODAL
========================================================== */

function closeSlideModalHandler() {

    slideModal.hidden =
        true;


    slideForm.reset();


    slideId.value =
        "";


    slideImagePreview.hidden =
        true;


    slidePreviewImage.src =
        "";


    slideImage.required =
        true;


    currentEditingImagePath =
        null;


    document.body.classList.remove(
        "home-slide-modal-open"
    );

}


/* ==========================================================
   UI STATES
========================================================== */

function showLoading() {

    slidesLoading.hidden =
        false;

    slidesError.hidden =
        true;

    slidesEmpty.hidden =
        true;

    slidesTableWrapper.hidden =
        true;

}


function showError(message) {

    slidesLoading.hidden =
        true;

    slidesEmpty.hidden =
        true;

    slidesTableWrapper.hidden =
        true;

    slidesError.hidden =
        false;


    slidesErrorMessage.textContent =
        message;

}


function showEmpty() {

    slidesLoading.hidden =
        true;

    slidesError.hidden =
        true;

    slidesTableWrapper.hidden =
        true;

    slidesEmpty.hidden =
        false;

}


function showTable() {

    slidesLoading.hidden =
        true;

    slidesError.hidden =
        true;

    slidesEmpty.hidden =
        true;

    slidesTableWrapper.hidden =
        false;

}


/* ==========================================================
   SAVE STATE
========================================================== */

function setSaving(
    saving
) {

    if (!saveSlideButton) {
        return;
    }


    saveSlideButton.disabled =
        saving;


    saveSlideButton.textContent =
        saving
            ? "Saving..."
            : slideId.value
                ? "Update Home Slide"
                : "Save Home Slide";

}


/* ==========================================================
   TOAST
========================================================== */

function showToast(
    message,
    type = "success"
) {

    const container =
        document.getElementById(
            "toastContainer"
        );


    if (!container) {

        alert(message);

        return;

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `toast toast-${type}`;


    toast.innerHTML = `

        <span>
            ${
                type === "success"
                    ? "✓"
                    : "!"
            }
        </span>

        <p>
            ${escapeHTML(message)}
        </p>

    `;


    container.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.classList.add(
                "toast-hide"
            );


            setTimeout(
                () =>
                    toast.remove(),
                250
            );

        },
        3500
    );

}


/* ==========================================================
   SECURITY
========================================================== */

function escapeHTML(value) {

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


function escapeAttribute(value) {

    return escapeHTML(
        value
    );

}