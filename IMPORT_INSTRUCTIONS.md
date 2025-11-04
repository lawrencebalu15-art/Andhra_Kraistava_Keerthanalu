# How to Import Your Songs Data

## Current Situation

I've extracted 469 songs from your PDF, but the text encoding is corrupted. The song numbers are correct, but the titles and authors need to be filled in.

## Option 1: Manual Entry (Recommended for Accuracy)

1. Open `js/songs-data.js`
2. Find the `songsList` array
3. Add your songs one by one in this format:

```javascript
const songsList = [
    {
        number: 1,
        titleTelugu: "జయ జయ యేసు క్రీస్తు",  // Telugu title
        titleEnglish: "Jaya Jaya Yesu Kristhu",  // English transliteration
        author: "Author Name",
        lyricsTelugu: "Full lyrics in Telugu...",
        lyricsEnglish: "Full lyrics in English...",
        meaning: "Meaning of the song...",
        summary: "Summary of the song..."
    },
    // Add all 626 songs here
];
```

## Option 2: If You Have Data in Excel/CSV

If you have your songs data in Excel or CSV format, I can help you convert it to the JavaScript format.

**CSV Format should be:**
```
Number,TitleTelugu,TitleEnglish,Author,LyricsTelugu,LyricsEnglish,Meaning,Summary
1,జయ జయ యేసు క్రీస్తు,Jaya Jaya Yesu Kristhu,Author Name,Lyrics in Telugu,Lyrics in English,Meaning,Summary
```

## Option 3: Use Extracted Song Numbers

I've created `songs_parsed.txt` with all 469 song numbers found in the PDF. You can use this as a starting point and fill in the titles and other details.

## Adding Your YouTube Channel Links

1. Open `js/songs-data.js`
2. Find the `FEATURED_YOUTUBE_CHANNEL` section
3. Add your YouTube channel info:

```javascript
const FEATURED_YOUTUBE_CHANNEL = {
    name: "Your YouTube Channel Name",
    channelUrl: "https://www.youtube.com/@yourchannel",
    videoIds: {
        1: "dQw4w9WgXcQ",  // YouTube video ID for song #1
        50: "abc123xyz",    // YouTube video ID for song #50
        // Add more as needed
    }
};
```

## Quick Start

1. Start with 10-20 songs to test
2. Add them to `songsList` in `js/songs-data.js`
3. Open `hymns.html` in your browser to see them
4. Once working, add the rest of your songs

## Need Help?

If you have your data in a different format (Excel, Word, text file, etc.), let me know and I can help you convert it!

