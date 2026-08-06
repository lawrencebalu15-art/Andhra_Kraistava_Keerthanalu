// navigation.js

export function initializeNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }

        });

    }

    document.querySelectorAll(".dropdown > .nav-link").forEach(link => {

        link.addEventListener("click", function (e) {

            if (window.innerWidth <= 992) {

                e.preventDefault();

                this.parentElement.classList.toggle("active");

            }

        });

    });

}

export function setActiveNavLink() {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }

    });

}