function extractYouTubeId(url) {

    if (!url) return null;

    const regExp =
        /^.*((youtu\.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

    const match = url.match(regExp);

    return (match && match[7].length === 11)
        ? match[7]
        : null;

}

function getYouTubeEmbedUrl(url) {

    const id = extractYouTubeId(url);

    return id
        ? `https://www.youtube.com/embed/${id}`
        : null;

}
