// Main JavaScript for Andhra Kraistava Keerthanallu
// Global search and utility functions
import { inject } from "@vercel/analytics"
// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    setActiveNavLink();
});

// Global search functionality
function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput) {
        // Search on input with debounce
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
        
        // Search on button click
        if (searchBtn) {
            searchBtn.addEventListener('click', function() {
                performSearch(searchInput.value);
            });
        }
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
    }
}

// Perform search across hymns and authors
function performSearch(query) {
    if (!query || query.trim() === '') {
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    
    // Redirect to hymns page with search parameter
    window.location.href = `hymns.html?search=${encodeURIComponent(searchTerm)}`;
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath.includes(linkPath.split('/').pop()) || 
            (currentPath === '/' && linkPath.includes('index.html'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Utility function to extract YouTube video ID from URL
function extractYouTubeId(url) {
    if (!url) return null;
    
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
}

// Utility function to format YouTube embed URL
function getYouTubeEmbedUrl(url) {
    const videoId = extractYouTubeId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

// Debounce function for performance
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

// Format text for display (handles Telugu and English)
function formatText(text) {
    if (!text) return '';
    return text.trim();
}

// Check if device is mobile
function isMobile() {
    return window.innerWidth <= 768;
}

