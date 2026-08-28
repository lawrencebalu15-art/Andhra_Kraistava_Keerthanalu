/* ==========================================
   MEDIA MANAGER
   Supabase Storage Version
========================================== */

import { supabase } from "./supabase.js";


/* ==========================================
   STATE
========================================== */

let mediaItems = [];
let searchQuery = "";


/* ==========================================
   CONSTANTS
========================================== */

const STORAGE_BUCKET = "media";
const SIGNED_URL_EXPIRATION = 60 * 60; // 1 hour


/* ==========================================
   DOM
========================================== */

const uploadButton =
    document.getElementById("uploadButton");

const emptyUploadButton =
    document.getElementById("emptyUploadButton");

const uploadModal =
    document.getElementById("uploadModal");

const closeUploadModal =
    document.getElementById("closeUploadModal");

const cancelUpload =
    document.getElementById("cancelUpload");

const uploadForm =
    document.getElementById("uploadForm");

const mediaFile =
    document.getElementById("mediaFile");

const uploadPreview =
    document.getElementById("uploadPreview");

const previewImage =
    document.getElementById("previewImage");

const mediaGrid =
    document.getElementById("mediaGrid");

const loadingState =
    document.getElementById("loadingState");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const totalFiles =
    document.getElementById("totalFiles");

const totalImages =
    document.getElementById("totalImages");

const totalStorage =
    document.getElementById("totalStorage");

const previewModal =
    document.getElementById("previewModal");

const closePreviewModal =
    document.getElementById("closePreviewModal");

const fullPreviewImage =
    document.getElementById("fullPreviewImage");

const previewFileName =
    document.getElementById("previewFileName");


/* ==========================================
   GET CURRENT USER
========================================== */

async function getCurrentUser() {

    const {
        data,
        error
    } = await supabase.auth.getUser();

    if (error) {
        throw error;
    }

    if (!data.user) {
        throw new Error(
            "You must be logged in to manage media."
        );
    }

    return data.user;

}


/* ==========================================
   LOAD MEDIA METADATA
========================================== */

async function getAllMedia() {

    const {
        data,
        error
    } = await supabase
        .from("media")
        .select("*")
        .order(
            "created_at",
            {
                ascending: false
            }
        );

    if (error) {
        throw error;
    }

    if (!data || data.length === 0) {
        return [];
    }


    /*
       Because the bucket is private,
       generate temporary signed URLs.
    */

    const mediaWithUrls =
        await Promise.all(

            data.map(
                async item => {

                    const {
                        data: signedData,
                        error: signedError
                    } = await supabase
                        .storage
                        .from(STORAGE_BUCKET)
                        .createSignedUrl(
                            item.storage_path,
                            SIGNED_URL_EXPIRATION
                        );


                    if (signedError) {
                        console.error(
                            "Signed URL error:",
                            signedError
                        );

                        return {
                            ...item,
                            url: null
                        };
                    }


                    return {
                        ...item,
                        url:
                            signedData?.signedUrl ||
                            null
                    };

                }
            )

        );


    return mediaWithUrls;

}


/* ==========================================
   LOAD
========================================== */

async function loadMedia() {

    showLoading();


    try {

        mediaItems =
            await getAllMedia();


        updateStats();

        renderMedia();

    }

    catch (error) {

        console.error(
            "Media loading error:",
            error
        );


        loadingState.classList.add(
            "hidden"
        );


        mediaGrid.classList.add(
            "hidden"
        );


        emptyState.classList.remove(
            "hidden"
        );


        alert(
            "Unable to load media.\n\n" +
            error.message
        );

    }

}


/* ==========================================
   STATS
========================================== */

function updateStats() {

    const images =
        mediaItems.filter(
            item =>
                item.file_type &&
                item.file_type.startsWith(
                    "image/"
                )
        );


    const storage =
        mediaItems.reduce(
            (total, item) =>
                total +
                Number(item.file_size || 0),
            0
        );


    totalFiles.textContent =
        mediaItems.length;


    totalImages.textContent =
        images.length;


    totalStorage.textContent =
        formatFileSize(storage);

}


/* ==========================================
   RENDER
========================================== */

