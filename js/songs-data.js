// Songs Data for Andhra Kraistava Keerthanallu
// Complete collection of 626 Telugu Christian Hymns
// This file contains all song data: lyrics, meaning, summary, author info, and YouTube links

// ============================================
// CONFIGURATION - UPDATE THIS SECTION
// ============================================

// Featured YouTube channel information
const FEATURED_YOUTUBE_CHANNEL = {
    name: "David Sandeep Pallapu", // Update with actual channel name
    channelUrl: "https://www.youtube.com/@davidsandeeppallapu", // Update with actual channel URL
    // Add the YouTube video ID for each song available on this channel
    // Format: songNumber: "videoId"
    // Example: { 1: "abc123xyz", 50: "def456uvw" }
    videoIds: {
        // Add song numbers and their YouTube video IDs here
        // Example: 1: "dQw4w9WgXcQ", 2: "abc123xyz", etc.
    }
};

// ============================================
// AUTHORS DATA - REPLACE WITH YOUR ACTUAL AUTHORS
// ============================================

const authorsList = [
    // Add your actual authors here
    // Format for each author:
    // {
    //     name: "Author Name",
    //     bio: "Author biography and information..."
    // }
    
    // Example:
    // { name: "Charles Wesley", bio: "Charles Wesley (1707-1788) was an English Methodist leader..." },
    // { name: "John Newton", bio: "John Newton (1725-1807) was an English Anglican clergyman..." },
    
    // Add all your authors here
];

// ============================================
// SONGS DATA - REPLACE WITH YOUR ACTUAL SONGS
// ============================================

const songsList = [
    // Add your actual 626 songs here
    // Format for each song:
    // {
    //     number: 1,
    //     titleTelugu: "తెలుగు శీర్షిక",
    //     titleEnglish: "English Title",
    //     author: "Author Name",
    //     lyricsTelugu: "తెలుగు సాహిత్యం...",
    //     lyricsEnglish: "English lyrics...",
    //     meaning: "Meaning of the song...",
    //     summary: "Summary of the song...",
    //     // Optional: per-song YouTube link (use this if the video is from any channel)
    //     youtubeLink: "https://www.youtube.com/watch?v=VIDEO_ID",
    //     youtubeChannel: "Channel Name", // optional
    //     youtubeChannelLink: "https://www.youtube.com/@channel" // optional
    // }
    
    // Example:
    // {
    //     number: 1,
    //     titleTelugu: "జయ జయ యేసు క్రీస్తు",
    //     titleEnglish: "Jaya Jaya Yesu Kristhu",
    //     author: "Charles Wesley",
    //     lyricsTelugu: "జయ జయ యేసు క్రీస్తు\nప్రభువు స్తోత్రం...",
    //     lyricsEnglish: "Jaya Jaya Yesu Kristhu\nLord's praise...",
    //     meaning: "This hymn celebrates the victory of Jesus Christ...",
    //     summary: "A triumphant hymn celebrating Jesus Christ's victory..."
    // },
    
    // Sample entries to get started (replace with original data)
    {
        number: 1,
        titleTelugu: "అన్ని కాలంబుల",
        titleEnglish: "Anni Kaalambula",
        author: "బేతాళ జాన్",
        lyricsTelugu: "",
        lyricsEnglish: "",
        meaning: "",
        summary: "",
        youtubeLinks: [
            "https://www.youtube.com/watch?v=08RCqxN3VEY",
            "https://www.youtube.com/watch?v=U4xpGq7A-gs"
        ]
            
        
    },
    {
        number: 2,
        titleTelugu: "గానము జేయుడు",
        titleEnglish: "Gaanamu jeyudu",
        author: "విలియం డాసన్",
        lyricsTelugu: "",
        lyricsEnglish: "",
        meaning: "",
        summary: "",
        youtubeLinks: ["https://www.youtube.com/watch?v=5FUePS25kLs"]
    },
    {
        number: 3,
        titleTelugu: "యేసు నాయకుడా",
        titleEnglish: "Yesu naayakudaa",
        author: "",
        lyricsTelugu: "",
        lyricsEnglish: "",
        meaning: "",
        summary: "",
        youtubeLinks: ["https://www.youtube.com/watch?v=aCZUgWLMO5A"]
    },
    {
        number: 4,
        titleTelugu: "దేవ దివ్యానంత ప్రభావ",
        titleEnglish: "Deva divyananta prabhava",
        author: "పురుషోత్తము చౌదరి",
        lyricsTelugu: "",
        lyricsEnglish: "",
        meaning: "",
        summary: "",
        youtubeLinks: ["https://www.youtube.com/watch?v=IA6xgma8jsc"]
    },
    {
        number: 5,
        titleTelugu: "దేవ దివ్యానంత ప్రభావ",
        titleEnglish: "Deva divyananta prabhava",
        author: "పురుషోత్తము చౌదరి",
        lyricsTelugu: "",
        lyricsEnglish: "",
        meaning: "",
        summary: "",
        youtubeLinks: ["https://youtu.be/_uGNOvsEl0Y?si=6n_YySybFvY_lVrC"]
    }
    
    // Add all 626 songs here
];

// ============================================
// DATA PROCESSING - DO NOT MODIFY BELOW
// ============================================

