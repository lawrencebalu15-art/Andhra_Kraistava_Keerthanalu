// Custom Cursor Effects and Interactive Enhancements
// Musical-themed cursor and hover effects

document.addEventListener('DOMContentLoaded', function() {
    // Create custom cursor element (for enhanced visual feedback)
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    customCursor.innerHTML = '♪';
    customCursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        font-size: 20px;
        color: var(--primary-color);
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.1s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(customCursor);

    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        customCursor.style.left = cursorX + 'px';
        customCursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Show cursor on interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .song-card, .author-card, .nav-menu a, input, select, .youtube-link, .external-link'
    );

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.opacity = '0.8';
            customCursor.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            customCursor.style.opacity = '0';
            customCursor.style.transform = 'scale(1)';
        });
    });

    // Special cursor for YouTube/video elements
    const videoElements = document.querySelectorAll('.youtube-link, .external-link, .youtube-embed, iframe');
    videoElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.innerHTML = '🎤';
            customCursor.style.fontSize = '18px';
        });
        
        el.addEventListener('mouseleave', () => {
            customCursor.innerHTML = '♪';
            customCursor.style.fontSize = '20px';
        });
    });

    // Subtle glow effect on hover for cards
    const cards = document.querySelectorAll('.song-card, .author-card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 4px 20px rgba(139, 115, 85, 0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // Add elegant fade-in animation to titles on page load
    const titles = document.querySelectorAll('.logo h1, .hero-title, .page-header h1');
    titles.forEach(title => {
        title.style.animation = 'elegantFadeIn 1.5s ease-out';
    });

    // Touch feedback for mobile devices
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.song-card, .author-card, button, a');
        
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            });
            
            el.addEventListener('touchend', function() {
                this.style.transform = '';
                setTimeout(() => {
                    this.style.transition = '';
                }, 100);
            });
        });
    }

    // Add musical note animation on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Create floating note on scroll
            createFloatingNote();
        }, 300);
    });

    function createFloatingNote() {
        const note = document.createElement('div');
        note.className = 'floating-note';
        const notes = ['♪', '♫', '♬', '♩'];
        note.innerHTML = notes[Math.floor(Math.random() * notes.length)];
        note.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: ${window.innerHeight}px;
            font-size: 1.2rem;
            color: rgba(139, 115, 85, 0.12);
            pointer-events: none;
            z-index: 1;
            animation: floatNote 12s ease-out forwards;
            font-weight: 300;
        `;
        document.body.appendChild(note);
        
        setTimeout(() => {
            note.remove();
        }, 12000);
    }
});

// Add note sway animation to decorative elements
document.addEventListener('DOMContentLoaded', function() {
    const decorativeNotes = document.querySelectorAll('.section-title::before, .song-title-telugu::before');
    
    // Enhance hover effects with musical theme
    const songTitles = document.querySelectorAll('.song-title-telugu, .author-name');
    songTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const note = this.querySelector('::before') || this.previousElementSibling;
            if (note) {
                note.style.animation = 'noteSway 0.5s ease-in-out infinite';
            }
        });
    });
});