function renderMedia() {

    const filtered =
        mediaItems.filter(
            item => {

                if (!searchQuery) {
                    return true;
                }


                return item.file_name
                    .toLowerCase()
                    .includes(
                        searchQuery
                    );

            }
        );


    loadingState.classList.add(
        "hidden"
    );


    if (filtered.length === 0) {

        mediaGrid.classList.add(
            "hidden"
        );

        emptyState.classList.remove(
            "hidden"
        );

        return;

    }


    emptyState.classList.add(
        "hidden"
    );

    mediaGrid.classList.remove(
        "hidden"
    );


    mediaGrid.innerHTML =
        filtered.map(
            item =>
                createMediaCard(item)
        ).join("");


    attachMediaEvents();

}


/* ==========================================
   MEDIA CARD
========================================== */

function createMediaCard(item) {

    const imageContent =
        item.url
            ? `
                <img
                    src="${item.url}"
                    alt="${escapeHtml(item.file_name)}"
                    loading="lazy"
                >
              `
            : `
                <div class="media-image-error">
                    Image unavailable
                </div>
              `;


    return `

        <article
            class="media-card"
            data-id="${item.id}">


            <div class="media-thumbnail">

                ${imageContent}

            </div>


            <div class="media-card-body">

                <h3
                    title="${escapeHtml(item.file_name)}">

                    ${escapeHtml(item.file_name)}

                </h3>


                <div class="media-meta">

                    <span>
                        ${formatFileSize(
                            Number(item.file_size || 0)
                        )}
                    </span>

                    <span>
                        ${formatDate(
                            item.created_at
                        )}
                    </span>

                </div>


                <div class="media-actions">

                    <button
                        class="table-btn preview-media"
                        data-id="${item.id}">

                        View

                    </button>


                    <button
                        class="table-btn delete-media"
                        data-id="${item.id}">

                        Delete

                    </button>

                </div>

            </div>

        </article>

    `;

}


/* ==========================================
   EVENTS
========================================== */

function attachMediaEvents() {

    document
        .querySelectorAll(
            ".preview-media"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    previewMedia(
                        button.dataset.id
                    );

                }
            );

        });


    document
        .querySelectorAll(
            ".delete-media"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                async () => {

                    await handleDelete(
                        button.dataset.id,
                        button
                    );

                }
            );

        });

}


/* ==========================================
   PREVIEW
========================================== */

function previewMedia(id) {

    const item =
        mediaItems.find(
            media =>
                String(media.id) ===
                String(id)
        );


    if (!item) {
        return;
    }


    if (!item.url) {

        alert(
            "Unable to preview this image."
        );

        return;

    }


    fullPreviewImage.src =
        item.url;


    previewFileName.textContent =
        item.file_name;


    previewModal.classList.add(
        "active"
    );

}


/* ==========================================
   DELETE
========================================== */

async function handleDelete(
    id,
    button
) {

    const item =
        mediaItems.find(
            media =>
                String(media.id) ===
                String(id)
        );


    if (!item) {
        return;
    }


    const confirmed =
        confirm(
            `Delete "${item.file_name}"?`
        );


    if (!confirmed) {
        return;
    }


    button.disabled = true;

    button.textContent =
        "Deleting...";


    try {

        /*
           1. Delete physical file
           from Supabase Storage
        */

        const {
            error: storageError
        } = await supabase
            .storage
            .from(STORAGE_BUCKET)
            .remove([
                item.storage_path
            ]);


        if (storageError) {
            throw storageError;
        }


        /*
           2. Delete metadata
           from public.media
        */

        const {
            error: databaseError
        } = await supabase
            .from("media")
            .delete()
            .eq(
                "id",
                item.id
            );


        if (databaseError) {
            throw databaseError;
        }


        await loadMedia();

    }

    catch (error) {

        console.error(
            "Media delete error:",
            error
        );


        alert(
            "Unable to delete media.\n\n" +
            error.message
        );


        button.disabled = false;

        button.textContent =
            "Delete";

    }

}


/* ==========================================
   UPLOAD MODAL
========================================== */

function openUploadModal() {

    uploadModal.classList.add(
        "active"
    );

}


function closeUpload() {

    uploadModal.classList.remove(
        "active"
    );

    uploadForm.reset();

    uploadPreview.classList.add(
        "hidden"
    );

    previewImage.src = "";

}


