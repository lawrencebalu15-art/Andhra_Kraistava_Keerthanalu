import { songsList } from "../../data/hymns-data.js";

export function getAllSongs() {
    return [...songsList];
}

export function searchSongs(query = "") {

    query = query.trim().toLowerCase();

    if (!query) return [...songsList];

    return songsList.filter(song => {

        return (
            String(song.number ?? "").includes(query) ||
            (song.titleTelugu ?? "").toLowerCase().includes(query) ||
            (song.titleEnglish ?? "").toLowerCase().includes(query) ||
            (song.author ?? "").toLowerCase().includes(query)
        );

    });

}

export function sortSongs(list, sortBy) {

    const songs = [...list];

    switch (sortBy) {

        case "number-desc":
            songs.sort((a, b) => b.number - a.number);
            break;

        case "telugu-asc":
            songs.sort((a, b) =>
                (a.titleTelugu ?? "").localeCompare(
                    b.titleTelugu ?? "",
                    "te"
                )
            );
            break;

        case "telugu-desc":
            songs.sort((a, b) =>
                (b.titleTelugu ?? "").localeCompare(
                    a.titleTelugu ?? "",
                    "te"
                )
            );
            break;

        case "author-asc":
            songs.sort((a, b) =>
                (a.author ?? "").localeCompare(b.author ?? "")
            );
            break;

        case "author-desc":
            songs.sort((a, b) =>
                (b.author ?? "").localeCompare(a.author ?? "")
            );
            break;

        default:
            songs.sort((a, b) => a.number - b.number);

    }

    return songs;
}