export function showToast(message, type = "success") {

    const container =
        document.getElementById("toastContainer");

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    const icons = {

        success: "✅",

        error: "❌",

        warning: "⚠️",

        info: "ℹ️"

    };

    toast.innerHTML = `

        <span>${icons[type] || "ℹ️"}</span>

        <span>${message}</span>

    `;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 4000);

}