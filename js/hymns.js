// Enhanced Hymns page functionality
// Handles all 626 songs with full features: lyrics, meaning, summary, author info, YouTube integration

document.addEventListener('DOMContentLoaded', function() {
    // Wait for songs data to load
    if (typeof window.songsData === 'undefined') {
        console.error('Songs data not loaded. Make sure songs-data.js is included before hymns.js');
        return;
    }

    // Initialize hymns list
    initializeHymns();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const songParam = urlParams.get('song');
    
    if (searchParam) {
        const songSearch = document.getElementById('songSearch');
        if (songSearch) {
            songSearch.value = searchParam;
            performSongSearch();
        }
    }
    
    if (songParam) {
        const songNumber = parseInt(songParam);
        if (!isNaN(songNumber) && songNumber >= 1 && songNumber <= 626) {
            scrollToSong(songNumber);
        }
    }
});

function setupEventListeners() {
    // Search functionality
    const songSearch = document.getElementById('songSearch');
    if (songSearch) {
        songSearch.addEventListener('input', debounce(performSongSearch, 300));
    }
    
    // Clear search button
    const clearSearch = document.getElementById('clearSearch');
    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            const songSearch = document.getElementById('songSearch');
            if (songSearch) {
                songSearch.value = '';
                performSongSearch();
            }
        });
    }
    
    // Sort functionality
    const sortSongs = document.getElementById('sortSongs');
    if (sortSongs) {
        sortSongs.addEventListener('change', performSongSearch);
    }
    
    // Filter by author
    const filterAuthor = document.getElementById('filterAuthor');
    if (filterAuthor) {
        filterAuthor.addEventListener('change', performSongSearch);
    }
    
    // Filter by initial letter
    const filterInitial = document.getElementById('filterInitial');
    if (filterInitial) {
        filterInitial.addEventListener('change', performSongSearch);
    }
    
    // Filter by song number
    const filterNumber = document.getElementById('filterNumber');
    if (filterNumber) {
        filterNumber.addEventListener('input', debounce(performSongSearch, 300));
    }
    
    // Language toggle
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
}

function initializeHymns() {
    // Populate author filter
    populateAuthorFilter();
    
    // Initial display
    performSongSearch();
}

function populateAuthorFilter() {
    const filterAuthor = document.getElementById('filterAuthor');
    if (!filterAuthor) return;
    
    // Get unique authors
    const authors = [...new Set(window.songsData.map(song => song.author))].sort();
    
    // Clear existing options except "All Authors"
    filterAuthor.innerHTML = '<option value="all">All Authors</option>';
    
    // Add author options
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        filterAuthor.appendChild(option);
    });
}

function performSongSearch() {
    const songSearch = document.getElementById('songSearch');
    const sortSongs = document.getElementById('sortSongs');
    const filterAuthor = document.getElementById('filterAuthor');
    const filterInitial = document.getElementById('filterInitial');
    const filterNumber = document.getElementById('filterNumber');
    
    const searchTerm = songSearch ? songSearch.value.trim().toLowerCase() : '';
    const sortBy = sortSongs ? sortSongs.value : 'number';
    const selectedAuthor = filterAuthor ? filterAuthor.value : 'all';
    const selectedInitial = filterInitial ? filterInitial.value : 'all';
    const songNumber = filterNumber ? parseInt(filterNumber.value) : null;
    
    let filteredSongs = [...window.songsData];
    
    // Filter by search term
    if (searchTerm) {
        filteredSongs = filteredSongs.filter(song => 
            song.titleTelugu.toLowerCase().includes(searchTerm) ||
            song.titleEnglish.toLowerCase().includes(searchTerm) ||
            song.author.toLowerCase().includes(searchTerm) ||
            song.meaning.toLowerCase().includes(searchTerm) ||
            song.summary.toLowerCase().includes(searchTerm) ||
            song.lyricsTelugu.toLowerCase().includes(searchTerm) ||
            song.lyricsEnglish.toLowerCase().includes(searchTerm) ||
            song.number.toString().includes(searchTerm)
        );
    }
    
    // Filter by author
    if (selectedAuthor !== 'all') {
        filteredSongs = filteredSongs.filter(song => song.author === selectedAuthor);
    }
    
    // Filter by initial letter
    if (selectedInitial !== 'all') {
        filteredSongs = filteredSongs.filter(song => 
            song.titleEnglish.charAt(0).toUpperCase() === selectedInitial
        );
    }
    
    // Filter by song number
    if (songNumber && !isNaN(songNumber)) {
        filteredSongs = filteredSongs.filter(song => song.number === songNumber);
    }
    
    // Sort songs
    filteredSongs.sort((a, b) => {
        switch (sortBy) {
            case 'number':
                return a.number - b.number;
            case 'title':
                return a.titleEnglish.localeCompare(b.titleEnglish);
            case 'author':
                return a.author.localeCompare(b.author);
            default:
                return a.number - b.number;
        }
    });
    
    // Update count
    updateSongCount(filteredSongs.length);
    
    // Display songs
    displaySongs(filteredSongs);
}

function displaySongs(songs) {
    const songsList = document.getElementById('songsList');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    if (!songsList) return;
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    if (songs.length === 0) {
        songsList.innerHTML = '<div class="no-results">No songs found matching your search criteria.</div>';
        return;
    }
    
    // Create song cards
    songsList.innerHTML = songs.map(song => createSongCard(song)).join('');
    
    // Add event listeners for expand/collapse
    attachExpandListeners();
}

