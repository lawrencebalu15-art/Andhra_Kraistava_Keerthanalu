// Enhanced Authors page functionality
// Handles author listing, filtering, and search with full author information

document.addEventListener('DOMContentLoaded', function() {
    // Wait for authors data to load
    if (typeof window.authorsData === 'undefined') {
        console.error('Authors data not loaded. Make sure songs-data.js is included before authors.js');
        return;
    }

    // Initialize authors list
    initializeAuthors();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const authorParam = urlParams.get('author');
    const searchParam = urlParams.get('search');
    
    if (authorParam) {
        scrollToAuthor(authorParam);
    }
    
    if (searchParam) {
        const authorSearch = document.getElementById('authorSearch');
        if (authorSearch) {
            authorSearch.value = searchParam;
            filterAuthors();
        }
    }
});

function setupEventListeners() {
    // Filter by initial letter
    const initialFilter = document.getElementById('initialFilter');
    if (initialFilter) {
        initialFilter.addEventListener('change', filterAuthors);
    }
    
    // Search functionality
    const authorSearch = document.getElementById('authorSearch');
    if (authorSearch) {
        authorSearch.addEventListener('input', debounce(filterAuthors, 300));
    }
}

function initializeAuthors() {
    // Display all authors
    displayAuthors(window.authorsData);
}

function filterAuthors() {
    const initialFilter = document.getElementById('initialFilter');
    const authorSearch = document.getElementById('authorSearch');
    
    const selectedInitial = initialFilter ? initialFilter.value : 'all';
    const searchTerm = authorSearch ? authorSearch.value.trim().toLowerCase() : '';
    
    let filteredAuthors = [...window.authorsData];
    
    // Filter by initial letter
    if (selectedInitial !== 'all') {
        filteredAuthors = filteredAuthors.filter(author => 
            author.name.charAt(0).toUpperCase() === selectedInitial
        );
    }
    
    // Filter by search term
    if (searchTerm) {
        filteredAuthors = filteredAuthors.filter(author => 
            author.name.toLowerCase().includes(searchTerm) ||
            author.bio.toLowerCase().includes(searchTerm) ||
            author.songs.some(song => 
                song.titleTelugu.toLowerCase().includes(searchTerm) ||
                song.titleEnglish.toLowerCase().includes(searchTerm)
            )
        );
    }
    
    // Sort alphabetically
    filteredAuthors.sort((a, b) => a.name.localeCompare(b.name));
    
    // Display authors
    displayAuthors(filteredAuthors);
}

function displayAuthors(authors) {
    const authorsList = document.getElementById('authorsList');
    if (!authorsList) return;
    
    if (authors.length === 0) {
        authorsList.innerHTML = '<div class="no-results">No authors found matching your search criteria.</div>';
        return;
    }
    
    authorsList.innerHTML = authors.map(author => createAuthorCard(author)).join('');
    
    // Initialize YouTube embeds and attach event listeners
    attachAuthorEventListeners();
}

function createAuthorCard(author) {
    const songsCount = author.songs.length;
    const featuredSongs = author.songs.filter(song => song.isFeaturedChannel);
    
    // Featured songs section
    const featuredSongsHtml = featuredSongs.length > 0 ? `
        <div class="featured-songs-section">
            <h4>Featured YouTube Performances</h4>
            <div class="featured-songs-list">
                ${featuredSongs.map(song => createFeaturedSongItem(song)).join('')}
            </div>
        </div>
    ` : '';
    
    // All songs list
    const songsHtml = author.songs.map(song => createSongItem(song)).join('');
    
    return `
        <div class="author-card" data-author="${author.name.toLowerCase()}" id="author-${author.name.replace(/\s+/g, '-').toLowerCase()}">
            <div class="author-header">
                <h3 class="author-name">${author.name}</h3>
                <span class="author-song-count">${songsCount} Song${songsCount !== 1 ? 's' : ''}</span>
            </div>
            
            <div class="author-bio">
                <p>${author.bio}</p>
            </div>
            
            ${featuredSongsHtml}
            
            <div class="author-hymns">
                <h4>All Songs by ${author.name}:</h4>
                <div class="songs-grid">
                    ${songsHtml}
                </div>
            </div>
        </div>
    `;
}

function createSongItem(song) {
    const youtubeEmbed = getYouTubeEmbedUrl(song.youtubeLink);
    const isFeatured = song.isFeaturedChannel;
    
    const featuredBadge = isFeatured ? '<span class="song-featured-badge">⭐ Featured</span>' : '';
    
    return `
        <div class="song-item" data-song-number="${song.number}">
            <div class="song-item-header">
                <span class="song-item-number">#${song.number}</span>
                ${featuredBadge}
            </div>
            <div class="song-item-title">
                <div class="song-item-title-telugu">${song.titleTelugu}</div>
                <div class="song-item-title-english">${song.titleEnglish}</div>
            </div>
            <div class="song-item-summary">
                <p>${song.summary}</p>
            </div>
            ${youtubeEmbed ? `
                <div class="song-item-youtube">
                    <div class="youtube-embed">
                        <iframe src="${youtubeEmbed}" frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen></iframe>
                    </div>
                    <a href="${song.youtubeLink}" target="_blank" class="external-link">Watch on YouTube ↗</a>
                </div>
            ` : `
                <a href="${song.youtubeLink}" target="_blank" class="youtube-link">Listen on YouTube ↗</a>
            `}
            <a href="hymns.html?song=${song.number}" class="view-song-link">View Full Details →</a>
        </div>
    `;
}

function createFeaturedSongItem(song) {
    const youtubeEmbed = getYouTubeEmbedUrl(song.youtubeLink);
    
    return `
        <div class="featured-song-item">
            <div class="featured-song-header">
                <span class="featured-song-number">#${song.number}</span>
                <span class="featured-badge">⭐ Featured</span>
            </div>
            <div class="featured-song-title">
                <div class="featured-song-title-telugu">${song.titleTelugu}</div>
                <div class="featured-song-title-english">${song.titleEnglish}</div>
            </div>
            ${youtubeEmbed ? `
                <div class="youtube-embed">
                    <iframe src="${youtubeEmbed}" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                </div>
            ` : ''}
            <a href="hymns.html?song=${song.number}" class="view-song-link">View Full Details →</a>
        </div>
    `;
}

function attachAuthorEventListeners() {
    // View song links
    document.querySelectorAll('.view-song-link').forEach(link => {
        link.addEventListener('click', function(e) {
            // Link will navigate naturally, no need for special handling
        });
    });
}

function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

function scrollToAuthor(authorName) {
    const authorId = authorName.replace(/\s+/g, '-').toLowerCase();
    const authorElement = document.getElementById(`author-${authorId}`);
    
    if (authorElement) {
        // Apply filters to show this author
        const authorSearch = document.getElementById('authorSearch');
        if (authorSearch) {
            authorSearch.value = authorName;
            filterAuthors();
        }
        
        // Scroll to the author
        setTimeout(() => {
            authorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.filterAuthors = filterAuthors;
    window.scrollToAuthor = scrollToAuthor;
}
