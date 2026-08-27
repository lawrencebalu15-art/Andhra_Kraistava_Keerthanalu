import { supabase } from "../supabase.js";

export async function initializeVisitorCounter() {
    const counter = document.getElementById("visitorCounter");

    if (!counter) {
        console.warn("Visitor counter element not found.");
        return;
    }

    try {
        const { data, error } = await supabase.rpc(
            "increment_visitor_count"
        );

        if (error) {
            console.error("Visitor counter error:", error);
            return;
        }

        counter.textContent =
            `👁 Visitors: ${Number(data).toLocaleString("en-IN")}`;

    } catch (error) {
        console.error("Visitor counter error:", error);
    }
}