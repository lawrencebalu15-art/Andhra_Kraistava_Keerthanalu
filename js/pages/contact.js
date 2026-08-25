/* ==========================================================
   CONTACT PAGE
   Andhra Kraistava Keerthanalu
========================================================== */


const contactForm =
    document.getElementById("contactForm");


const contactStatus =
    document.getElementById("contactStatus");


const contactSubmit =
    document.getElementById("contactSubmit");



/* ==========================================================
   FORM SUBMISSION
========================================================== */

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById(
                "contactName"
            )?.value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            )?.value.trim();


        const subject =
            document.getElementById(
                "contactSubject"
            )?.value;


        const message =
            document.getElementById(
                "contactMessage"
            )?.value.trim();



        /* ==============================================
           BASIC VALIDATION
        ============================================== */

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            showStatus(
                "Please fill in all the required fields.",
                "error"
            );

            return;

        }



        /* ==============================================
           TEMPORARY STATE
        ============================================== */

        /*
         * The official project email has not yet been
         * provided, so we must NOT pretend that the
         * message has actually been delivered.
         */

        showStatus(
            "Your message is ready. The official contact email has not been configured yet.",
            "success"
        );


        console.log(
            "Contact form data:",
            {
                name,
                email,
                subject,
                message
            }
        );

    }
);



/* ==========================================================
   STATUS MESSAGE
========================================================== */

function showStatus(
    message,
    type
) {

    if (!contactStatus) {
        return;
    }


    contactStatus.textContent =
        message;


    contactStatus.className =
        `contact-status ${type}`;

}



/* ==========================================================
   BUTTON STATE
========================================================== */

contactForm?.addEventListener(
    "submit",
    () => {

        if (!contactSubmit) {
            return;
        }


        contactSubmit.blur();

    }
);