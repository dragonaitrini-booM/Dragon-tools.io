/* Dragon Tools – clean vanilla JS – FINAL CONFIGURATION */
(() => {
    /* ---------- CONFIGURATION VARIABLES (MUST BE UPDATED) ---------- */
    // Replace this with your actual GitHub repository information
    const GITHUB_REPO_PATH = 'YOUR_GITHUB_USER/YOUR_REPO_NAME';
    // CRITICAL: Replace this with the actual URL of your webhook endpoint 
    const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_FOR_TRACKING';

    /* ---------- Heartbeat Pulse Animation (Hook 1) ---------- */
    const initHeartbeat = () => {
        const logo = document.querySelector('.nav-dragon-logo');
        const hasPulsed = localStorage.getItem('dragonPulseComplete');

        if (logo && !hasPulsed) {
            logo.style.animation = 'heart-pulse 0.8s ease-out 1';
            
            setTimeout(() => {
                logo.style.animation = '';
            }, 800);

            localStorage.setItem('dragonPulseComplete', 'true');
        }
    };


    /* ---------- One-Click Fork & Clone Button (Hook 2) ---------- */
    // NOTE: This function is preserved but its initializer is commented out below 
    // because the 'fork-clone-btn' was replaced with a direct link in the HTML.
    const initForkButton = () => {
        const forkBtn = document.getElementById('fork-clone-btn');
        if (!forkBtn) return;
        
        // Command for the user to copy (Cloning the public repository)
        const repoName = GITHUB_REPO_PATH.split('/').pop();
        const curlCommand = 
            `# 1. Clone the public repo: 
git clone https://github.com/${GITHUB_REPO_PATH}.git 
# 2. Go into the directory:
cd ${repoName} 
# 3. Open in VS Code:
code .`;


        forkBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(curlCommand);
                
                // --- Visual Feedback ---
                forkBtn.textContent = 'COMMAND COPIED! PASTE IN TERMINAL TO START.';
                forkBtn.classList.add('copied');
                
                // Ping the tracking webhook (if configured)
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


    /* ---------- neural-network canvas (RESTORED VISUAL LOGIC) ---------- */
    const initNeuralNetwork = () => {
        const canvas = document.getElementById('neural-network');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = innerWidth);
        let h = (canvas.height = innerHeight);
        
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            r: Math.random() * 1.5 + 0.7
        }));
        
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.lineWidth = 1;
            
            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                
                // RESTORED: Cyber Blue particle color
                ctx.fillStyle = 'rgba(0,229,255,0.6)'; 
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; ++j) {
                    const dx = p.x - particles[j].x;
                    const dy = p.y - particles[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < 150) {
                        // RESTORED: Dragon Orange/Amber line color
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
        
        addEventListener('resize', () => {
            w = canvas.width = innerWidth;
            h = canvas.height = innerHeight;
        });
    };

    /* ---------- smooth scroll for internal links ---------- */
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(a =>
            a.addEventListener('click', e => {
                const targetId = a.getAttribute('href');
                if (targetId.length > 1) { 
                    e.preventDefault();
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                }
            })
        );
    };

    /* ---------- nav active state (CRITICAL FIX) ---------- */
    const initNavActiveState = () => {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = Array.from(document.querySelectorAll('section[id]'));

        addEventListener('scroll', () => {
            const y = scrollY + 250;
            let current = '';

            sections.forEach(s => { 
                if (y >= s.offsetTop) current = s.id; 
            });

            navLinks.forEach(l => {
                // Check if the link is an internal hash link before trying to split it
                if (l.getAttribute('href').startsWith('#')) {
                    const linkSectionId = l.getAttribute('href').split('#')[1];
                    const isActive = linkSectionId === current;
                    l.classList.toggle('active', isActive);
                }
                // NOTE: Links to external pages (like infrastructure.html or opportunities.html) will NOT receive the active class via scroll tracking.
            });
        });
    };


    /* ---------- Initializer: Run all functions once the DOM is ready ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initHeartbeat(); // Hook 1
        // initForkButton(); // Hook 2 - COMMENTED OUT to prevent silent errors due to missing button ID
        initNeuralNetwork(); // Background
        initSmoothScroll(); // UX
        initNavActiveState(); // UX
    });

})();
