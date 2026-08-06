import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { songsList } from "../data/hymns-data.js";

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log("====================================");
console.log(" Andhra Kraistava Keerthanalu");
console.log(" Database Import Tool");
console.log("====================================");
console.log("");

if (!process.env.VITE_SUPABASE_URL) {
    console.error("❌ VITE_SUPABASE_URL not found.");
    process.exit(1);
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("❌ SUPABASE_SERVICE_ROLE_KEY not found.");
    process.exit(1);
}
function slugify(text = "") {

    return text
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
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
function extractAuthors() {

    const map = new Map();

    for (const hymn of songsList) {

        if (!hymn) continue;

        let name = hymn.author?.trim();

        if (!name || name === "") {
            name = "Unknown Author";
        }

        const key = normalizeAuthor(name);

        if (!map.has(key)) {

            map.set(key, {
                name
            });

        }

    }

    return [...map.values()];

}
async function importAuthors() {

    const authors = extractAuthors();

    console.log(`\nFound ${authors.length} unique authors.\n`);

    for (const author of authors) {

        const slug = slugify(author.name);

        const { error } = await supabase
            .from("authors")
            .upsert(
                {
                    name: author.name,
                    slug: slug
                },
                {
                    onConflict: "slug"
                }
            );

        if (error) {
            console.log(`❌ ${author.name}`);
            console.log(error.message);
        } else {
            console.log(`✅ ${author.name}`);
        }
    }

    console.log("\n🎉 Authors imported successfully.");
}

await importAuthors();

await importHymns();

async function getAuthorMap() {

    const { data, error } = await supabase
        .from("authors")
        .select("id, name");

    if (error) {

        console.error(error);
        process.exit(1);

    }

    const map = new Map();

    data.forEach(author => {

        map.set(
            normalizeAuthor(author.name),
            author.id
        );

    });

    return map;

}
async function importHymns() {

    const authorMap = await getAuthorMap();

    console.log("\nImporting Hymns...\n");

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const hymn of songsList) {

        if (!hymn) continue;

        if (!hymn.number) continue;

        if (!hymn.titleTelugu) {

            console.log(`⚠ Skipped hymn ${hymn.number} (No Telugu title)`);

            skipped++;

            continue;

        }

        const authorId =
            authorMap.get(
                normalizeAuthor(
                    hymn.author || "Unknown Author"
                )
            ) || null;

        const { error } = await supabase
            .from("hymns")
            .upsert(
                {
                    number: hymn.number,

                    title_telugu: hymn.titleTelugu,

                    title_english: hymn.titleEnglish,

                    slug:
                        slugify(
                            hymn.titleEnglish ||
                            hymn.titleTelugu
                        ),

                    language: "Telugu",

                    youtube_links:
                        hymn.youtubeLinks || [],

                    author_id: authorId
                },
                {
                    onConflict: "number"
                }
            );

        if (error) {

            console.log(`❌ Hymn ${hymn.number}`);

            console.log(error.message);

            failed++;

        } else {

            imported++;

            process.stdout.write(
                `\rImported ${imported}`
            );

        }

    }

    console.log("\n");

    console.log("================================");

    console.log(`Imported : ${imported}`);

    console.log(`Skipped  : ${skipped}`);

    console.log(`Failed   : ${failed}`);

    console.log("================================");

}