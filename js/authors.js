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
    
    // Initialize filter panel toggle
    const filterToggleBtn = document.getElementById('filterToggleBtn');
    const filterContent = document.querySelector('.filter-content');
    
    if (filterToggleBtn && filterContent) {
        // Set initial state
        filterContent.classList.remove('show');
        filterToggleBtn.classList.remove('active');
        
        filterToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            filterContent.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
    
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
    // Search functionality
    const authorSearch = document.getElementById('authorSearch');
    if (authorSearch) {
        authorSearch.addEventListener('input', debounce(filterAuthors, 300));
    }

    // Author filter dropdown
    const filterAuthor = document.getElementById('filterAuthor');
    if (filterAuthor) {
        // Populate author dropdown
        populateAuthorDropdown();
        // Add event listener
        filterAuthor.addEventListener('change', filterAuthors);
    }
}

function populateAuthorDropdown() {
    const filterAuthor = document.getElementById('filterAuthor');
    if (!filterAuthor) return;
    
    // Get all authors and sort them alphabetically
    const authors = window.authorsData.map(author => author.name).sort((a, b) => 
        a.localeCompare(b)
    );
    
    // Clear existing options except "All Authors"
    filterAuthor.innerHTML = '<option value="all">All Authors</option>';
    
    // Add each author as an option
    authors.forEach(author => {
        const option = document.createElement('option');
        option.value = author;
        option.textContent = author;
        filterAuthor.appendChild(option);
    });
}

function initializeAuthors() {
    // Initialize filters
    populateAuthorDropdown();
    
    // Display all authors
    displayAuthors(window.authorsData);
}

function populateAuthorDropdown() {
    const filterAuthor = document.getElementById('filterAuthor');
    if (!filterAuthor) return;
    
    // Get unique authors from data
    const authors = [...new Set(window.authorsData.map(author => author.name))].sort();
    
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

function populateAuthorFilter() {
    const filterInitial = document.getElementById('filterInitial');
    if (!filterInitial) return;
    
    // Get unique initial letters from author names
    const initials = [...new Set(window.authorsData.map(author => 
        author.name.charAt(0).toUpperCase()
    ))].sort();
    
    // Clear existing options except "All Letters"
    filterInitial.innerHTML = '<option value="all">All Letters</option>';
    
    // Add initial options
    initials.forEach(initial => {
        const option = document.createElement('option');
        option.value = initial;
        option.textContent = initial;
        filterInitial.appendChild(option);
    });
}

function filterAuthors() {
    const filterInitial = document.getElementById('filterInitial');
    const authorSearch = document.getElementById('authorSearch');
    const sortAuthors = document.getElementById('sortAuthors');
    const filterAuthor = document.getElementById('filterAuthor');
    
    const selectedInitial = filterInitial ? filterInitial.value : 'all';
    const searchTerm = authorSearch ? authorSearch.value.trim().toLowerCase() : '';
    const sortBy = sortAuthors ? sortAuthors.value : 'name';
    const selectedAuthor = filterAuthor ? filterAuthor.value : 'all';
    
    let filteredAuthors = [...window.authorsData];
    
    // Filter by selected author
    if (selectedAuthor !== 'all') {
        filteredAuthors = filteredAuthors.filter(author => author.name === selectedAuthor);
    }
    
    // Filter by initial letter
    if (selectedInitial !== 'all') {
        filteredAuthors = filteredAuthors.filter(author => author.name.charAt(0).toUpperCase() === selectedInitial);
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
    
    // Sort authors
    filteredAuthors.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'songs') {
            return b.songs.length - a.songs.length;
        }
        return 0;
    });
    
    // Display authors
    displayAuthors(filteredAuthors);
}

function updateActiveFilters(initial, search, sort) {
    const activeFiltersContainer = document.getElementById('activeFilters');
    if (!activeFiltersContainer) return;
    
    let activeFiltersHTML = '';
    
    // Add initial filter tag
    if (initial !== 'all') {
        activeFiltersHTML += `
            <div class="filter-tag">
                Initial: ${initial}
                <button type="button" onclick="clearInitialFilter()">×</button>
            </div>
        `;
    }
    
    // Add search filter tag
    if (search) {
        activeFiltersHTML += `
            <div class="filter-tag">
                Search: ${search}
                <button type="button" onclick="clearSearchFilter()">×</button>
            </div>
        `;
    }
    
    // Add sort filter tag
    if (sort === 'songs') {
        activeFiltersHTML += `
            <div class="filter-tag">
                Sort: By Number of Songs
                <button type="button" onclick="clearSortFilter()">×</button>
            </div>
        `;
    }
    
    activeFiltersContainer.innerHTML = activeFiltersHTML;
}

function clearInitialFilter() {
    const filterInitial = document.getElementById('filterInitial');
    if (filterInitial) {
        filterInitial.value = 'all';
        filterAuthors();
    }
}

function clearSearchFilter() {
    const authorSearch = document.getElementById('authorSearch');
    if (authorSearch) {
        authorSearch.value = '';
        filterAuthors();
    }
}

function clearSortFilter() {
    const sortAuthors = document.getElementById('sortAuthors');
    if (sortAuthors) {
        sortAuthors.value = 'name';
        filterAuthors();
    }
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
            <!-- Summary removed intentionally (no summaries available) -->
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
