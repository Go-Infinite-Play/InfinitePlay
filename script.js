// Create matrix-like rain effect in the background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Style canvas
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '0';
canvas.style.opacity = '0.1';

// Add hover sound effect to menu items
const menuItems = document.querySelectorAll('.menu-item');
const hoverSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');

// Create retro hover sound
hoverSound.volume = 0.2;

menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

// Add glitch effect on click
document.querySelector('.glitch').addEventListener('click', function() {
    this.style.animation = 'none';
    void this.offsetWidth; // Trigger reflow
    this.style.animation = 'glitch 725ms infinite';
});

// Matrix rain effect setup
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Cursor trail effect setup
const cursor = {
    x: 0,
    y: 0,
    trail: []
};

document.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    cursor.trail.push({ x: cursor.x, y: cursor.y });
    
    if (cursor.trail.length > 20) {
        cursor.trail.shift();
    }
});

// Combined animation function
function animate() {
    // Draw matrix rain
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }

    // Draw cursor trail
    if (cursor.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(cursor.trail[0].x, cursor.trail[0].y);
        for (let i = 1; i < cursor.trail.length; i++) {
            const point = cursor.trail[i];
            ctx.lineTo(point.x, point.y);
        }
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Add menu item click effects
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        item.appendChild(ripple);
        
        const rect = item.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size/2 + 'px';
        ripple.style.top = e.clientY - rect.top - size/2 + 'px';
        
        setTimeout(() => ripple.remove(), 1000);
    });
}); 