import { supabase } from "../js/supabase.js";

/* ==========================================
   LOGIN
========================================== */

export async function login(email, password) {

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    return error;

}

/* ==========================================
   LOGOUT
========================================== */

export async function logout() {

    await supabase.auth.signOut();

    window.location.href = "/public/admin/login.html";

}

/* ==========================================
   GET CURRENT USER
========================================== */

export async function getCurrentUser() {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    return user;

}

/* ==========================================
   REQUIRE AUTH
========================================== */

export async function requireAuth() {

    const user = await getCurrentUser();

    if (!user) {

        window.location.replace("/public/admin/login.html");
        return null;

    }

    return user;

}

/* ==========================================
   REDIRECT IF LOGGED IN
========================================== */

export async function redirectIfLoggedIn() {

    const user = await getCurrentUser();

    if (user) {

        window.location.replace("/public/admin/dashboard.html");

    }

}

/* ==========================================
   LOGIN PAGE
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    await redirectIfLoggedIn();

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const password = document
            .getElementById("password")
            .value;

        const button = document.getElementById("loginButton");

        const errorBox = document.getElementById("loginError");

        button.disabled = true;

        button.textContent = "Signing In...";

        errorBox.textContent = "";

        const error = await login(email, password);

        if (error) {

            errorBox.textContent = error.message;

            button.disabled = false;

            button.textContent = "Sign In";

            return;

        }

        window.location.replace("/public/admin/dashboard.html");

    });

}