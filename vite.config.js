import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: "/index.html",
  },

  build: {
    rollupOptions: {
      input: {
        // Public Website
        main: resolve(__dirname, "index.html"),
        hymns: resolve(__dirname, "hymns.html"),
        hymn: resolve(__dirname, "hymn.html"),
        authors: resolve(__dirname, "authors.html"),
        author: resolve(__dirname, "author.html"),
        books: resolve(__dirname, "books.html"),
        interviews: resolve(__dirname, "interviews.html"),
        gallery: resolve(__dirname, "gallery.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        support: resolve(__dirname, "support.html"),

      },
    },
  },
});