import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  server: {
    open: "/index.html",
  },

  build: {
    rollupOptions: {
      input: {
        // Website
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

        // ADMIN
        adminLogin: resolve(__dirname, "admin/login.html"),
        adminDashboard: resolve(__dirname, "admin/dashboard.html"),
        adminIndex: resolve(__dirname, "admin/index.html"),

        adminInterviews: resolve(__dirname, "admin/pages/interviews.html"),
        adminHymns: resolve(__dirname, "admin/pages/hymns.html"),
        adminAuthors: resolve(__dirname, "admin/pages/authors.html"),
        adminBooks: resolve(__dirname, "admin/pages/books.html"),
        adminCategories: resolve(__dirname, "admin/pages/categories.html"),
        adminMedia: resolve(__dirname, "admin/pages/media.html"),
        adminMessages: resolve(__dirname, "admin/pages/messages.html"),
        adminUsers: resolve(__dirname, "admin/pages/users.html"),
        adminSettings: resolve(__dirname, "admin/pages/settings.html"),
      },
    },
  },
});