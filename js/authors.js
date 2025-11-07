document.addEventListener('DOMContentLoaded', function() {
    if (typeof authorsList === 'undefined' || typeof songsList === 'undefined') {
        document.getElementById('authorsContainer').innerHTML = 
            '<div class="empty-state"><p>Please add authors data in js/songs-data.js</p></div>';
        return;
    }

    let filteredAuthors = [...authorsList];
    let currentSort = 'name';

    // Populate Author Filter with unique names
    const authorSet = new Set();
    authorsList.forEach(author => {
        if (author.name && author.name.trim()) {
            authorSet.add(author.name.trim());
        }
    });
    const authorFilter = document.getElementById('authorFilter');
    if (authorFilter) {
        authorFilter.innerHTML = '<option value="">All Authors</option>';
        authorSet.forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorFilter.appendChild(option);
        });

        authorFilter.addEventListener('change', function() {
            if (this.value) {
                filteredAuthors = authorsList.filter(author => author.name.trim() === this.value);
            } else {
                filteredAuthors = [...authorsList];
            }
            applySort();
        });
    }

    // Display authors
    displayAuthors(filteredAuthors);

    // Search functionality
    const authorSearch = document.getElementById('authorSearch');
    if (authorSearch) {
        authorSearch.addEventListener('input', debounce(handleSearch, 300));
    }

    // Sort functionality
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.dataset.sort;
            applySort();
        });
    });

    function handleSearch() {
        const searchTerm = authorSearch.value.toLowerCase().trim();
        filteredAuthors = authorsList.filter(author => {
            const matchesName = author.name.toLowerCase().includes(searchTerm) ||
                               author.nameEnglish.toLowerCase().includes(searchTerm);
            const matchesBio = author.bio.toLowerCase().includes(searchTerm) ||
                             (author.bioTelugu && author.bioTelugu.toLowerCase().includes(searchTerm));
            return matchesName || matchesBio;
        });
        applySort();
        displayAuthors(filteredAuthors);
    }

    function applySort() {
        if (currentSort === 'name') {
            filteredAuthors.sort((a, b) => a.name.localeCompare(b.name));
        }
        displayAuthors(filteredAuthors);
    }

    function displayAuthors(authors) {
        const container = document.getElementById('authorsContainer');
        if (!container) return;
        if (authors.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No authors found matching your criteria.</p></div>';
            return;
        }
        container.innerHTML = authors.map(author => createAuthorCard(author)).join('');
    }

    function createAuthorCard(author) {
        // Get songs by this author
        const authorSongs = songsList.filter(song => 
            author.songs && author.songs.includes(song.number)
        );
        const songsListHtml = authorSongs.length > 0 ? `
            <div class="featured-songs-section">
                <h4>Songs by ${author.name}</h4>
                ${authorSongs.map(song => `
                    <div class="featured-song-item">
                        <a href="hymns.html?search=${encodeURIComponent(song.titleTelugu)}">
                            ${song.number}. ${song.titleTelugu} (${song.titleEnglish})
                        </a>
                    </div>
                `).join('')}
            </div>
        ` : '';

        const featuredLinks = author.featuredYouTubeLinks && author.featuredYouTubeLinks.length > 0 ? `
            <div class="youtube-section">
                <h4>Featured Performances</h4>
                ${author.featuredYouTubeLinks.map(link => {
                    const videoId = extractYouTubeId(link);
                    if (videoId) {
                        // Only link, no embed:
                        return `<a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="youtube-link" rel="noopener noreferrer">
                                  <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="Video thumbnail" class="youtube-thumbnail" />
                                  <div class="play-button"></div>
                                  Watch on YouTube ↗
                                </a>`;
                    }
                    return `<a href="${link}" target="_blank" class="youtube-link" rel="noopener noreferrer">Watch on YouTube ↗</a>`;
                }).join('')}
            </div>
        ` : '';

        return `
            <div class="author-card">
                <h3 class="author-name">${author.name}</h3>
                ${author.nameEnglish ? `<p class="author-song-count">${author.nameEnglish}</p>` : ''}
                <div class="author-song-count">${authorSongs.length} song${authorSongs.length !== 1 ? 's' : ''}</div>
                ${author.bio ? `
                    <div class="author-bio">
                        <p><strong>Biography:</strong></p>
                        <p>${author.bio}</p>
                    </div>
                ` : ''}
                ${author.bioTelugu ? `
                    <div class="author-bio">
                        <p><strong>చరిత్ర:</strong></p>
                        <p>${author.bioTelugu}</p>
                    </div>
                ` : ''}
                ${songsListHtml}
                ${featuredLinks}
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
