import "dotenv/config";
import supabase from "./supabase-admin.js";
import { songsList } from "../data/hymns-data.js";
console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20));
// ===============================
// Supabase
// ===============================


// ===============================
// Helpers
// ===============================

function slugify(text = "") {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

function normalizeAuthor(name = "") {
    return name
        .replace(/^Rev\.?/i, "")
        .replace(/\./g, "")
        .replace(/\s+/g, " ")
        .trim()
        .toLowerCase();
}

// ===============================
// Import Hymns
// ===============================

async function importHymns() {

    console.log(`Importing ${songsList.length} hymns...\n`);

    // Load all authors once
    const { data: authors, error: authorError } = await supabase
        .from("authors")
        .select("id,name");

    if (authorError) {
        console.error(authorError);
        return;
    }

    for (const hymn of songsList) {
        for (const hymn of songsList) {

    if (!hymn) {
        continue;
    }

        try {

            // Find author

            let authorId = null;

            if (hymn.author) {

                const match = authors.find(a =>
                    normalizeAuthor(a.name) === normalizeAuthor(hymn.author)
                );

                if (match) {
                    authorId = match.id;
                } else {
                    console.log(`⚠ Author not found: ${hymn.author}`);
                }

            }

            // Skip if hymn already exists

            const { data: existing } = await supabase
                .from("hymns")
                .select("id")
                .eq("number", hymn.number)
                .maybeSingle();

            if (existing) {
                console.log(`⏭ Skipped Hymn ${hymn.number}`);
                continue;
            }

            // Insert

            const { error } = await supabase
                .from("hymns")
                .insert({

                    number: hymn.number,

                    title_telugu: hymn.titleTelugu,

                    title_english: hymn.titleEnglish,

                    slug: slugify(hymn.titleEnglish || hymn.titleTelugu),

                    language: "Telugu",

                    youtube_links: hymn.youtubeLinks || [],

                    author_id: authorId,

                    book_id: null,

                    category_id: null

                });

            if (error) {

                console.log(`❌ Hymn ${hymn.number}`);
                console.log(error.message);

            } else {

                console.log(`✅ Hymn ${hymn.number}`);

            }

        } catch (err) {

            console.log(`❌ Hymn ${hymn.number}`);
            console.log(err.message);

        }

    }

    console.log("\n🎉 Finished importing hymns.");

}

importHymns();