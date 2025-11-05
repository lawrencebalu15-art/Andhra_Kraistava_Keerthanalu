// Main JavaScript for Andhra Kraistava Keerthanallu
// Global search functionality and common utilities

document.addEventListener('DOMContentLoaded', function() {
    // Wait for songs data to load
    if (typeof window.songsData === 'undefined') {
        // If songs data not loaded yet, wait a bit
        setTimeout(() => {
            initializeGlobalSearch();
        }, 100);
    } else {
        initializeGlobalSearch();
    }
});

function initializeGlobalSearch() {
    const globalSearchInput = document.getElementById('globalSearch');
    const searchBtn = document.getElementById('searchBtn');

    if (globalSearchInput) {
        // Handle search button click
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                performGlobalSearch();
            });
        }

        // Handle Enter key press
        globalSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performGlobalSearch();
            }
        });

        // Real-time search as user types (with debounce)
        let searchTimeout;
        globalSearchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function() {
                // Optional: Show suggestions or perform search
            }, 300);
        });
    }
}

function performGlobalSearch() {
    const globalSearchInput = document.getElementById('globalSearch');
    if (!globalSearchInput) return;
    
    const searchTerm = globalSearchInput.value.trim();
    
    if (!searchTerm) {
        return;
    }

    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // If on hymns page, perform search directly
    if (currentPage === 'hymns.html' || currentPage.includes('hymns')) {
        const songSearch = document.getElementById('songSearch');
        if (songSearch && typeof window.performSongSearch === 'function') {
            songSearch.value = searchTerm;
            window.performSongSearch();
        } else {
            // Redirect with search parameter
            window.location.href = `hymns.html?search=${encodeURIComponent(searchTerm)}`;
        }
        return;
    }
    
    // If on authors page, try to filter authors
    if (currentPage === 'authors.html' || currentPage.includes('authors')) {
        const authorSearch = document.getElementById('authorSearch');
        if (authorSearch && typeof window.filterAuthors === 'function') {
            authorSearch.value = searchTerm;
            window.filterAuthors();
        } else {
            // Redirect with search parameter
            window.location.href = `authors.html?search=${encodeURIComponent(searchTerm)}`;
        }
        return;
    }
    
    // Otherwise, redirect to hymns page with search parameter
    window.location.href = `hymns.html?search=${encodeURIComponent(searchTerm)}`;
}

// Utility function to extract YouTube video ID from URL
function getYouTubeVideoId(url) {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Utility function to create YouTube embed URL
function getYouTubeEmbedUrl(url) {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

// Utility function for smooth scrolling
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Language toggle functionality (if available)
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    if (langToggle && !langToggle.hasAttribute('data-initialized')) {
        langToggle.setAttribute('data-initialized', 'true');
        langToggle.addEventListener('click', function() {
            const currentLang = this.dataset.lang || 'en';
            const newLang = currentLang === 'en' ? 'te' : 'en';
            
            this.dataset.lang = newLang;
            this.textContent = newLang === 'en' ? 'తెలుగు' : 'English';
            
            // Toggle language display (can be extended for full site translation)
            document.body.setAttribute('data-lang', newLang);
            
            // Update page language
            document.documentElement.lang = newLang === 'te' ? 'te' : 'en';
        });
    }
});

// Export utilities for use in other scripts
if (typeof window !== 'undefined') {
    window.getYouTubeVideoId = getYouTubeVideoId;
    window.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
    window.smoothScrollTo = smoothScrollTo;
    window.performGlobalSearch = performGlobalSearch;
}
