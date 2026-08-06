import supabase from "./supabase-admin.js";
import { authorsList } from "../data/authors-data.js";

function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s\u0C00-\u0C7F]/g, "")
        .replace(/\s+/g, "-")
        .trim();
}

async function importAuthors() {

    console.log(`Importing ${authorsList.length} authors...\n`);

    for (const author of authorsList) {

        const authorData = {

            name: author.name,

            slug: createSlug(author.nameEnglish || author.name),

            bio: author.bio || author.bioTelugu || "",

            photo_url: null,

            birth_year: null,

            death_year: null,

            country: null

        };

        const { error } = await supabase
            .from("authors")
            .insert(authorData);

        if (error) {

            console.error(`❌ ${author.name}`);
            console.error(error.message);

        } else {

            console.log(`✅ ${author.name}`);

        }

    }

    console.log("\n🎉 Authors imported successfully.");

}

importAuthors();