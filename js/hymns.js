document.addEventListener('DOMContentLoaded', function() {
    let checkInterval = setInterval(function() {
        if (typeof songsList !== 'undefined') {
            clearInterval(checkInterval);
            initializePage();
        }
    }, 100);
});

function normalizeAuthorName(name) {
    if (!name) return '';
    return name.trim().replace(/\s+/g, ' ').replace(/\.+$/, '').toLowerCase();
}

function initializePage() {
    let validSongsList = [];
    let currentSort = 'number';
    let currentSearchTerm = '';
    const searchInput = document.getElementById('searchInput');
    const authorFilter = document.getElementById('authorFilter');
    const letterFilter = document.getElementById('letterFilter');

    function updateDisplay() {
        try {
            let filtered = [...validSongsList];

            // Search filter
            if (currentSearchTerm) {
                filtered = filtered.filter(song => {
                    try {
                        const matchesTitle = 
                            song.titleTelugu.toLowerCase().includes(currentSearchTerm) ||
                            song.titleEnglish.toLowerCase().includes(currentSearchTerm);
                        const matchesAuthor = song.author.toLowerCase().includes(currentSearchTerm);
                        const matchesNumber = song.number.toString().includes(currentSearchTerm);
                        return matchesTitle || matchesAuthor || matchesNumber;
                    } catch (error) {
                        console.error('Error filtering song:', error);
                        return false;
                    }
                });
            }

            // Author filter (normalized comparison!)
            const selectedAuthor = authorFilter?.value;
            if (selectedAuthor) {
                const selectedNorm = normalizeAuthorName(selectedAuthor);
                filtered = filtered.filter(song =>
                    normalizeAuthorName(song.author) === selectedNorm
                );
            }

            // Letter filter
            const selectedLetter = letterFilter?.value;
            if (selectedLetter) {
                filtered = filtered.filter(song => song.titleTelugu.charAt(0) === selectedLetter);
            }

            // Sort
            if (currentSort === 'number') {
                filtered.sort((a, b) => a.number - b.number);
            } else if (currentSort === 'title') {
                filtered.sort((a, b) => a.titleTelugu.localeCompare(b.titleTelugu));
            }

            displaySongs(filtered);
        } catch (error) {
            console.error('Error updating display:', error);
        }
    }

    function initializeFilters() {
        try {
            // ---- AUTHOR FILTER ----
            if (authorFilter) {
                // Unique & normalized authors from all songs
                const authorNormalizedMap = new Map();
                validSongsList.forEach(song => {
                    if (song.author && song.author.trim()) {
                        const normalized = normalizeAuthorName(song.author);
                        if (!authorNormalizedMap.has(normalized)) {
                            authorNormalizedMap.set(normalized, song.author.trim());
                        }
                    }
                });
                const uniqueAuthors = Array.from(authorNormalizedMap.values()).sort((a,b) => a.localeCompare(b, 'en'));

                // Reset filter
                authorFilter.innerHTML = '<option value="">All Authors</option>';
                uniqueAuthors.forEach(author => {
                    const option = document.createElement('option');
                    option.value = author;
                    option.textContent = author;
                    authorFilter.appendChild(option);
                });
            }

            // ---- LETTER FILTER ----
            if (letterFilter) {
                while (letterFilter.options.length > 1) letterFilter.remove(1);
                const letters = [...new Set(validSongsList
                    .map(song => {
                        try {
                            return song.titleTelugu ? song.titleTelugu.charAt(0) : '';
                        } catch (error) {
                            console.error('Error getting first letter:', error);
                            return '';
                        }
                    }).filter(char => char && char.trim() !== '')
                )];
                letters.sort();
                letters.forEach(letter => {
                    if (letter) {
                        const option = document.createElement('option');
                        option.value = letter;
                        option.textContent = letter;
                        letterFilter.appendChild(option);
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing filters:', error);
        }
    }

    function displaySongs(songs) {
        try {
            const container = document.getElementById('songsContainer');
            if (!container) return;
            if (!Array.isArray(songs) || songs.length === 0) {
                container.innerHTML = '<div class="empty-state"><p>No songs found matching your criteria.</p></div>';
                return;
            }
            container.innerHTML = songs.map(song => createSongCard(song)).join('');
        } catch (error) {
            console.error('Error displaying songs:', error);
        }
    }

    function createSongCard(song) {
        try {
            if (!song) return '';
            // Only provide external links, no embedded players (per your current expectation)
            const youtubeLinks = (song.youtubeLinks && Array.isArray(song.youtubeLinks)
                ? song.youtubeLinks.map(link => {
                    const videoId = extractYouTubeId(link);
                    if (videoId) {
                        return `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="youtube-link" rel="noopener noreferrer">
                                  <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Video thumbnail" class="youtube-thumbnail" />
                                  <div class="play-button"></div>
                                  Watch on YouTube ↗
                                </a>`;
                    }
                    return `<a href="${link}" target="_blank" class="youtube-link" rel="noopener noreferrer">Watch on YouTube ↗</a>`;
                }).join(' ')
                : '');

            return `
                <div class="song-card">
                    <div class="song-number-badge">Song #${song.number}</div>
                    <h3 class="song-title-telugu">${song.titleTelugu}</h3>
                    <p class="song-title-english">${song.titleEnglish}</p>
                    <p><strong>Author:</strong> ${song.author}</p>
                    ${youtubeLinks ? `
                        <div class="youtube-section">
                            ${youtubeLinks}
                        </div>
                    ` : ''}
                </div>
            `;
        } catch (error) {
            console.error('Error creating song card:', error, song);
            return '';
        }
    }

    function extractYouTubeId(url) {
        try {
            if (!url) return null;
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[7].length === 11) ? match[7] : null;
        } catch (error) {
            console.error('Error extracting YouTube ID:', error);
            return null;
        }
    }

    function handleSearch() {
        try {
            const searchTerm = searchInput.value.toLowerCase().trim();
            currentSearchTerm = searchTerm;
            updateDisplay();
        } catch (error) {
            console.error('Error handling search:', error);
        }
    }

    function setupEventListeners() {
        try {
            if (searchInput) searchInput.addEventListener('input', debounce(handleSearch, 300));
            if (authorFilter) authorFilter.addEventListener('change', updateDisplay);
            if (letterFilter) letterFilter.addEventListener('change', updateDisplay);
            document.querySelectorAll('.sort-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentSort = this.dataset.sort;
                    updateDisplay();
                });
            });

            // Pre-fill search from URL parameter
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            if (searchParam && searchInput) {
                searchInput.value = searchParam;
                currentSearchTerm = searchParam;
                handleSearch();
            }
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
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

    // Start initialization
    try {
        if (typeof songsList === 'undefined' || !Array.isArray(songsList)) {
            document.getElementById('songsContainer').innerHTML = 
                '<div class="empty-state"><p>Please add songs data in js/songs-data.js</p></div>';
            console.error('Songs data is not properly loaded');
            return;
        }
        validSongsList = songsList.filter(song => 
            song &&
            typeof song === 'object' &&
            song.titleTelugu && typeof song.titleTelugu === 'string' && song.titleTelugu.trim() !== '' &&
            song.titleEnglish && typeof song.titleEnglish === 'string' && song.titleEnglish.trim() !== '' &&
            song.author && typeof song.author === 'string' && song.author.trim() !== '' &&
            typeof song.number === 'number'
        );
        if (validSongsList.length === 0) {
            document.getElementById('songsContainer').innerHTML = 
                '<div class="empty-state"><p>No valid songs found in the data</p></div>';
            console.error('No valid songs found in songsList');
            return;
        }
        const loadingMessage = document.querySelector('.loading');
        if (loadingMessage) loadingMessage.remove();

        setupEventListeners();
        initializeFilters();
        updateDisplay();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}
