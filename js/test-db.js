import { supabase } from "./supabase.js";

const { data, error } = await supabase
    .from("hymns")
    .select("*")
    .eq("number", 1)
    .single();

if (error) {
    console.error("ERROR:", error);
} else {
    console.log("COLUMNS:");
    console.log(Object.keys(data).join("\n"));

    console.log("FULL HYMN:");
    console.log(JSON.stringify(data, null, 2));
}