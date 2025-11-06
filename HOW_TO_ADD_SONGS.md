# How to Add Songs and Authors

## 📍 Location: `js/songs-data.js`

This is the main file where you add all your song details, YouTube links, and author information.

## 🎵 Adding Songs

### Step 1: Open `js/songs-data.js`

### Step 2: Add each song in the `songsList` array

Use this structure for each song:

```javascript
{
    number: 1,                          // Song number (1-626)
    titleTelugu: "అన్ని కాలంబుల",      // Song title in Telugu
    titleEnglish: "Anni Kaalambula",     // Song title in English (transliteration)
    author: "బేతాళ జాన్",                // Author name in Telugu (leave "" if unknown)
    lyrics: {
        telugu: `అన్ని కాలంబుల
నా దేవుడు నాతో ఉన్నాడు
అతడు నన్ను కాపాడుతాడు`,              // Telugu lyrics
        english: `In all times
My God is with me
He protects me`                         // English translation
    },
    meaning: "This hymn expresses the assurance that God is always with us...",  // Meaning/explanation
    summary: "A devotional song about God's constant presence...",               // Brief summary
    youtubeLinks: [                                                             // YouTube links (can have multiple)
        "https://www.youtube.com/watch?v=08RCqxN3VEY",
        "https://www.youtube.com/watch?v=U4xpGq7A-gs"
    ]
}
```

### Important Notes:
- **Song Number**: Must be unique (1, 2, 3, ..., 626)
- **YouTube Links**: Can add multiple links per song
- **Author**: Leave as empty string `""` if author is unknown
- **Lyrics**: Optional - can omit if not available
- **Meaning & Summary**: Optional but recommended

## 👤 Adding Authors

### Step 1: Add author information in the `authorsList` array

```javascript
{
    name: "బేతాళ జాన్",                    // Author name in Telugu
    nameEnglish: "Bethal John",           // Author name in English
    bio: "A devoted hymn writer known for...",  // Biography in English
    bioTelugu: "ఆత్మిక సంగీత రచయితగా...",    // Biography in Telugu
    songs: [1, 5, 10],                    // Array of song numbers by this author
    featuredYouTubeLinks: [               // Optional: Featured performances
        "https://www.youtube.com/watch?v=VIDEO_ID"
    ]
}
```

### Important Notes:
- **songs**: List all song numbers written by this author
- **bio/bioTelugu**: Can include one or both
- **featuredYouTubeLinks**: Optional - for highlighting special performances

## 🔗 YouTube Links Format

### Supported Formats:
- Full URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Short URL: `https://youtu.be/VIDEO_ID`
- Embed format: `https://www.youtube.com/embed/VIDEO_ID`

All formats will work automatically!

## 📝 Example: Complete Song Entry

```javascript
{
    number: 4,
    titleTelugu: "దేవ దివ్యానంత ప్రభావ",
    titleEnglish: "Deva divyananta prabhava",
    author: "పురుషోత్తము చౌదరి",
    lyrics: {
        telugu: `దేవ దివ్యానంత ప్రభావ
నా హృదయంలో నివసిస్తాడు
అతని ప్రేమ నాకు బలం`,
        english: `God's divine infinite power
Resides in my heart
His love gives me strength`
    },
    meaning: "This hymn celebrates God's infinite divine power and love that resides in our hearts.",
    summary: "A powerful hymn about God's divine presence and love.",
    youtubeLinks: [
        "https://www.youtube.com/watch?v=IA6xgma8jsc",
        "https://youtu.be/_uGNOvsEl0Y"
    ]
}
```

## 🎯 Quick Tips

1. **Copy the template** from the examples in `songs-data.js`
2. **Fill in all available information** - the more complete, the better!
3. **Add multiple YouTube links** if different performances exist
4. **Keep song numbers sequential** for easier management
5. **Save the file** after adding songs - changes appear immediately when you refresh the page

## 📋 Checklist for Each Song

- [ ] Song number
- [ ] Telugu title
- [ ] English transliteration
- [ ] Author name (or empty string if unknown)
- [ ] Telugu lyrics (if available)
- [ ] English lyrics/translation (if available)
- [ ] Meaning/explanation
- [ ] Summary
- [ ] At least one YouTube link

## 🚀 After Adding Songs

1. Save `js/songs-data.js`
2. Refresh your browser (the page should automatically load the new songs)
3. Check the Hymns page to see your songs
4. Check the Authors page to see authors and their songs

## 💡 Need Help?

- See the examples already in `songs-data.js`
- Check the template structure in the file
- All fields are documented with comments

Happy adding! 🎵

