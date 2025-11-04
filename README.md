# Andhra Kraistava Keerthanallu

A professional devotional website dedicated to preserving and promoting Telugu Christian hymn heritage.

## Overview

This website provides easy access to information about hymn authors, meanings, and summaries of Andhra Kraistava Keerthanallu (Andhra Christian Hymns). The site features a clean, serene devotional design with a soft color palette and elegant typography.

## Features

### 1. Homepage
- Introduction to Andhra Kraistava Keerthanallu
- Cultural and spiritual significance
- Feature highlights
- Navigation menu

### 2. Authors Page
- Alphabetically listed hymn authors
- Author biographies
- List of hymns by each author
- Hymn summaries and meanings
- YouTube embedded players
- Filter by name initials (A–Z)
- Search functionality

### 3. Hymns Page
- Searchable library of hymns
- Alphabetical arrangement
- Telugu and English titles
- Hymn descriptions
- YouTube links
- Sort by title, author, or date

### 4. About Page
- Project background and motivation
- Mission statement
- Acknowledgments
- References and resources

### 5. Contact Page
- Contact form for inquiries
- Request additions
- Suggest corrections
- Share information

## Technical Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Global Search**: Quick navigation to songs or authors
- **Smooth Animations**: Minimal animations maintaining spiritual tone
- **YouTube Integration**: Embedded players for hymn listening
- **Telugu Support**: Displays Telugu text alongside English transliterations

## File Structure

```
andhra-kraistava-keerthanalu/
├── index.html          # Homepage
├── authors.html        # Authors listing page
├── hymns.html          # Hymns library page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   ├── main.js         # Global search and utilities
│   ├── authors.js      # Authors page functionality
│   ├── hymns.js        # Hymns page functionality
│   └── contact.js      # Contact form handling
└── README.md           # This file
```

## Getting Started

1. Open `index.html` in a web browser
2. Navigate through the pages using the menu
3. Use the search functionality to find specific hymns or authors
4. Filter authors by initial letter on the Authors page
5. Search hymns by title, author, or description on the Hymns page

## Adding Content

To add more hymns or authors, edit the JavaScript files:

- **Authors**: Edit `js/authors.js` and add to the `authorsData` array
- **Hymns**: Edit `js/hymns.js` and add to the `hymnsData` array

### Author Data Format:
```javascript
{
    id: 1,
    name: "Author Name",
    bio: "Biography text...",
    hymns: [
        {
            id: 1,
            titleTelugu: "తెలుగు శీర్షిక",
            titleEnglish: "English Title",
            description: "Hymn description...",
            youtubeLink: "https://www.youtube.com/watch?v=..."
        }
    ]
}
```

### Hymn Data Format:
```javascript
{
    id: 1,
    titleTelugu: "తెలుగు శీర్షిక",
    titleEnglish: "English Title",
    author: "Author Name",
    description: "Hymn description...",
    youtubeLink: "https://www.youtube.com/watch?v=..."
}
```

## Customization

### Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #8B7355;    /* Soft gold/tan */
    --secondary-color: #B8D4E3;  /* Sky blue */
    --accent-color: #E8DCC6;     /* Light cream */
    /* ... */
}
```

### Fonts
The site uses Google Fonts:
- **Headings**: Playfair Display (serif)
- **Body**: Source Sans Pro (sans-serif)

To change fonts, update the Google Fonts link in the HTML files and the `font-family` properties in CSS.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- YouTube links are provided as examples. Replace with actual hymn video URLs
- The contact form currently shows a success message but doesn't send emails. You'll need to integrate with a backend service for actual form submission
- All hymn content is attributed to their respective authors
- This website is created for devotional and educational purposes

## License

This project is created for devotional and educational purposes. All hymn content is attributed to their respective authors.

## Contact

For questions, suggestions, or contributions, please use the Contact page on the website.

---

**Dedicated to preserving Telugu Christian hymn heritage**

