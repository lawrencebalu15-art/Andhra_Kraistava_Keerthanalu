// Splash Screen JavaScript
// Handles the elegant landing page transition

document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    const enterBtn = document.getElementById('enterSiteBtn');
    
    // Check if user has already visited (using sessionStorage)
    const hasVisited = sessionStorage.getItem('hasVisited');
    
    if (hasVisited) {
        // User has visited, skip splash screen
        if (splashScreen) splashScreen.style.display = 'none';
        if (mainContent) mainContent.classList.remove('main-content-hidden');
    } else {
        // First visit - show splash screen
        if (splashScreen) {
            splashScreen.classList.add('splash-visible');
            
            // Automatically enter site after 3 seconds
            setTimeout(function() {
                enterSite();
            }, 3000);
        }
        if (mainContent) {
            mainContent.classList.add('main-content-hidden');
        }
    }
    
    // Handle enter button click
    if (enterBtn) {
        enterBtn.addEventListener('click', function() {
            enterSite();
        });
    }
    
    // Handle Enter key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && splashScreen && !splashScreen.classList.contains('splash-hidden')) {
            enterSite();
        }
    });
    
    // Function to transition to main content
    function enterSite() {
        if (!splashScreen || !mainContent) return;
        
        // Add fade out class
        splashScreen.classList.add('splash-fade-out');
        
        // After animation completes, hide splash and show main content
        setTimeout(function() {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('main-content-hidden');
            mainContent.classList.add('main-content-visible');
            
            // Mark as visited
            sessionStorage.setItem('hasVisited', 'true');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800); // Match animation duration
    }
});
