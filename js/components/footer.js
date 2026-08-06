/* ==========================================================
   FOOTER COMPONENT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeBackToTop();
    initializeVisitorCounter();
    initializeFooterAnimation();

});

/* ==========================================================
   BACK TO TOP
========================================================== */

function initializeBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    // Hide initially
    button.style.opacity = "0";
    button.style.visibility = "hidden";
    button.style.transform = "translateY(15px)";

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.style.opacity = "1";
            button.style.visibility = "visible";
            button.style.transform = "translateY(0)";

        } else {

            button.style.opacity = "0";
            button.style.visibility = "hidden";
            button.style.transform = "translateY(15px)";

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/* ==========================================================
   VISITOR COUNTER
========================================================== */

function initializeVisitorCounter() {

    const counter = document.getElementById("visitorCounter");

    if (!counter) return;

    let visits = localStorage.getItem("websiteVisits");

    if (!visits) {

        visits = 1;

    } else {

        visits = parseInt(visits) + 1;

    }

    localStorage.setItem("websiteVisits", visits);

    counter.innerHTML = `
        👁 ${Number(visits).toLocaleString()} Visits
    `;

}

/* ==========================================================
   FOOTER ANIMATION
========================================================== */

function initializeFooterAnimation() {

    const footer = document.querySelector(".site-footer");

    if (!footer) return;

    footer.style.opacity = "0";
    footer.style.transform = "translateY(40px)";
    footer.style.transition = "all .8s ease";

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    footer.style.opacity = "1";
                    footer.style.transform = "translateY(0)";

                }

            });

        },

        {

            threshold: .2

        }

    );

    observer.observe(footer);

}