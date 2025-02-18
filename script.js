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

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Add glitch effect to main heading
    const glitchText = document.querySelector('.glitch');
    if (glitchText) {
        setInterval(() => {
            glitchText.style.textShadow = Math.random() > 0.95 ? 
                '0.05em 0 0 rgba(255,0,0,.75), -0.025em -.05em 0 rgba(0,255,0,.75), 0.025em .05em 0 rgba(0,0,255,.75)' :
                '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00';
        }, 50);
    }

    // Initialize game containers
    initializeGames();

    // Career page role expansion
    const expandButtons = document.querySelectorAll('.expand-role');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const roleCard = button.closest('.role-card');
            const details = roleCard.querySelector('.role-details');
            const isHidden = details.classList.contains('hidden');
            
            // Update button text
            button.textContent = isHidden ? 'CLOSE QUEST' : 'VIEW QUEST';
            
            // Toggle details visibility with animation
            if (isHidden) {
                details.classList.remove('hidden');
                details.style.opacity = '0';
                requestAnimationFrame(() => {
                    details.style.transition = 'opacity 0.3s ease';
                    details.style.opacity = '1';
                });
            } else {
                details.style.opacity = '0';
                setTimeout(() => {
                    details.classList.add('hidden');
                }, 300);
            }
            
            // Add retro sound effect
            const expandSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            expandSound.volume = 0.2;
            expandSound.play();
        });
    });
    
    if (document.querySelector('.games-container')) {
        initializeGames();
    }
});

// Game initialization and preview functions
function initializeGames() {
    const gameContainers = {
        icopter: document.getElementById('icopter-container'),
        snake: document.getElementById('snake-container')
    };

    Object.entries(gameContainers).forEach(([game, container]) => {
        if (container) {
            addGamePreview(container, game);
        }
    });
}

function addGamePreview(container, gameType) {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    if (gameType === 'icopter') {
        // iCopter preview animation
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let direction = 1;
        
        function animateIcopter() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw helicopter
            ctx.fillStyle = '#00fffc';
            ctx.fillRect(x, y, 30, 15);
            ctx.fillRect(x + 30, y + 5, 10, 5);
            
            // Animate position
            x += direction;
            if (x > canvas.width - 40 || x < 0) direction *= -1;
            
            requestAnimationFrame(animateIcopter);
        }
        
        animateIcopter();
    } else if (gameType === 'snake') {
        // Snake preview animation
        const snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
        const gridSize = 20;
        let direction = 'right';
        
        function animateSnake() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw snake
            ctx.fillStyle = '#00fffc';
            snake.forEach(segment => {
                ctx.fillRect(
                    segment.x * gridSize,
                    segment.y * gridSize,
                    gridSize - 2,
                    gridSize - 2
                );
            });
            
            // Move snake
            const head = {...snake[0]};
            switch(direction) {
                case 'right': head.x++; break;
                case 'left': head.x--; break;
                case 'up': head.y--; break;
                case 'down': head.y++; break;
            }
            
            // Wrap around
            if (head.x >= canvas.width / gridSize) head.x = 0;
            if (head.x < 0) head.x = Math.floor(canvas.width / gridSize) - 1;
            if (head.y >= canvas.height / gridSize) head.y = 0;
            if (head.y < 0) head.y = Math.floor(canvas.height / gridSize) - 1;
            
            snake.unshift(head);
            snake.pop();
            
            // Change direction randomly
            if (Math.random() < 0.02) {
                const directions = ['up', 'right', 'down', 'left'];
                direction = directions[Math.floor(Math.random() * directions.length)];
            }
            
            requestAnimationFrame(animateSnake);
        }
        
        animateSnake();
    }
}

// Game launch function
function launchGame(gameType) {
    const container = document.getElementById(`${gameType}-container`);
    if (!container) return;

    // Clear preview
    container.innerHTML = '';
    
    // We'll implement the full games in separate files
    alert(`${gameType.charAt(0).toUpperCase() + gameType.slice(1)} game coming soon!`);
    
    // Restart preview
    addGamePreview(container, gameType);
} 