/* ==========================================================
   AKK CMS — MESSAGES
========================================================== */

import { supabase } from "./supabase.js";
import { requireAuth } from "./auth.js";
import { showToast } from "./utils.js";


/* ==========================================================
   STATE
========================================================== */

let messages = [];

let filteredMessages = [];

let selectedMessage = null;


/* ==========================================================
   ELEMENTS
========================================================== */

const tableBody =
    document.getElementById("messagesTableBody");

const loadingState =
    document.getElementById("messagesLoading");

const emptyState =
    document.getElementById("messagesEmpty");

const errorState =
    document.getElementById("messagesError");

const totalMessages =
    document.getElementById("totalMessages");

const unreadMessages =
    document.getElementById("unreadMessages");

const searchInput =
    document.getElementById("messageSearch");


/* MODAL */

const messageModal =
    document.getElementById("messageModal");

const closeMessageModal =
    document.getElementById("closeMessageModal");

const cancelMessageButton =
    document.getElementById("cancelMessageButton");

const markReadButton =
    document.getElementById("markReadButton");

const deleteMessageButton =
    document.getElementById("deleteMessageButton");


/* MODAL FIELDS */

const modalSubject =
    document.getElementById("modalSubject");

const modalSender =
    document.getElementById("modalSender");

const modalName =
    document.getElementById("modalName");

const modalEmail =
    document.getElementById("modalEmail");

const modalSubjectMeta =
    document.getElementById("modalSubjectMeta");

const modalDate =
    document.getElementById("modalDate");

const modalMessage =
    document.getElementById("modalMessage");


/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            await requireAuth();

            await loadMessages();

        } catch (error) {

            console.error(
                "Messages initialization failed:",
                error
            );

        }

    }
);


/* ==========================================================
   LOAD MESSAGES
========================================================== */

async function loadMessages() {

    showLoading();


    const {
        data,
        error
    } = await supabase

        .from("contact_messages")

        .select(
            "id, name, email, subject, message, is_read, created_at"
        )

        .order(
            "created_at",
            {
                ascending: false
            }
        );


    if (error) {

        console.error(
            "Failed to load messages:",
            error
        );

        showError();

        return;
    }


    messages =
        Array.isArray(data)
            ? data
            : [];


    filteredMessages =
        [...messages];


    updateStats();

    renderMessages();

}


/* ==========================================================
   RENDER
========================================================== */

function renderMessages() {

    tableBody.innerHTML = "";


    if (!filteredMessages.length) {

        hideLoading();

        if (messages.length === 0) {

            showEmpty();

        } else {

            showNoSearchResults();

        }

        return;
    }


    hideLoading();


    filteredMessages.forEach(
        message => {

            const row =
                document.createElement("tr");


            if (!message.is_read) {

                row.classList.add(
                    "message-unread"
                );

            }


            row.addEventListener(
                "click",
                () => openMessage(message)
            );


            /* SENDER */

            const senderCell =
                document.createElement("td");


            const sender =
                document.createElement("div");

            sender.className =
                "message-name";


            const avatar =
                document.createElement("div");

            avatar.className =
                "message-avatar";


            avatar.textContent =
                getInitials(message.name);


            const senderDetails =
                document.createElement("div");


            const senderName =
                document.createElement("div");

            senderName.textContent =
                message.name || "Unknown";


            const senderEmail =
                document.createElement("div");

            senderEmail.className =
                "message-email";

            senderEmail.textContent =
                message.email || "";


            senderDetails.appendChild(
                senderName
            );

            senderDetails.appendChild(
                senderEmail
            );


            sender.appendChild(
                avatar
            );

            sender.appendChild(
                senderDetails
            );


            senderCell.appendChild(
                sender
            );


            /* SUBJECT */

            const subjectCell =
                document.createElement("td");


            const subject =
                document.createElement("div");

            subject.className =
                "message-subject";

            subject.title =
                message.subject || "";

            subject.textContent =
                message.subject || "No subject";


            subjectCell.appendChild(
                subject
            );


            /* DATE */

            const dateCell =
                document.createElement("td");


            dateCell.className =
                "message-date";

            dateCell.textContent =
                formatDate(
                    message.created_at
                );


            /* STATUS */

            const statusCell =
                document.createElement("td");


            const status =
                document.createElement("span");


            status.className =
                `message-status ${
                    message.is_read
                        ? "read"
                        : "unread"
                }`;


            status.textContent =
                message.is_read
                    ? "Read"
                    : "Unread";


            statusCell.appendChild(
                status
            );


            row.appendChild(
                senderCell
            );

            row.appendChild(
                subjectCell
            );

            row.appendChild(
                dateCell
            );

            row.appendChild(
                statusCell
            );


            tableBody.appendChild(
                row
            );

        }
    );

}


