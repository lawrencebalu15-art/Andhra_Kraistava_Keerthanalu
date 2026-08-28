import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

const DOMAIN =
    "https://www.andhrakraistavakeerthanalukavulu.com";

async function generateSitemap() {

    console.log("Fetching hymns from Supabase...");

    const { data: hymns, error } = await supabase
        .from("hymns")
        .select("number, slug")
        .order("number", { ascending: true });

    if (error) {
        console.error("Supabase error:", error);
        process.exit(1);
    }

    console.log(`Found ${hymns.length} hymns.`);

    const staticPages = [
        "/",
        "/hymns.html",
        "/authors.html",
        "/books.html",
        "/interviews.html",
        "/gallery.html",
        "/about.html",
        "/contact.html",
        "/support.html"
    ];

    const urls = [];

    // Static pages
    for (const path of staticPages) {
        urls.push(`
  <url>
    <loc>${DOMAIN}${path}</loc>
  </url>`);
    }

    // Individual hymns
    for (const hymn of hymns) {

        urls.push(`
  <url>
    <loc>${DOMAIN}/hymn.html?id=${encodeURIComponent(hymn.number)}</loc>
  </url>`);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("")}
</urlset>
`;

    fs.writeFileSync("public/sitemap.xml", sitemap);

    console.log(
        `Sitemap generated successfully with ${urls.length} URLs.`
    );
}

generateSitemap()
