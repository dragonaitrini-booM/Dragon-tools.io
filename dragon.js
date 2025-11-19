/* Dragon Tools – clean vanilla JS  */
(() => {
  /* ---------- neural-network canvas ---------- */
  const canvas = document.getElementById('neural-network');
  if (!canvas) return; // Exit if canvas element doesn't exist
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = innerWidth);
  let h = (canvas.height = innerHeight);

  // Create 50 particles for the neural network effect
  const particles = Array.from({ length: 50 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    // Small velocity for slow, atmospheric movement
    vx: (Math.random() - 0.5) * 1.2, 
    vy: (Math.random() - 0.5) * 1.2,
    r: Math.random() * 1.5 + 0.5 // Particle size
  }));

  function draw() {
    // Clear the canvas each frame
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(0,229,255,0.08)'; // Light blue/cyan lines (low opacity)
    ctx.fillStyle = 'rgba(0,229,255,0.4)';  // Blue/cyan particles
    ctx.lineWidth = 1;

    particles.forEach((p, i) => {
      // 1. Update position
      p.x += p.vx;
      p.y += p.vy;
      // Reverse velocity if particle hits the edge
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
        const d = Math.hypot(dx, dy); // Calculate distance
        if (d < 120) { // Only connect if within 120px distance
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    // Loop the animation
    requestAnimationFrame(draw);
  }
  draw();

  /* ---------- resize handler: re-measure and re-run on window resize ---------- */
  addEventListener('resize', () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });

  /* ---------- smooth scroll for internal links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    })
  );

  /* ---------- nav active state: highlight current section in navigation ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(document.querySelectorAll('section[id]'));

  addEventListener('scroll', () => {
    // Offset scroll position to account for fixed header height
    const y = scrollY + 200; 
    let current = '';

    // Determine the current section visible in the viewport
    sections.forEach(s => { 
        if (y >= s.offsetTop) current = s.id; 
    });

    // Update the 'active' class on the corresponding navigation link
    navLinks.forEach(l => {
        const linkHref = l.getAttribute('href');
        const isActive = linkHref === `#${current}`;
        l.classList.toggle('active', isActive);
    });
  });
})();
