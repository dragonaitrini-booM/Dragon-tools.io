/* Dragon Tools – clean vanilla JS – CONFIGURATION COMPLETE */
(() => {
    /* ---------- CONFIGURATION VARIABLES ---------- */
    // Replace this with your actual GitHub repository information
    const GITHUB_REPO_PATH = 'YOUR_GITHUB_USER/YOUR_REPO_NAME';
    // CRITICAL: Replace this with the actual URL of your webhook endpoint 
    // to track successful copy events (optional, but highly recommended)
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_FOR_TRACKING';

    /* ---------- Heartbeat Pulse Animation (Hook 1) ---------- */
    const initHeartbeat = () => {
        const logo = document.querySelector('.nav-dragon-logo');
        // Check for specific flag related to the pulse animation
        const hasPulsed = localStorage.getItem('dragonPulseComplete'); 

        if (logo && !hasPulsed) {
            // Apply the pulse animation (CSS animation keyframes must be present in style.css)
            logo.style.animation = 'heart-pulse 0.8s ease-out 1';
            
            // Clear animation style after it completes
            setTimeout(() => {
                logo.style.animation = '';
            }, 800);

            // Set the flag so it never runs again for this user's browser
            localStorage.setItem('dragonPulseComplete', 'true');

            // NOTE: To add a sub-bass thump, you would insert Web Audio API code here
            // Example: new Audio('path/to/thump.mp3').play();
        }
    };


    /* ---------- One-Click Fork & Clone Button (Hook 2) ---------- */
    const initForkButton = () => {
        const forkBtn = document.getElementById('fork-clone-btn');
        if (!forkBtn) return;
        
        // The one-line command to fork, clone, and open VS Code (bash/zsh)
        // NOTE: This is a simulated command. Real world one-click forks usually 
        // require a serverless function to handle the GitHub API part without exposing tokens.
        // For a public-facing site, this command is used to copy the *next step* instruction.
        const curlCommand = 
            `# 1. Clone the public repo: 
git clone https://github.com/${GITHUB_REPO_PATH}.git 
# 2. Go into the directory:
cd ${GITHUB_REPO_PATH.split('/').pop()} 
# 3. Open in VS Code:
code .`;


        forkBtn.addEventListener('click', async () => {
            try {
                // Use navigator.clipboard.writeText for modern browsers
                await navigator.clipboard.writeText(curlCommand);
                
                // --- Visual Feedback ---
                forkBtn.textContent = 'COMMAND COPIED! PASTE IN TERMINAL TO START.';
                forkBtn.classList.add('copied');
                
                // Ping the tracking webhook (Fire and forget)
                if (WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_FOR_TRACKING') {
                     fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ action: 'fork_copy_clicked', repo: GITHUB_REPO_PATH, time: new Date().toISOString() }) });
                }

                // Reset button text after 5 seconds
                setTimeout(() => {
                    forkBtn.textContent = 'STEAL THIS REPO IN 3s (Click to Copy Command)';
                    forkBtn.classList.remove('copied');
                }, 5000);

            } catch (err) {
                console.error('Could not copy command to clipboard', err);
                forkBtn.textContent = 'FAILED TO COPY. CHECK CONSOLE.';
            }
        });
    };


    /* ---------- neural-network canvas (Existing Logic) ---------- */
    const initNeuralNetwork = () => {
        const canvas = document.getElementById('neural-network');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = innerWidth);
        let h = (canvas.height = innerHeight);
    
        // Increase particle density slightly to match the "Active Architecture" vibe
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 1.5, // Slightly faster velocity
            vy: (Math.random() - 0.5) * 1.5,
            r: Math.random() * 1.5 + 0.7 // Slightly larger particle size
        }));
    
        function draw() {
            ctx.clearRect(0, 0, w, h);
            // Updated color scheme to match Dragon Tools energy (Orange/Cyan mix)
            ctx.strokeStyle = 'rgba(255,165,0,0.05)'; // Faint Orange/Gold lines
            ctx.fillStyle = 'rgba(0,229,255,0.6)';  // Bright Blue/Cyan particles
            ctx.lineWidth = 1;
    
            particles.forEach((p, i) => {
                // 1. Update position
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
    
                // 2. Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
    
                // 3. Draw connections to other particles
                for (let j = i + 1; j < particles.length; ++j) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < 150) { // Increased connection distance to 150px
                        // Line opacity fades based on distance
                        ctx.strokeStyle = `rgba(255,165,0, ${1 - d / 150})`; 
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(draw);
        }
        draw();
    
        /* ---------- resize handler ---------- */
        addEventListener('resize', () => {
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
        });
    };

    /* ---------- smooth scroll for internal links (Existing Logic) ---------- */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(a =>
            a.addEventListener('click', e => {
                const targetId = a.getAttribute('href');
                // Only scroll if it's an internal link
                if (targetId.length > 1) { 
                    e.preventDefault();
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                }
            })
        );
    };

    /* ---------- nav active state (Existing Logic) ---------- */
    const initNavActiveState = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        // Ensure we only look at sections with IDs for scroll tracking
        const sections = Array.from(document.querySelectorAll('section[id]'));

        addEventListener('scroll', () => {
            const y = scrollY + 250; // Increased offset for better section detection
            let current = '';

            sections.forEach(s => { 
                if (y >= s.offsetTop) current = s.id; 
            });

            navLinks.forEach(l => {
                // Extract section ID from the link href (e.g., '#ethos')
                const linkSectionId = l.getAttribute('href').split('#')[1];
                
                // Only toggle active state for links that are NOT the current page (infrastructure.html)
                if (linkSectionId) {
                    const isActive = linkSectionId === current;
                    l.classList.toggle('active', isActive);
                }
            });
        });
    };


    /* ---------- Initializer: Run all functions once the DOM is ready ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initHeartbeat(); // Hook 1
        initForkButton(); // Hook 2
        initNeuralNetwork(); // Background
        initSmoothScroll(); // UX
        initNavActiveState(); // UX
    });

})();