/* ==========================================================
   SEARCH
========================================================== */

searchInput?.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .trim()
                .toLowerCase();


        if (!query) {

            filteredMessages =
                [...messages];

        } else {

            filteredMessages =
                messages.filter(
                    message => {

                        return [

                            message.name,

                            message.email,

                            message.subject,

                            message.message

                        ]
                            .filter(Boolean)
                            .some(
                                value =>
                                    String(value)
                                        .toLowerCase()
                                        .includes(query)
                            );

                    }
                );

        }


        renderMessages();

    }
);


/* ==========================================================
   OPEN MESSAGE
========================================================== */

async function openMessage(message) {

    selectedMessage =
        message;


    modalSubject.textContent =
        message.subject || "No subject";


    modalSender.textContent =
        `${message.name || "Unknown"} • ${
            message.email || ""
        }`;


    modalName.textContent =
        message.name || "—";


    modalEmail.textContent =
        message.email || "—";


    modalSubjectMeta.textContent =
        message.subject || "—";


    modalDate.textContent =
        formatDate(
            message.created_at,
            true
        );


    modalMessage.textContent =
        message.message || "";


    updateMarkReadButton();


    messageModal.classList.add(
        "open"
    );


    messageModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /*
       Marking a message as read happens
       only when the admin opens it.
    */

    if (!message.is_read) {

        await markMessageAsRead(
            message.id,
            false
        );

    }

}


/* ==========================================================
   MARK AS READ
========================================================== */

async function markMessageAsRead(
    messageId,
    showNotification = true
) {

    const {
        error
    } = await supabase

        .from("contact_messages")

        .update({
            is_read: true
        })

        .eq(
            "id",
            messageId
        );


    if (error) {

        console.error(
            "Failed to mark message as read:",
            error
        );

        if (showNotification) {

            showToast(
                "Unable to mark message as read.",
                "error"
            );

        }

        return false;
    }


    const message =
        messages.find(
            item =>
                item.id === messageId
        );


    if (message) {

        message.is_read =
            true;

    }


    const filtered =
        filteredMessages.find(
            item =>
                item.id === messageId
        );


    if (filtered) {

        filtered.is_read =
            true;

    }


    updateStats();

    renderMessages();


    if (selectedMessage?.id === messageId) {

        selectedMessage.is_read =
            true;

        updateMarkReadButton();

    }


    if (showNotification) {

        showToast(
            "Message marked as read.",
            "success"
        );

    }


    return true;

}


/* ==========================================================
   MARK READ BUTTON
========================================================== */

markReadButton?.addEventListener(
    "click",
    async () => {

        if (!selectedMessage) {
            return;
        }


        if (selectedMessage.is_read) {

            closeModal();

            return;
        }


        await markMessageAsRead(
            selectedMessage.id,
            true
        );

    }
);


/* ==========================================================
   UPDATE MARK READ BUTTON
========================================================== */