function createSongCard(song) {
    const isFeatured = song.isFeaturedChannel;
    
    // Featured channel badge
    const featuredBadge = isFeatured ? `
        <div class="featured-channel-badge">
            <span class="badge-icon">⭐</span>
            <span>Featured: ${song.youtubeChannel}</span>
        </div>
    ` : '';
    
    // Build YouTube sections (support multiple links)
    let youtubeSection = '';
    const links = Array.isArray(song.youtubeLinks) && song.youtubeLinks.length > 0
        ? song.youtubeLinks
        : (song.youtubeLink ? [{ url: song.youtubeLink, channel: song.youtubeChannel, channelLink: song.youtubeChannelLink, isFeatured: song.isFeaturedChannel }] : []);

    if (links.length > 0) {
        youtubeSection = `
            <div class="youtube-section">
                ${isFeatured && (song.youtubeChannel || song.youtubeChannelLink) ? `
                    <div class="featured-channel-info">
                        <strong>Featured Performance:</strong> 
                        <a href="${song.youtubeChannelLink || '#'}" target="_blank" class="channel-link">${song.youtubeChannel || ''}</a>
                    </div>
                ` : ''}
                ${links.map((l, idx) => {
                    const embed = getYouTubeEmbedUrl(l.url);
                    if (embed) {
                        return `
                            <div class="youtube-embed" data-index="${idx}">
                                <iframe src="${embed}" frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen></iframe>
                            </div>
                            <a href="${l.url}" target="_blank" class="external-link">Watch on YouTube ↗</a>
                        `;
                    }
                    return `
                        <a href="${l.url}" target="_blank" class="youtube-link">Listen on YouTube ↗</a>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    return `
        <div class="song-card" data-song-number="${song.number}" id="song-${song.number}">
            <div class="song-card-header">
                <div class="song-number-badge">#${song.number}</div>
                <div class="song-title-section">
                    <h3 class="song-title-telugu">${song.titleTelugu}</h3>
                    <p class="song-title-english">${song.titleEnglish}</p>
                </div>
                ${featuredBadge}
            </div>
            
            <div class="song-card-body">
                <div class="song-author-section">
                    <strong>Author:</strong> 
                    <span class="author-name">${song.author}</span>
                    <button class="author-info-btn" data-author="${song.author}" title="View author information">
                        ℹ️
                    </button>
                </div>
                
                <div class="song-summary">
                    <h4>Summary</h4>
                    <p>${song.summary}</p>
                </div>
                
                <div class="song-meaning">
                    <h4>Meaning</h4>
                    <p>${song.meaning}</p>
                </div>
                
                <div class="song-lyrics-section">
                    <div class="lyrics-header">
                        <h4>Lyrics</h4>
                        <div class="lyrics-toggle">
                            <button class="lyrics-btn active" data-lang="telugu">తెలుగు</button>
                            <button class="lyrics-btn" data-lang="english">English</button>
                        </div>
                    </div>
                    <div class="lyrics-content">
                        <div class="lyrics-telugu" data-lang="telugu">
                            <pre class="lyrics-text">${song.lyricsTelugu}</pre>
                        </div>
                        <div class="lyrics-english" data-lang="english" style="display: none;">
                            <pre class="lyrics-text">${song.lyricsEnglish}</pre>
                        </div>
                    </div>
                </div>
                
                ${youtubeSection}
            </div>
            
        </div>
    `;
}

function attachExpandListeners() {
    // Lyrics toggle buttons
    document.querySelectorAll('.lyrics-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const songCard = this.closest('.song-card');
            const lang = this.dataset.lang;
            const lyricsContent = songCard.querySelector('.lyrics-content');
            
            // Toggle active state
            songCard.querySelectorAll('.lyrics-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide lyrics
            lyricsContent.querySelectorAll('[data-lang]').forEach(div => {
                div.style.display = div.dataset.lang === lang ? 'block' : 'none';
            });
        });
    });
    
    // Author info buttons
    document.querySelectorAll('.author-info-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const authorName = this.dataset.author;
            window.location.href = `authors.html?author=${encodeURIComponent(authorName)}`;
        });
    });
}

function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

function updateSongCount(count) {
    const songCount = document.getElementById('songCount');
    if (songCount) {
        songCount.textContent = `${count} Song${count !== 1 ? 's' : ''}`;
    }
}

function scrollToSong(songNumber) {
    const songElement = document.getElementById(`song-${songNumber}`);
    if (songElement) {
        // Apply filters to show this song
        const filterNumber = document.getElementById('filterNumber');
        if (filterNumber) {
            filterNumber.value = songNumber;
            performSongSearch();
        }
        
        // Scroll to the song
        setTimeout(() => {
            songElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function toggleLanguage() {
    const langToggle = document.getElementById('langToggle');
    if (!langToggle) return;
    
    const currentLang = langToggle.dataset.lang;
    const newLang = currentLang === 'en' ? 'te' : 'en';
    
    langToggle.dataset.lang = newLang;
    langToggle.textContent = newLang === 'en' ? 'తెలుగు' : 'English';
    
    // Toggle language display (can be extended for full site translation)
    document.body.setAttribute('data-lang', newLang);
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
    window.performSongSearch = performSongSearch;
    window.scrollToSong = scrollToSong;
}
