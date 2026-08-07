const backToTop = document.getElementById("backToTop");

document.addEventListener("click", (e) => {
    if (e.target.id === "backToTop") {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
});

if (backToTop) {

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {
            backToTop.style.opacity = "1";
            backToTop.style.pointerEvents = "auto";
        } else {
            backToTop.style.opacity = ".75";
            backToTop.style.pointerEvents = "auto";
        }

    });

}