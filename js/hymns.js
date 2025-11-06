// Hymns Page JavaScript - Display and filter songs

document.addEventListener('DOMContentLoaded', function() {
    // Global variables
    let validSongsList = [];
    let currentSort = 'number';
    let currentSearchTerm = '';
    const searchInput = document.getElementById('searchInput');
    const authorFilter = document.getElementById('authorFilter');
    const letterFilter = document.getElementById('letterFilter');

    // Initialize everything
    init();

    function init() {
        try {
            // Check if songs data is loaded
            if (typeof songsList === 'undefined' || !Array.isArray(songsList)) {
                document.getElementById('songsContainer').innerHTML = 
                    '<div class="empty-state"><p>Please add songs data in js/songs-data.js</p></div>';
                console.error('Songs data is not properly loaded');
                return;
            }

            // Filter out invalid songs at the start
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

            // Remove loading message
            const loadingMessage = document.querySelector('.loading');
            if (loadingMessage) {
                loadingMessage.remove();
            }

            // Set up the page
            setupEventListeners();
            initializeFilters();
            updateDisplay();
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    function setupEventListeners() {
        try {
            // Search functionality
            if (searchInput) {
                searchInput.addEventListener('input', debounce(handleSearch, 300));
            }

            // Filter functionality
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
        } catch (error) {
            console.error('Error setting up event listeners:', error);
        }
    }

    function initializeFilters() {
        try {
            // Initialize author filter
            if (authorFilter) {
                // Clear existing options except the first one
                while (authorFilter.options.length > 1) {
                    authorFilter.remove(1);
                }

                // Get unique authors
                const authors = [...new Set(validSongsList
                    .map(song => song.author)
                    .filter(author => author && author.trim() !== '')
                )];

                // Add new options
                authors.sort().forEach(author => {
                    if (author) {
                        const option = document.createElement('option');
                        option.value = author;
                        option.textContent = author;
                        authorFilter.appendChild(option);
                    }
                });
            }

            // Initialize letter filter
            if (letterFilter) {
                // Clear existing options except the first one
                while (letterFilter.options.length > 1) {
                    letterFilter.remove(1);
                }

                // Get unique first letters
                const letters = [...new Set(validSongsList
                    .map(song => {
                        try {
                            return song.titleTelugu ? song.titleTelugu.charAt(0) : '';
                        } catch (error) {
                            console.error('Error getting first letter:', error);
                            return '';
                        }
                    })
                    .filter(char => char && char.trim() !== '')
                )];

                // Add new options
                letters.sort().forEach(letter => {
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

    function handleSearch() {
        try {
            const searchTerm = searchInput.value.toLowerCase().trim();
            currentSearchTerm = searchTerm;
            updateDisplay();
        } catch (error) {
            console.error('Error handling search:', error);
        }
    }

    function updateDisplay() {
        try {
            // Start with valid songs
            let filtered = [...validSongsList];

            // Apply search filter
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

            // Apply author filter
            const selectedAuthor = authorFilter?.value;
            if (selectedAuthor) {
                filtered = filtered.filter(song => song.author === selectedAuthor);
            }

            // Apply letter filter
            const selectedLetter = letterFilter?.value;
            if (selectedLetter) {
                filtered = filtered.filter(song => song.titleTelugu.charAt(0) === selectedLetter);
            }

            // Apply sort
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

            const youtubeEmbeds = song.youtubeLinks && Array.isArray(song.youtubeLinks) 
                ? song.youtubeLinks.map(link => {
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
                }).join('') 
                : '';

            const youtubeLinks = song.youtubeLinks && Array.isArray(song.youtubeLinks)
                ? song.youtubeLinks.map(link => {
                    return `<a href="${link}" target="_blank" class="youtube-link">Watch on YouTube ↗</a>`;
                }).join(' ')
                : '';

            return `
                <div class="song-card">
                    <div class="song-number-badge">Song #${song.number}</div>
                    <h3 class="song-title-telugu">${song.titleTelugu}</h3>
                    <p class="song-title-english">${song.titleEnglish}</p>
                    <p><strong>Author:</strong> ${song.author}</p>
                    ${youtubeEmbeds ? `
                        <div class="youtube-section">
                            ${youtubeEmbeds}
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