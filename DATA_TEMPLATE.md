# How to Add Your Songs and Authors Data

## Step 1: Add Your YouTube Channel Information

Edit `js/songs-data.js` and update the `FEATURED_YOUTUBE_CHANNEL` section:

```javascript
const FEATURED_YOUTUBE_CHANNEL = {
    name: "Your YouTube Channel Name",
    channelUrl: "https://www.youtube.com/@yourchannel",
    videoIds: {
        1: "videoId1",      // Song #1 YouTube video ID
        50: "videoId50",    // Song #50 YouTube video ID
        100: "videoId100",  // Song #100 YouTube video ID
        // Add more song numbers and their video IDs here
    }
};
```

**How to get YouTube Video ID:**
- From URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → Video ID is `dQw4w9WgXcQ`
- From URL: `https://youtu.be/dQw4w9WgXcQ` → Video ID is `dQw4w9WgXcQ`

## Step 2: Add Your Authors

In `js/songs-data.js`, add your authors to the `authorsList` array:

```javascript
const authorsList = [
    {
        name: "Author Name 1",
        bio: "Biography of author 1..."
    },
    {
        name: "Author Name 2",
        bio: "Biography of author 2..."
    },
    // Add all your authors here
];
```

## Step 3: Add Your Songs (626 songs)

In `js/songs-data.js`, add all 626 songs to the `songsList` array:

```javascript
const songsList = [
    {
        number: 1,
        titleTelugu: "జయ జయ యేసు క్రీస్తు",
        titleEnglish: "Jaya Jaya Yesu Kristhu",
        author: "Author Name",
        lyricsTelugu: "జయ జయ యేసు క్రీస్తు\nప్రభువు స్తోత్రం...",
        lyricsEnglish: "Jaya Jaya Yesu Kristhu\nLord's praise...",
        meaning: "This hymn celebrates the victory of Jesus Christ...",
        summary: "A triumphant hymn celebrating Jesus Christ's victory..."
    },
    {
        number: 2,
        titleTelugu: "అనురాగ మూర్తి",
        titleEnglish: "Anuragam Murthi",
        author: "Author Name",
        lyricsTelugu: "...",
        lyricsEnglish: "...",
        meaning: "...",
        summary: "..."
    },
    // Add all 626 songs here
];
```

## Data Format Explanation

Each song should have:
- **number**: Song number (1-626)
- **titleTelugu**: Song title in Telugu script
- **titleEnglish**: Song title in English transliteration
- **author**: Author's name (must match a name in authorsList)
- **lyricsTelugu**: Full lyrics in Telugu (use `\n` for line breaks)
- **lyricsEnglish**: Full lyrics in English (use `\n` for line breaks)
- **meaning**: Meaning/explanation of the song
- **summary**: Brief summary of the song

## Optional Fields

You can also add these optional fields:
- **category**: Song category (e.g., "Devotional", "Praise", "Worship")
- **year**: Year the song was written
- **notes**: Additional notes about the song

## Example: Adding a Song with YouTube Link

If you have a YouTube video for song #1, add it to the videoIds:

```javascript
const FEATURED_YOUTUBE_CHANNEL = {
    name: "YouTube Channel",
    channelUrl: "https://www.youtube.com/@yourchannel",
    videoIds: {
        1: "dQw4w9WgXcQ"  // YouTube video ID for song #1
    }
};
```

Then in songsList, song #1 will automatically get the YouTube link from your featured channel.

## Tips

1. **Start with a few songs**: Test with 5-10 songs first to make sure everything works
2. **Use consistent author names**: Make sure author names in songs match exactly with names in authorsList
3. **Line breaks in lyrics**: Use `\n` for new lines in lyrics
4. **Save frequently**: Save your work often while adding data

## Need Help?

If you have your data in a different format (CSV, Excel, JSON, etc.), you can:
1. Convert it to the format shown above
2. Or ask for help converting your existing data format