// Process songs data and add YouTube links
const processSongsData = () => {
    if (!songsList || songsList.length === 0) {
        console.warn('No songs data found. Please add your songs to the songsList array above.');
        return generatePlaceholderData();
    }
    
    return songsList.map(song => {
        // Prefer per-song YouTube link when provided
        let youtubeLink = song.youtubeLink || null;
        let youtubeChannel = song.youtubeChannel || null;
        let youtubeChannelLink = song.youtubeChannelLink || null;
        let isFeaturedChannel = false;

        // Normalize multi-link support if provided
        let youtubeLinks = [];
        if (Array.isArray(song.youtubeLinks) && song.youtubeLinks.length > 0) {
            youtubeLinks = song.youtubeLinks.map(link => {
                if (typeof link === 'string') {
                    return { url: link, channel: song.youtubeChannel || null, channelLink: song.youtubeChannelLink || null, isFeatured: false };
                }
                return {
                    url: link.url || null,
                    channel: link.channel || null,
                    channelLink: link.channelLink || null,
                    isFeatured: !!link.isFeatured
                };
            }).filter(l => !!l.url);
            // Set primary fields from first link for backward compatibility
            if (youtubeLinks.length > 0) {
                youtubeLink = youtubeLink || youtubeLinks[0].url;
                youtubeChannel = youtubeChannel || youtubeLinks[0].channel;
                youtubeChannelLink = youtubeChannelLink || youtubeLinks[0].channelLink;
                isFeaturedChannel = isFeaturedChannel || !!youtubeLinks[0].isFeatured;
            }
        }

        // Fallback to featured channel map if no per-song link provided
        if (!youtubeLink) {
            const videoId = FEATURED_YOUTUBE_CHANNEL.videoIds[song.number];
            if (videoId) {
                youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
                youtubeChannel = FEATURED_YOUTUBE_CHANNEL.name;
                youtubeChannelLink = FEATURED_YOUTUBE_CHANNEL.channelUrl;
                isFeaturedChannel = true;
                if (youtubeLinks.length === 0) {
                    youtubeLinks.push({ url: youtubeLink, channel: youtubeChannel, channelLink: youtubeChannelLink, isFeatured: true });
                }
            }
        }
        
        // Get author bio
        const authorInfo = authorsList.find(a => a.name === song.author) || {
            name: song.author || "Unknown Author",
            bio: "Author information not available."
        };
        
        return {
            id: song.number,
            number: song.number,
            titleTelugu: song.titleTelugu || `Song ${song.number}`,
            titleEnglish: song.titleEnglish || `Song ${song.number}`,
            author: authorInfo.name,
            authorBio: authorInfo.bio,
            lyricsTelugu: song.lyricsTelugu || `Song ${song.number} - Telugu lyrics`,
            lyricsEnglish: song.lyricsEnglish || `Song ${song.number} - English lyrics`,
            meaning: song.meaning || `Meaning of song ${song.number}`,
            summary: song.summary || `Summary of song ${song.number}`,
            youtubeLink,
            youtubeChannel,
            isFeaturedChannel,
            youtubeChannelLink,
            youtubeLinks,
            category: song.category || "Devotional",
            language: "Telugu",
            year: song.year || null,
            notes: song.notes || null
        };
    });
};

// Generate placeholder data if no actual data is provided
const generatePlaceholderData = () => {
    console.warn('Using placeholder data. Please add your actual songs and authors data.');
    const songs = [];
    const defaultAuthors = [
        { name: "Unknown Author", bio: "Author information not available." }
    ];
    
    for (let i = 1; i <= 626; i++) {
        songs.push({
            id: i,
            number: i,
            titleTelugu: `కీర్తన ${i}`,
            titleEnglish: `Song ${i}`,
            author: defaultAuthors[0].name,
            authorBio: defaultAuthors[0].bio,
            lyricsTelugu: `పాట ${i} - తెలుగు సాహిత్యం\n\n(Add actual lyrics)`,
            lyricsEnglish: `Song ${i} - English Lyrics\n\n(Add actual lyrics)`,
            meaning: `Meaning of song ${i}`,
            summary: `Summary of song ${i}`,
            youtubeLink: null,
            youtubeChannel: null,
            isFeaturedChannel: false,
            youtubeChannelLink: null,
            category: "Devotional",
            language: "Telugu",
            year: null,
            notes: null
        });
    }
    
    return songs;
};

// Export the songs data
const songsData = processSongsData();

// Generate authors data from songs
const authorsDataMap = new Map();
songsData.forEach(song => {
    if (!authorsDataMap.has(song.author)) {
        authorsDataMap.set(song.author, {
            name: song.author,
            bio: song.authorBio,
            songs: []
        });
    }
    authorsDataMap.get(song.author).songs.push({
        id: song.id,
        number: song.number,
        titleTelugu: song.titleTelugu,
        titleEnglish: song.titleEnglish,
        meaning: song.meaning,
        summary: song.summary,
        youtubeLink: song.youtubeLink,
        youtubeChannel: song.youtubeChannel,
        isFeaturedChannel: song.isFeaturedChannel
    });
});

const authorsData = Array.from(authorsDataMap.values()).sort((a, b) => a.name.localeCompare(b.name));

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.songsData = songsData;
    window.authorsData = authorsData;
}
