// Visitor Counter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create the counter element
    const counterDiv = document.createElement('div');
    counterDiv.className = 'visitor-counter';
    counterDiv.innerHTML = 'Visitors: <span id="visitorCount">...</span>';
    document.body.appendChild(counterDiv);

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        .visitor-counter {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        }
        
        .visitor-counter span {
            font-weight: bold;
            color: #ffd700;
        }
    `;
    document.head.appendChild(styles);

    // Function to update the counter
    function updateCounter() {
        // Using a free counter API service
        fetch('https://api.countapi.xyz/hit/andhra-kraistava-keerthanalu/visits')
            .then(response => response.json())
            .then(data => {
                document.getElementById('visitorCount').textContent = data.value.toLocaleString();
            })
            .catch(error => {
                console.error('Error updating visitor counter:', error);
                document.getElementById('visitorCount').textContent = 'Error';
            });
    }

    // Update the counter when the page loads
    updateCounter();
});