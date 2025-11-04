# How to Add Original Song Names

## Where to Add Song Data

Open the file: **`js/songs-data.js`**

Find the section that says:
```javascript
const songsList = [
    // Add your actual 626 songs here
];
```

## Step-by-Step: Adding Song Names

### Method 1: Manual Entry (Best for Accuracy)

Add each song in this format:

```javascript
const songsList = [
    {
        number: 1,
        titleTelugu: "జయ జయ యేసు క్రీస్తు",  // Original Telugu song name
        titleEnglish: "Jaya Jaya Yesu Kristhu",  // English transliteration
        author: "Author Name Here",
        lyricsTelugu: "Full Telugu lyrics here...",
        lyricsEnglish: "Full English lyrics here...",
        meaning: "Meaning of the song...",
        summary: "Summary of the song..."
    },
    {
        number: 2,
        titleTelugu: "Next song Telugu name",
        titleEnglish: "Next song English name",
        author: "Author Name",
        lyricsTelugu: "...",
        lyricsEnglish: "...",
        meaning: "...",
        summary: "..."
    },
    // Continue for all 626 songs
];
```

### Method 2: If You Have Data in Another Format

**If you have your songs in:**
- **Excel/CSV**: I can help convert it
- **Word Document**: I can help extract and format it
- **Text File**: I can help parse it
- **Another PDF**: We can try a different extraction method

### Method 3: Using Your PDF Directly

If you can open the PDF and see the song names clearly:

1. Open your PDF file
2. For each song, copy:
   - Song number
   - Telugu title
   - English title (if available)
   - Author name
   - Lyrics
   - Meaning/Summary

3. Add them to `songsList` array in `js/songs-data.js`

## Example: Adding Song #1

If Song #1 from your PDF is:
- **Telugu Title**: "జయ జయ యేసు క్రీస్తు"
- **English Title**: "Jaya Jaya Yesu Kristhu"
- **Author**: "Charles Wesley"
- **Lyrics**: (copy from PDF)
- **Meaning**: (copy from PDF)

Then add it like this:

```javascript
{
    number: 1,
    titleTelugu: "జయ జయ యేసు క్రీస్తు",
    titleEnglish: "Jaya Jaya Yesu Kristhu",
    author: "Charles Wesley",
    lyricsTelugu: "జయ జయ యేసు క్రీస్తు\nప్రభువు స్తోత్రం...",
    lyricsEnglish: "Jaya Jaya Yesu Kristhu\nLord's praise...",
    meaning: "This hymn celebrates the victory of Jesus Christ...",
    summary: "A triumphant hymn celebrating Jesus Christ's victory..."
}
```

## Quick Start

1. **Start with 10 songs** to test the format
2. Add them to `songsList` in `js/songs-data.js`
3. Save the file
4. Refresh `hymns.html` in your browser
5. You should see your 10 songs displayed
6. If it works, continue adding the rest

## Need Help?

**Tell me:**
- Do you have the song names in another file format?
- Can you see the song names clearly in your PDF?
- Do you have them in Excel or Word document?

I can help you convert any format into the JavaScript format needed!

