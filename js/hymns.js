// Hymns Page JavaScript - Display and filter songs

document.addEventListener('DOMContentLoaded', function() {
    // Check if songs data is loaded
    if (typeof songsList === 'undefined') {
        document.getElementById('songsContainer').innerHTML = 
            '<div class="empty-state"><p>Please add songs data in js/songs-data.js</p></div>';
        return;
    }

    let filteredSongs = [...songsList];
    let currentSort = 'number';
    let currentSearchTerm = '';

    // Initialize filters
    initializeFilters();
    
    // Display songs
    updateDisplay();

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    // Filter functionality
    const authorFilter = document.getElementById('authorFilter');
    const letterFilter = document.getElementById('letterFilter');
    
    if (authorFilter) {
        authorFilter.addEventListener('change', updateDisplay);
    }
    if (letterFilter) {
        letterFilter.addEventListener('change', updateDisplay);
    }

    // Sort functionality
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            updateDisplay();
        });
    });

    // Check for search parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam && searchInput) {
        searchInput.value = searchParam;
        currentSearchTerm = searchParam;
        handleSearch();
    }

    function initializeFilters() {
        // Get unique authors
        const authors = [...new Set(songsList.map(song => song.author).filter(a => a))];
        const authorSelect = document.getElementById('authorFilter');
        if (authorSelect) {
            authors.sort().forEach(author => {
                const option = document.createElement('option');
                option.value = author;
                option.textContent = author;
                authorSelect.appendChild(option);
            });
        }

        // Get unique first letters
        const letters = [...new Set(songsList.map(song => {
            const firstChar = song.titleTelugu.charAt(0);
            return firstChar;
        }).filter(c => c))];
        const letterSelect = document.getElementById('letterFilter');
        if (letterSelect) {
            letters.sort().forEach(letter => {
                const option = document.createElement('option');
                option.value = letter;
                option.textContent = letter;
                letterSelect.appendChild(option);
            });
        }
    }

    function handleSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        currentSearchTerm = searchTerm;
        updateDisplay();
    }

    function updateDisplay() {
        // Start with all songs
        let filtered = [...songsList];

        // Apply search filter
        if (currentSearchTerm) {
            filtered = filtered.filter(song => {
                const matchesTitle = song.titleTelugu.toLowerCase().includes(currentSearchTerm) ||
                                   song.titleEnglish.toLowerCase().includes(currentSearchTerm);
                const matchesAuthor = (song.author || '').toLowerCase().includes(currentSearchTerm);
                const matchesNumber = song.number.toString().includes(currentSearchTerm);
                
                return matchesTitle || matchesAuthor || matchesNumber;
            });
        }

        // Apply author filter
        const selectedAuthor = document.getElementById('authorFilter')?.value;
        if (selectedAuthor) {
            filtered = filtered.filter(song => song.author === selectedAuthor);
        }

        // Apply letter filter
        const selectedLetter = document.getElementById('letterFilter')?.value;
        if (selectedLetter) {
            filtered = filtered.filter(song => song.titleTelugu.charAt(0) === selectedLetter);
        }

        // Apply sort
        if (currentSort === 'number') {
            filtered.sort((a, b) => a.number - b.number);
        } else if (currentSort === 'title') {
            filtered.sort((a, b) => a.titleTelugu.localeCompare(b.titleTelugu));
        }

        // Display the final result
        displaySongs(filtered);
    }

    function displaySongs(songs) {
        const container = document.getElementById('songsContainer');
        if (!container) return;

        if (songs.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No songs found matching your criteria.</p></div>';
            return;
        }

        container.innerHTML = songs.map(song => createSongCard(song)).join('');
    }

    function createSongCard(song) {
        const youtubeEmbeds = song.youtubeLinks ? song.youtubeLinks.map(link => {
            const videoId = extractYouTubeId(link);
            if (videoId) {
                return `
                    <div class="youtube-embed">
                        <iframe src="https://www.youtube.com/embed/${videoId}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen></iframe>
                    </div>
                `;
            }
            return '';
        }).join('') : '';

        const youtubeLinks = song.youtubeLinks ? song.youtubeLinks.map(link => {
            return `<a href="${link}" target="_blank" class="youtube-link">Watch on YouTube ↗</a>`;
        }).join(' ') : '';

        return `
            <div class="song-card">
                <div class="song-number-badge">Song #${song.number}</div>
                <h3 class="song-title-telugu">${song.titleTelugu}</h3>
                <p class="song-title-english">${song.titleEnglish}</p>
                ${song.author ? `<p><strong>Author:</strong> ${song.author}</p>` : ''}
                
                ${youtubeEmbeds ? `
                    <div class="youtube-section">
                        ${youtubeEmbeds}
                        ${youtubeLinks}
                    </div>
                ` : ''}
            </div>
        `;
    }


    // Utility function (from main.js)
    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length === 11) ? match[7] : null;
    }

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
});

