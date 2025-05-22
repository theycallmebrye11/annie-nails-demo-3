document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.sparkle-container');
    const headerHeight = document.querySelector('header').offsetHeight;
    const headerWidth = document.querySelector('header').offsetWidth;

    function createSparkle() {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.className = 'floating-sparkle';
        
        // Random starting position at the bottom
        const startX = Math.random() * headerWidth;
        sparkle.style.left = `${startX}px`;
        sparkle.style.top = `${headerHeight}px`;
        
        // Random ending position above
        const endX = (Math.random() - 0.5) * 200; // Random horizontal drift
        const endY = -100 - (Math.random() * 50); // Move upward
        
        sparkle.style.setProperty('--end-x', `${endX}px`);
        sparkle.style.setProperty('--end-y', `${endY}px`);
        
        container.appendChild(sparkle);
        
        // Remove the sparkle after animation completes
        setTimeout(() => {
            sparkle.remove();
        }, 3000);
    }

    // Create new sparkles periodically
    setInterval(createSparkle, 300);
});