import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { songsList } from "../data/hymns-data.js";

console.log(songsList.length);
console.log(songsList[0]);
console.log(songsList[1]);

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* ==========================================
   HELPERS
========================================== */

function slugify(text = "") {

    text = cleanAuthorName(text);

    return text
        .toLowerCase()
        .replace(/^rev\.?\s*/i, "")
        .replace(/\s+/g, "-");

}
function cleanAuthorName(name = "") {

    name = name.trim();

    if (!name) {
        return "Unknown Author";
    }

    // Fix typo
    if (name.toLowerCase() === "unkown author") {
        return "Unknown Author";
    }

    // Remove duplicate Rev.
    name = name.replace(/^Rev\.\s*Rev\.\s*/i, "Rev. ");

    // Normalize spaces
    name = name.replace(/\s+/g, " ");

    return name;
}

/* ==========================================
   HEADER
========================================== */

console.log("=================================");
console.log(" Andhra Kraistava Keerthanalu");
console.log(" Database Sync");
console.log("=================================\n");

/* ==========================================
   AUTHORS
========================================== */

async function syncAuthors() {

    console.log("🔄 Syncing Authors...\n");

    const uniqueAuthors = new Map();

    for (const hymn of songsList) {

        if (!hymn) continue;

        const name = cleanAuthorName(hymn.author);

        const key = slugify(name);

        if (!uniqueAuthors.has(key)) {

            uniqueAuthors.set(key, {
                name,
                slug: key
            });

        }

    }

    console.log(`Found ${uniqueAuthors.size} unique authors\n`);

    const authorMap = new Map();

    for (const author of uniqueAuthors.values()) {

        // Check if author already exists

        const { data: existing } = await supabase
            .from("authors")
            .select("id")
            .eq("slug", author.slug)
            .maybeSingle();

        if (existing) {

            authorMap.set(author.slug, existing.id);

            continue;

        }

        // Insert new author

        const { data, error } = await supabase
            .from("authors")
            .insert({
                name: author.name,
                slug: author.slug
            })
            .select()
            .single();

        if (error) {

            console.error(`❌ ${author.name}`);
            console.error(error.message);

            continue;

        }

        console.log(`✅ ${author.name}`);

        authorMap.set(author.slug, data.id);

    }

    console.log("\n✔ Authors Synced\n");

    return authorMap;

}


async function syncHymns(authorMap) {

    console.log("\n🔄 Syncing Hymns...\n");

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const hymn of songsList) {

        try {

            if (!hymn) {
                skipped++;
                console.log("⚠ Empty hymn skipped");
                continue;
            }

            if (!hymn.number) {
                skipped++;
                console.log("⚠ Hymn without number skipped");
                continue;
            }

            if (!hymn.titleTelugu || hymn.titleTelugu.trim() === "") {
                skipped++;
                console.log(`⚠ Hymn ${hymn.number} has no Telugu title`);
                continue;
            }

            const authorSlug = slugify(hymn.author);
            const authorId = authorMap.get(authorSlug) || null;

            const hymnData = {
                number: hymn.number,
                title_telugu: hymn.titleTelugu.trim(),
                title_english: hymn.titleEnglish?.trim() || "",
                author_id: authorId,
                youtube_links: Array.isArray(hymn.youtubeLinks)
                    ? hymn.youtubeLinks
                    : []
            };

            const { error } = await supabase
                .from("hymns")
                .upsert(hymnData, {
                    onConflict: "number"
                });

            if (error) {
                failed++;
                console.error(`❌ Hymn ${hymn.number}`);
                console.error(error.message);
                continue;
            }

            imported++;

            console.log(`✅ Hymn ${hymn.number}`);

        } catch (err) {

            failed++;

            console.error(`❌ Exception while importing hymn ${hymn?.number}`);
            console.error(err);

        }

    }

    console.log("\n=================================");
    console.log(" Hymn Import Finished");
    console.log("=================================");
    console.log(`✅ Imported : ${imported}`);
    console.log(`⚠ Skipped  : ${skipped}`);
    console.log(`❌ Failed   : ${failed}`);
    console.log("=================================\n");
}
/* ==========================================
   START
========================================== */

const authorMap = await syncAuthors();

console.log(authorMap);

await syncHymns(authorMap);
console.log(`songsList contains ${songsList.length} hymns`);

console.log("\n🎉 Database sync complete!");

