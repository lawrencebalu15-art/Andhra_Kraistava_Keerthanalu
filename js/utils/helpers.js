function debounce(func, wait) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            func(...args);

        }, wait);

    };

}

function isMobile() {

    return window.innerWidth <= 768;

}

function formatText(text) {

    return text ? text.trim() : "";

}
