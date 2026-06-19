/* ═══════════════════════════════════════════════
   particles.js — Canvas Particle Animation
   SentinelPass v2.0
   Lightweight floating network of dots and lines
   representing data nodes in a cybersecurity theme.
═══════════════════════════════════════════════ */
(function () {
    'use strict';
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    let W        = 0;
    let H        = 0;
    let particles = [];
    let animFrame = null;
    // ── Config ──
    const CONFIG = {
        count:         60,
        maxRadius:     2.2,
        minRadius:     0.6,
        speed:         0.35,
        lineDistance:  130,
        lineOpacity:   0.12,
        colors: [
            'rgba(6,182,212,',   // cyan
            'rgba(139,92,246,',  // purple
            'rgba(59,130,246,',  // blue
            'rgba(16,185,129,',  // green
        ],
    };
    // ── Particle class ──
    function Particle() {
        this.reset(true);
    }
    Particle.prototype.reset = function (init) {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius);
        const angle = Math.random() * Math.PI * 2;
        const speed = CONFIG.speed * (0.5 + Math.random());
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
        this.opacity = 0.3 + Math.random() * 0.6;
        if (init) {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
        }
    };
    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        // Wrap around edges
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
    };
    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.fill();
    };
    // ── Connect nearby particles with lines ──
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i];
                const b = particles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONFIG.lineDistance) {
                    const alpha = CONFIG.lineOpacity * (1 - dist / CONFIG.lineDistance);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    // ── Resize handler ──
    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    // ── Initialise particles ──
    function init() {
        resize();
        particles = [];
        for (let i = 0; i < CONFIG.count; i++) {
            particles.push(new Particle());
        }
    }
    // ── Animation loop ──
    function animate() {
        ctx.clearRect(0, 0, W, H);
        connectParticles();
        particles.forEach(p => { p.update(); p.draw(); });
        animFrame = requestAnimationFrame(animate);
    }
    // ── Pause when tab is hidden (save CPU) ──
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animFrame);
        } else {
            animate();
        }
    });
    // ── Responsive resize ──
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resize();
            // Re-clamp particle positions
            particles.forEach(p => {
                p.x = Math.min(p.x, W);
                p.y = Math.min(p.y, H);
            });
        }, 200);
    });
    // ── Start ──
    init();
    animate();
})();