function updateMarkReadButton() {

    if (!selectedMessage) {
        return;
    }


    if (selectedMessage.is_read) {

        markReadButton.innerHTML =
            '<i class="fas fa-check"></i> Read';

        markReadButton.disabled =
            true;

        markReadButton.style.opacity =
            "0.6";

        markReadButton.style.cursor =
            "default";

    } else {

        markReadButton.innerHTML =
            '<i class="fas fa-envelope-open"></i> Mark as Read';

        markReadButton.disabled =
            false;

        markReadButton.style.opacity =
            "1";

        markReadButton.style.cursor =
            "pointer";

    }

}


/* ==========================================================
   DELETE MESSAGE
========================================================== */

deleteMessageButton?.addEventListener(
    "click",
    async () => {

        if (!selectedMessage) {
            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this message?"
            );


        if (!confirmed) {
            return;
        }


        const {
            error
        } = await supabase

            .from("contact_messages")

            .delete()

            .eq(
                "id",
                selectedMessage.id
            );


        if (error) {

            console.error(
                "Failed to delete message:",
                error
            );


            showToast(
                "Unable to delete message.",
                "error"
            );


            return;
        }


        messages =
            messages.filter(
                message =>
                    message.id !==
                    selectedMessage.id
            );


        filteredMessages =
            filteredMessages.filter(
                message =>
                    message.id !==
                    selectedMessage.id
            );


        closeModal();

        updateStats();

        renderMessages();


        showToast(
            "Message deleted successfully.",
            "success"
        );

    }
);


/* ==========================================================
   CLOSE MODAL
========================================================== */

function closeModal() {

    selectedMessage =
        null;


    messageModal.classList.remove(
        "open"
    );


    messageModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


closeMessageModal?.addEventListener(
    "click",
    closeModal
);


cancelMessageButton?.addEventListener(
    "click",
    closeModal
);





/* ==========================================================
   ESCAPE KEY
========================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            messageModal.classList.contains("open")
        ) {

            closeModal();

        }

    }
);


/* ==========================================================
   STATS
========================================================== */

function updateStats() {

    totalMessages.textContent =
        messages.length;


    unreadMessages.textContent =
        messages.filter(
            message =>
                !message.is_read
        ).length;

}


/* ==========================================================
   UI STATES
========================================================== */

function showLoading() {

    loadingState.style.display =
        "block";

    emptyState.style.display =
        "none";

    errorState.style.display =
        "none";

}


function hideLoading() {

    loadingState.style.display =
        "none";

    errorState.style.display =
        "none";

}


function showEmpty() {

    loadingState.style.display =
        "none";

    errorState.style.display =
        "none";

    emptyState.style.display =
        "block";

}


function showError() {

    loadingState.style.display =
        "none";

    emptyState.style.display =
        "none";

    errorState.style.display =
        "block";

}


function showNoSearchResults() {

    loadingState.style.display =
        "none";

    errorState.style.display =
        "none";

    emptyState.style.display =
        "block";


    const heading =
        emptyState.querySelector("h3");

    const paragraph =
        emptyState.querySelector("p");


    if (heading) {

        heading.textContent =
            "No matching messages";

    }


    if (paragraph) {

        paragraph.textContent =
            "Try a different search term.";

    }

}


/* ==========================================================
   HELPERS
========================================================== */

function getInitials(
    name
) {

    if (!name) {
        return "?";
    }


    const parts =
        name
            .trim()
            .split(/\s+/)
            .slice(0, 2);


    return parts
        .map(
            part =>
                part.charAt(0)
                    .toUpperCase()
        )
        .join("");

}


function formatDate(
    dateString,
    includeTime = false
) {

    if (!dateString) {
        return "—";
    }


    const date =
        new Date(dateString);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "—";

    }


    return new Intl.DateTimeFormat(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            ...(includeTime
                ? {
                    hour: "2-digit",
                    minute: "2-digit"
                }
                : {})
        }
    ).format(date);

}