uploadButton.addEventListener(
    "click",
    openUploadModal
);


emptyUploadButton.addEventListener(
    "click",
    openUploadModal
);


closeUploadModal.addEventListener(
    "click",
    closeUpload
);


cancelUpload.addEventListener(
    "click",
    closeUpload
);




/* ==========================================
   FILE PREVIEW
========================================== */

mediaFile.addEventListener(
    "change",
    () => {

        const file =
            mediaFile.files[0];


        if (!file) {

            uploadPreview.classList.add(
                "hidden"
            );

            return;

        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select an image file."
            );

            mediaFile.value = "";

            return;

        }


        const url =
            URL.createObjectURL(
                file
            );


        previewImage.src =
            url;


        uploadPreview.classList.remove(
            "hidden"
        );

    }
);


/* ==========================================
   UPLOAD
========================================== */

uploadForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const file =
            mediaFile.files[0];


        if (!file) {
            return;
        }


        const saveButton =
            document.getElementById(
                "saveUpload"
            );


        saveButton.disabled = true;

        saveButton.textContent =
            "Uploading...";


        try {

            /*
               Make sure the admin
               is authenticated.
            */

            const user =
                await getCurrentUser();


            /*
               Create a safe unique
               storage path.
            */

            const safeFileName =
                sanitizeFileName(
                    file.name
                );


            const uniqueName =
                `${crypto.randomUUID()}-${safeFileName}`;


            const storagePath =
                `general/${uniqueName}`;


            /*
               1. Upload actual file
               to Supabase Storage.
            */

            const {
                error: uploadError
            } = await supabase
                .storage
                .from(STORAGE_BUCKET)
                .upload(
                    storagePath,
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


            /*
               2. Save metadata
               to public.media.
            */

            const {
                error: metadataError
            } = await supabase
                .from("media")
                .insert([
                    {
                        file_name:
                            file.name,

                        storage_path:
                            storagePath,

                        file_type:
                            file.type,

                        file_size:
                            file.size,

                        uploaded_by:
                            user.id
                    }
                ]);


            /*
               If metadata insertion fails,
               remove the uploaded file so
               Storage doesn't contain an
               orphaned file.
            */

            if (metadataError) {

                await supabase
                    .storage
                    .from(STORAGE_BUCKET)
                    .remove([
                        storagePath
                    ]);

                throw metadataError;

            }


            closeUpload();

            await loadMedia();

        }

        catch (error) {

            console.error(
                "Media upload error:",
                error
            );


            alert(
                "Unable to upload media.\n\n" +
                error.message
            );

        }

        finally {

            saveButton.disabled =
                false;

            saveButton.textContent =
                "Add to Media Library";

        }

    }
);


/* ==========================================
   SEARCH
========================================== */

searchInput.addEventListener(
    "input",
    () => {

        searchQuery =
            searchInput.value
                .trim()
                .toLowerCase();


        renderMedia();

    }
);


/* ==========================================
   PREVIEW MODAL
========================================== */

closePreviewModal.addEventListener(
    "click",
    () => {

        previewModal.classList.remove(
            "active"
        );

        fullPreviewImage.src = "";

    }
);


previewModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            previewModal
        ) {

            previewModal.classList.remove(
                "active"
            );

            fullPreviewImage.src = "";

        }

    }
);


/* ==========================================
   UTILITIES
========================================== */

function formatFileSize(bytes) {

    if (!bytes || bytes === 0) {
        return "0 KB";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        )
        +
        " "
        +
        units[index]
    );

}


function formatDate(dateValue) {

    if (!dateValue) {
        return "-";
    }


    return new Date(
        dateValue
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function sanitizeFileName(fileName) {

    return fileName

        .normalize("NFKD")

        .replace(
            /[^\w.\-]+/g,
            "-"
        )

        .replace(
            /-+/g,
            "-"
        )

        .replace(
            /^-|-$/g,
            ""
        );

}


function escapeHtml(value) {
    return String(value)

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


/* ==========================================
   LOADING
========================================== */

function showLoading() {

    loadingState.classList.remove(
        "hidden"
    );

    emptyState.classList.add(
        "hidden"
    );

    mediaGrid.classList.add(
        "hidden"
    );

}


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadMedia();

    }
);