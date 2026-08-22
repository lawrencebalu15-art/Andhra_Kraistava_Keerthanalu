import { supabase } from "../../js/supabase.js";


/* ==========================================
   DEFAULT SETTINGS
========================================== */

const DEFAULT_SETTINGS = {

    siteName:
        "Andhra Kraistava Keerthanalu",

    defaultLanguage:
        "telugu",

    itemsPerPage:
        "50",

    theme:
        "light"

};


/* ==========================================
   ELEMENTS
========================================== */

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const siteName =
    document.getElementById("siteName");

const defaultLanguage =
    document.getElementById("defaultLanguage");

const itemsPerPage =
    document.getElementById("itemsPerPage");

const theme =
    document.getElementById("theme");

const saveButton =
    document.getElementById("saveSettings");

const resetButton =
    document.getElementById("resetSettings");

const message =
    document.getElementById("settingsMessage");


/* ==========================================
   LOAD SETTINGS
========================================== */

async function loadSettings() {

    try {

        const {
            data,
            error
        } = await supabase
            .from("cms_settings")
            .select("*")
            .limit(1)
            .single();

        if (error) {
            throw error;
        }

        applySettings(data);

    } catch (error) {

        console.error(
            "Failed to load CMS settings:",
            error
        );

        applySettings(DEFAULT_SETTINGS);
    }

}

/* ==========================================
   APPLY SETTINGS
========================================== */
function applySettings(settings) {

    siteName.value =
        settings.site_name ??
        settings.siteName ??
        DEFAULT_SETTINGS.siteName;

    defaultLanguage.value =
        settings.default_language ??
        settings.defaultLanguage ??
        DEFAULT_SETTINGS.defaultLanguage;

    itemsPerPage.value =
        String(
            settings.items_per_page ??
            settings.itemsPerPage ??
            DEFAULT_SETTINGS.itemsPerPage
        );

    theme.value =
        settings.theme ??
        DEFAULT_SETTINGS.theme;

}

/* ==========================================
   GET SETTINGS
========================================== */

function getSettings() {

    return {

        siteName:
            siteName.value.trim(),

        defaultLanguage:
            defaultLanguage.value,

        itemsPerPage:
            itemsPerPage.value,

        theme:
            theme.value

    };

}


/* ==========================================
   SAVE
========================================== */

async function saveSettings() {

    const settings = getSettings();

    saveButton.disabled = true;
    saveButton.textContent = "Saving...";

    try {

        const {
            data,
            error
        } = await supabase
            .from("cms_settings")
            .update({
                site_name: settings.siteName,
                default_language: settings.defaultLanguage,
                items_per_page: Number(settings.itemsPerPage),
                theme: settings.theme,
                updated_at: new Date().toISOString()
            })
            .eq("id", 1)
            .select()
            .single();

        if (error) {
            throw error;
        }

        applySettings(data);

        showMessage(
            "Settings saved successfully."
        );

    } catch (error) {

        console.error(
            "Settings save error:",
            error
        );

        showMessage(
            "Unable to save settings."
        );

    } finally {

        saveButton.disabled = false;
        saveButton.textContent = "Save Settings";

    }

}

/* ==========================================
   RESET
========================================== */
async function resetSettings() {

    const confirmed = confirm(
        "Reset all CMS settings to their defaults?"
    );

    if (!confirmed) return;

    saveButton.disabled = true;

    try {

        const {
            data,
            error
        } = await supabase
            .from("cms_settings")
            .update({
                site_name:
                    DEFAULT_SETTINGS.siteName,

                default_language:
                    DEFAULT_SETTINGS.defaultLanguage,

                items_per_page:
                    Number(
                        DEFAULT_SETTINGS.itemsPerPage
                    ),

                theme:
                    DEFAULT_SETTINGS.theme,

                updated_at:
                    new Date().toISOString()
            })
            .eq("id", 1)
            .select()
            .single();

        if (error) {
            throw error;
        }

        applySettings(data);

        showMessage(
            "Settings restored to defaults."
        );

    } catch (error) {

        console.error(
            "Settings reset error:",
            error
        );

        showMessage(
            "Unable to reset settings."
        );

    } finally {

        saveButton.disabled = false;

    }

}

/* ==========================================
   THEME
========================================== */

function applyTheme(themeValue) {

    /*
     * We are intentionally not changing the
     * existing admin theme yet.
     *
     * The setting is stored now so the theme
     * system can be implemented later without
     * changing the Settings page structure.
     */

    document.documentElement.dataset.theme =
        themeValue;

}


/* ==========================================
   ADMIN USER
========================================== */

async function loadAdminProfile() {

    try {

        const {
            data,
            error
        } = await supabase.auth.getUser();


        if (error) {

            throw error;

        }


        const user =
            data?.user;


        if (!user) {

            profileName.value =
                "Administrator";

            profileEmail.value =
                "Not signed in";

            return;

        }


        profileEmail.value =
            user.email || "";


        profileName.value =

            user.user_metadata?.full_name ||

            user.user_metadata?.name ||

            "Administrator";

    }

    catch (error) {

        console.error(
            "Unable to load admin profile:",
            error
        );


        profileEmail.value =
            "Unable to load";

    }

}


/* ==========================================
   MESSAGE
========================================== */

function showMessage(text) {

    message.textContent =
        text;

    message.classList.remove(
        "hidden"
    );


    setTimeout(
        () => {

            message.classList.add(
                "hidden"
            );

        },
        3000
    );

}


/* ==========================================
   EVENTS
========================================== */

saveButton.addEventListener(
    "click",
    saveSettings
);


resetButton.addEventListener(
    "click",
    resetSettings
);


/* ==========================================
   INITIALIZE
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        loadSettings();

        await loadAdminProfile();

    }
);