/* ==========================================================
   CONTACT PAGE
   Andhra Kraistava Keerthanalu
========================================================== */

import { supabase } from "../supabase.js";


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
    async event => {

        event.preventDefault();


        /* ==================================================
           GET FORM VALUES
        ================================================== */

        const name =
            document.getElementById("contactName")
                ?.value
                .trim();

        const email =
            document.getElementById("contactEmail")
                ?.value
                .trim();

        const subject =
            document.getElementById("contactSubject")
                ?.value
                .trim();

        const message =
            document.getElementById("contactMessage")
                ?.value
                .trim();


        /* ==================================================
           VALIDATION
        ================================================== */

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


        /* ==================================================
           EMAIL VALIDATION
        ================================================== */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            showStatus(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        /* ==================================================
           DISABLE BUTTON
        ================================================== */

        if (contactSubmit) {

            contactSubmit.disabled = true;

            contactSubmit.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Sending...';

        }


        showStatus("", "");


        try {

            /* ==================================================
               STEP 1
               SAVE MESSAGE TO SUPABASE
            ================================================== */

            const { error: databaseError } =
                await supabase
                    .from("contact_messages")
                    .insert([
                        {
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        }
                    ]);


            /* ==================================================
               DATABASE ERROR
            ================================================== */

            if (databaseError) {

                console.error(
                    "Contact database error:",
                    databaseError
                );

                throw databaseError;

            }


            /* ==================================================
               STEP 2
               SEND EMAIL NOTIFICATION
            ================================================== */

            try {

                const {
                    data: emailData,
                    error: emailError
                } = await supabase.functions.invoke(
                    "send-contact-email",
                    {
                        body: {
                            name: name,
                            email: email,
                            subject: subject,
                            message: message
                        }
                    }
                );


                /* ==============================================
                   EMAIL ERROR
                   
                   We DO NOT fail the contact submission here.
                   The message is already safely stored in
                   Supabase and will appear in the CMS.
                ============================================== */

                if (emailError) {

                    console.error(
                        "Contact email notification error:",
                        emailError
                    );

                } else if (
                    emailData?.success === false
                ) {

                    console.error(
                        "Email service returned an error:",
                        emailData
                    );

                } else {

                    console.log(
                        "Contact email notification sent successfully."
                    );

                }


            } catch (emailError) {

                /*
                   Email failure should never prevent the
                   visitor's message from being saved.
                */

                console.error(
                    "Email notification failed:",
                    emailError
                );

            }


            /* ==================================================
               SUCCESS
            ================================================== */

            showStatus(
                "Thank you for contacting us. Your message has been received.",
                "success"
            );


            /* ==================================================
               RESET FORM
            ================================================== */

            contactForm.reset();


        } catch (error) {

            /* ==================================================
               DATABASE / MAIN ERROR
            ================================================== */

            console.error(
                "Failed to submit contact message:",
                error
            );


            showStatus(
                "We couldn't send your message right now. Please try again later.",
                "error"
            );


        } finally {

            /* ==================================================
               RESTORE BUTTON
            ================================================== */

            if (contactSubmit) {

                contactSubmit.disabled = false;

                contactSubmit.innerHTML =
                    '<i class="far fa-paper-plane"></i> Send Message';

            }

        }

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
        `contact-status ${type || ""}`;

}


/* ==========================================================
   BUTTON ACCESSIBILITY
========================================================== */

contactSubmit?.addEventListener(
    "click",
    () => {

        contactSubmit.blur();

    }
);