// Physics-based Floating Icons
const icons = Array.from(document.querySelectorAll('.floating-icon')).map(el => ({
    element: el,
    x: parseFloat(el.style.getPropertyValue('--x')) || Math.random() * 100, // percentage string to number? rough approx
    y: Math.random() * window.innerHeight, // Start random
    speed: (Math.random() * 0.5) + 0.2,
    baseX: 0, // absolute pixels calculated later
    vx: 0,
    vy: 0
}));

let mouseX = -1000;
let mouseY = -1000;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateIcons() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    icons.forEach(icon => {
        // Float Up
        icon.y -= icon.speed;
        if (icon.y < -100) {
            icon.y = height + 50;
            icon.x = Math.random() * 100; // Reset X percentage
        }

        // Convert percentage X to pixels for calculation
        // Note: This is an approximation since we want to keep responsiveness.
        // Better to check current bounding box?
        // Let's use getBoundingClientRect for interaction but update transform relative.

        const rect = icon.element.getBoundingClientRect();
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;

        // Mouse Physics (Repulsion)
        const dx = iconCenterX - mouseX;
        const dy = iconCenterY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 150; // Interaction radius

        if (dist < radius) {
            const force = (radius - dist) / radius;
            const angle = Math.atan2(dy, dx);
            const push = force * 5; // Strength

            icon.vx += Math.cos(angle) * push;
            icon.vy += Math.sin(angle) * push;
        }

        // Friction / Damping
        icon.vx *= 0.95;
        icon.vy *= 0.95;

        // Apply Velocity
        // We modify the transform. 
        // We need to maintain the 'left: var(--x)' from CSS? 
        // Actually, let's just use transform for everything to be performant.
        // We need to override the CSS left if we want full control, OR just add translation.

        // Let's apply translation offset to the base CSS position.
        // Wait, if we use CSS 'left', we can't easily change X without layout reflows.
        // Transform is better.

        // Update local position accumulator for physics
        // We'll store physics offset in data attributes or just use a separate transform?
        // Let's accumulate physics movement into the Y position for simplicity or separate variables.

        // Simply: translate(0, y) + translate(physicsX, physicsY)

        // But we need to convert icon.x percentage to something? 
        // The CSS sets 'left'. We move Y with transform.
        // We can add X translation for physics.

        const physicsX = icon.vx * 10; // amplified for effect
        const physicsY = icon.vy * 10;

        // Parallax Scroll (Optional extra)
        const scrollOffset = window.scrollY * 0.1;

        icon.element.style.transform = `translate(${physicsX}px, ${icon.y + physicsY - scrollOffset}px) rotate(${icon.y * 0.2}deg)`;

        // Note: The 'y' logic moves it up. The CSS top/left positions it initially.
        // We should probably set top:0 in CSS and control fully with transform to avoid confusion?
        // Current CSS: top: 100% (or 40%). left: var(--x).
        // Since we are setting transform Y, it's relative to that CSS position.
        // icon.y starts at random height. We want it to be absolute screen coordinates? 
        // Simpler: Keep CSS left. Use transform for Y and X-offset.
        // We need to update icon.y logic to be consistent.
    });

    requestAnimationFrame(animateIcons);
}

// Initialize and Start
// Provide strict top:0 in JS to standardise?
icons.forEach(icon => {
    icon.element.style.top = '0'; // Override CSS to make transform absolute-ish relative to top
    // recalculate X? No, left % is fine.
});
requestAnimationFrame(animateIcons);

// Custom Cursor
document.body.classList.add('js-loaded');

const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    }, 100);
});

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-slide');

            // Add staggered transition delays dynamically
            const animatedElements = entry.target.querySelectorAll('.card, .project-card, .skill-category, .timeline-item');
            animatedElements.forEach((el, index) => {
                el.style.transitionDelay = `${index * 0.1}s`;
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Chat Widget Logic
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Toggle Chat
chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('minimized');
});

// Send Message Flow
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Add User Message
    addMessage(message, 'user');
    chatInput.value = '';

    // Simulate Typing / Loading
    const loadingId = addMessage('Thinking...', 'bot');

    // Send to Backend
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message }),
    })
        .then(response => response.json())
        .then(data => {
            // Remove loading message
            const loadingMsg = document.getElementById(loadingId);
            if (loadingMsg) loadingMsg.remove();

            if (data.response) {
                addMessage(data.response, 'bot');
            } else {
                addMessage('Sorry, I encountered an error.', 'bot');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const loadingMsg = document.getElementById(loadingId);
            if (loadingMsg) loadingMsg.remove();
            addMessage('Sorry, network error.', 'bot');
        });
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

    // Simple ID for removing loading message
    const id = 'msg-' + Date.now();
    msgDiv.id = id;

    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return id;
}

sendBtn.addEventListener('click', sendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

