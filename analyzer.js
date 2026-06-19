/* ═══════════════════════════════════════════════
   analyzer.js — Password Strength Analyzer Logic
   SentinelPass v2.0
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password-input');
    const togglePasswordBtn = document.getElementById('toggle-password-btn');
    const strengthBar = document.getElementById('strength-indicator-bar');
    const strengthText = document.getElementById('strength-text');
    const entropyBadge = document.getElementById('entropy-badge');
    
    // Criteria items
    const critLength = document.getElementById('criterion-length');
    const critUpper = document.getElementById('criterion-upper');
    const critLower = document.getElementById('criterion-lower');
    const critNumber = document.getElementById('criterion-number');
    const critSpecial = document.getElementById('criterion-special');
    
    // Gauge & side panel metrics
    // ── DOM References ──
    const passwordInput    = document.getElementById('password-input');
    const toggleBtn        = document.getElementById('toggle-password-btn');
    const strengthText     = document.getElementById('strength-text');
    const entropyBadge     = document.getElementById('entropy-badge');
    const segments         = [0,1,2,3,4].map(i => document.getElementById(`seg-${i}`));
    const critLength       = document.getElementById('criterion-length');
    const critUpper        = document.getElementById('criterion-upper');
    const critLower        = document.getElementById('criterion-lower');
    const critNumber       = document.getElementById('criterion-number');
    const critSpecial      = document.getElementById('criterion-special');
    const entropyGaugeFill = document.getElementById('entropy-gauge-fill');
    const gaugeEntropyVal = document.getElementById('gauge-entropy-val');
    const pwnedStatusVal = document.getElementById('pwned-status-val');
    const pwnedStatusCard = document.getElementById('pwned-status-card');
    
    const timeOnline = document.getElementById('time-online');
    const timeOffline = document.getElementById('time-offline');
    const timeSuper = document.getElementById('time-super');
    
    // Suggestions
    const suggestionsBox = document.getElementById('suggestions-box');
    const suggestionsList = document.getElementById('suggestions-list');
    const gaugeEntropyVal  = document.getElementById('gauge-entropy-val');
    const pwnedStatusVal   = document.getElementById('pwned-status-val');
    const pwnedStatusDesc  = document.getElementById('pwned-status-desc');
    const timeOnline       = document.getElementById('time-online');
    const timeOffline      = document.getElementById('time-offline');
    const timeSuper        = document.getElementById('time-super');
    const poolVal          = document.getElementById('pool-val');
    const suggestionsBox   = document.getElementById('suggestions-box');
    const suggestionsList  = document.getElementById('suggestions-list');
    const distCard         = document.getElementById('dist-card');
    let debounceTimeout = null;
    // Distribution bars
    const distUpper   = document.getElementById('dist-upper');
    const distLower   = document.getElementById('dist-lower');
    const distDigits  = document.getElementById('dist-digits');
    const distSpecial = document.getElementById('dist-special');
    const distUpperN  = document.getElementById('dist-upper-n');
    const distLowerN  = document.getElementById('dist-lower-n');
    const distDigitsN = document.getElementById('dist-digits-n');
    const distSpecialN= document.getElementById('dist-special-n');
    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = togglePasswordBtn.querySelector('i');
        if (type === 'text') {
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            icon.setAttribute('data-lucide', 'eye');
        }
    // Strength display config
    const STRENGTH_COLORS = [
        'var(--strength-0)', // Very Weak  — red
        'var(--strength-1)', // Weak       — orange
        'var(--strength-2)', // Moderate   — yellow
        'var(--strength-3)', // Strong     — blue
        'var(--strength-4)', // Very Strong— green
    ];
    const STRENGTH_LABELS = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    // Gauge circumference: 2π × r = 2π × 42 ≈ 264
    const GAUGE_CIRCUMFERENCE = 264;
    let debounceTimer = null;
    let isVisible = false;
    // ── Toggle password visibility ──
    toggleBtn?.addEventListener('click', () => {
        isVisible = !isVisible;
        passwordInput.setAttribute('type', isVisible ? 'text' : 'password');
        toggleBtn.querySelector('i').setAttribute('data-lucide', isVisible ? 'eye-off' : 'eye');
        lucide.createIcons();
    });
    // Handle user inputs
    passwordInput.addEventListener('input', () => {
    // ── Input handler ──
    passwordInput?.addEventListener('input', () => {
        const val = passwordInput.value;
        
        // Immediate client-side checklist update
        updateChecklist(val);
        
        if (!val) {
            resetUI();
            return;
        }
        updateChecklist(val);           // instant client-side
        if (!val) { resetUI(); return; }
        // Debounce API calls to prevent flooding the backend / HIBP APIs
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            fetchAnalysis(val);
        }, 300);
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => fetchAnalysis(val), 320);
    });
    // ── Client-side checklist update (instant feedback) ──
    function updateChecklist(password) {
        // Length check (12+)
        toggleCriterion(critLength, password.length >= 12);
        // Upper case
        toggleCriterion(critUpper, /[A-Z]/.test(password));
        // Lower case
        toggleCriterion(critLower, /[a-z]/.test(password));
        // Number
        toggleCriterion(critNumber, /[0-9]/.test(password));
        // Special
        toggleCriterion(critSpecial, /[^A-Za-z0-9]/.test(password));
        setCriterion(critLength,  password.length >= 12);
        setCriterion(critUpper,   /[A-Z]/.test(password));
        setCriterion(critLower,   /[a-z]/.test(password));
        setCriterion(critNumber,  /[0-9]/.test(password));
        setCriterion(critSpecial, /[^A-Za-z0-9]/.test(password));
    }
    function toggleCriterion(element, isValid) {
        const icon = element.querySelector('i');
        if (isValid) {
            element.classList.add('valid');
            icon.setAttribute('data-lucide', 'check-circle-2');
    function setCriterion(el, valid) {
        if (!el) return;
        const icon = el.querySelector('i');
        if (valid) {
            el.classList.add('valid');
            icon?.setAttribute('data-lucide', 'check-circle-2');
        } else {
            element.classList.remove('valid');
            icon.setAttribute('data-lucide', 'circle');
            el.classList.remove('valid');
            icon?.setAttribute('data-lucide', 'circle');
        }
        lucide.createIcons();
    }
    function resetUI() {
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = '';
        strengthText.innerText = 'Awaiting input...';
        strengthText.style.color = 'var(--text-muted)';
        entropyBadge.innerText = '0.00 bits';
        gaugeEntropyVal.innerText = '0';
        updateEntropyGauge(0);
        
        pwnedStatusVal.innerText = 'Awaiting input...';
        pwnedStatusVal.className = 'metric-value neutral';
        
        timeOnline.innerText = 'Instantly';
        timeOffline.innerText = 'Instantly';
        timeSuper.innerText = 'Instantly';
        
        suggestionsBox.style.display = 'none';
        suggestionsList.innerHTML = '';
    }
    function updateEntropyGauge(entropy) {
        // Circle circumference is 2 * PI * r = 2 * 3.1416 * 44 = ~276.46
        const circumference = 276;
        const maxEntropy = 120; // 120 bits is exceptionally strong
        const percent = Math.min(entropy / maxEntropy, 1);
        const offset = circumference - (percent * circumference);
        entropyGaugeFill.style.strokeDashoffset = offset;
    }
    // ── Fetch full analysis from Flask API ──
    async function fetchAnalysis(password) {
        try {
            const response = await fetch('/api/analyze', {
            const res = await fetch('/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            if (!response.ok) throw new Error('API request failed');
            
            const data = await response.json();
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            renderAnalysis(data);
        } catch (error) {
            console.error('Error analyzing password:', error);
            // Fallback UI in case backend is offline
            renderFallbackOfflineAnalysis(password);
        } catch (err) {
            console.warn('API unavailable, using client fallback:', err);
            renderAnalysis(clientFallback(password));
        }
    }
    // ── Render full analysis results ──
    function renderAnalysis(data) {
        // 1. Update Strength Meter
        const scores = [
            { width: '20%', color: 'var(--strength-0)', label: 'Very Weak' },
            { width: '40%', color: 'var(--strength-1)', label: 'Weak' },
            { width: '60%', color: 'var(--strength-2)', label: 'Moderate' },
            { width: '80%', color: 'var(--strength-3)', label: 'Strong' },
            { width: '100%', color: 'var(--strength-4)', label: 'Very Strong' }
        ];
        if (data.error) return;
        const score = Math.min(data.score ?? 0, 4);
        const color = STRENGTH_COLORS[score];
        const evaluation = scores[data.score];
        strengthBar.style.width = evaluation.width;
        strengthBar.style.backgroundColor = evaluation.color;
        strengthText.innerText = data.rating;
        strengthText.style.color = evaluation.color;
        
        // 2. Entropy
        entropyBadge.innerText = `${data.entropy.toFixed(2)} bits`;
        gaugeEntropyVal.innerText = Math.round(data.entropy);
        updateEntropyGauge(data.entropy);
        // 1. Segmented strength bar
        segments.forEach((seg, i) => {
            if (i <= score) {
                seg.style.backgroundColor = color;
                seg.style.boxShadow = `0 0 7px ${color}`;
            } else {
                seg.style.backgroundColor = 'rgba(255,255,255,0.07)';
                seg.style.boxShadow = 'none';
            }
        });
        // 3. Breach checking (HIBP)
        if (data.pwned_count > 0) {
            pwnedStatusVal.innerText = `Leaked (${data.pwned_count.toLocaleString()} times)`;
            pwnedStatusVal.className = 'metric-value warning';
        } else if (data.pwned_count === 0) {
            pwnedStatusVal.innerText = 'Safe (No leaks found)';
            pwnedStatusVal.className = 'metric-value secure';
        // 2. Strength label
        strengthText.textContent = STRENGTH_LABELS[score];
        strengthText.style.color = color;
        // 3. Entropy badge & gauge
        const entropy = data.entropy ?? 0;
        entropyBadge.textContent = `${entropy.toFixed(2)} bits`;
        gaugeEntropyVal.textContent = Math.round(entropy);
        updateGauge(entropy, color);
        // 4. Pool size
        if (poolVal) {
            poolVal.textContent = data.pool_size ? `${data.pool_size} chars` : '—';
            poolVal.className = 'metric-value ' + (data.pool_size >= 50 ? 'secure' : 'neutral');
        }
        // 5. Breach status
        renderBreachStatus(data.pwned_count ?? -1);
        // 6. Crack times
        if (data.crack_times) {
            timeOnline.textContent  = data.crack_times.online_throttled  ?? '—';
            timeOffline.textContent = data.crack_times.offline_fast_hash ?? '—';
            timeSuper.textContent   = data.crack_times.supercomputer     ?? '—';
            colorCrackTime(timeOnline,  data.crack_times.online_throttled);
            colorCrackTime(timeOffline, data.crack_times.offline_fast_hash);
            colorCrackTime(timeSuper,   data.crack_times.supercomputer);
        }
        // 7. Suggestions
        renderSuggestions(data.suggestions ?? []);
        // 8. Character distribution
        if (data.distribution) {
            renderDistribution(data.distribution);
        }
    }
    // ── Gauge SVG animation ──
    function updateGauge(entropy, color) {
        const maxEntropy = 128;
        const pct = Math.min(entropy / maxEntropy, 1);
        const offset = GAUGE_CIRCUMFERENCE - pct * GAUGE_CIRCUMFERENCE;
        if (entropyGaugeFill) {
            entropyGaugeFill.style.strokeDashoffset = offset;
            entropyGaugeFill.style.stroke = color;
        }
        if (gaugeEntropyVal) gaugeEntropyVal.style.color = color;
    }
    // ── Breach status display ──
    function renderBreachStatus(pwnedCount) {
        if (!pwnedStatusVal) return;
        if (pwnedCount > 0) {
            pwnedStatusVal.textContent = `⚠ Leaked ${pwnedCount.toLocaleString()} times!`;
            pwnedStatusVal.className   = 'metric-value warning';
            if (pwnedStatusDesc) pwnedStatusDesc.textContent = 'This password was found in data breach databases. Stop using it immediately.';
        } else if (pwnedCount === 0) {
            pwnedStatusVal.textContent = '✓ Not found in breaches';
            pwnedStatusVal.className   = 'metric-value secure';
            if (pwnedStatusDesc) pwnedStatusDesc.textContent = 'No matches in 750M+ known leaked passwords. Good sign!';
        } else {
            pwnedStatusVal.innerText = 'Offline Mode';
            pwnedStatusVal.className = 'metric-value neutral';
            pwnedStatusVal.textContent = 'Offline / Unavailable';
            pwnedStatusVal.className   = 'metric-value neutral';
            if (pwnedStatusDesc) pwnedStatusDesc.textContent = 'Could not reach the HIBP API. Check your internet connection.';
        }
    }
        // 4. Crack Times
        timeOnline.innerText = data.crack_times.online_throttled;
        timeOffline.innerText = data.crack_times.offline_fast_hash;
        timeSuper.innerText = data.crack_times.supercomputer;
    // ── Colour crack time labels by severity ──
    function colorCrackTime(el, text) {
        if (!el || !text) return;
        const lower = text.toLowerCase();
        if (lower === 'instantly' || lower.includes('second') || lower.includes('minute')) {
            el.style.color = 'var(--strength-0)';       // red  — bad
        } else if (lower.includes('hour') || lower.includes('day')) {
            el.style.color = 'var(--strength-2)';       // yellow
        } else if (lower.includes('month') || lower.includes('year')) {
            el.style.color = 'var(--strength-3)';       // blue — good
        } else {
            el.style.color = 'var(--strength-4)';       // green — excellent
        }
    }
        // 5. Suggestions
    // ── Suggestions list ──
    function renderSuggestions(suggestions) {
        if (!suggestionsList || !suggestionsBox) return;
        suggestionsList.innerHTML = '';
        if (data.suggestions && data.suggestions.length > 0) {
            suggestionsBox.style.display = 'block';
            data.suggestions.forEach(suggest => {
                const li = document.createElement('li');
                
                // Determine style based on context (breach is warning, other can be info)
                const isBreach = suggest.includes('WARNING') || suggest.includes('common password');
                li.className = isBreach ? 'suggestion-item' : 'suggestion-item info';
                
                const iconName = isBreach ? 'alert-triangle' : 'info';
                li.innerHTML = `<i data-lucide="${iconName}"></i><span>${suggest}</span>`;
                suggestionsList.appendChild(li);
            });
            lucide.createIcons();
        } else {
        if (suggestions.length === 0) {
            suggestionsBox.style.display = 'none';
            return;
        }
        suggestionsBox.style.display = 'block';
        suggestions.forEach(text => {
            const isBreach = text.includes('BREACH') || text.includes('common');
            const li = document.createElement('li');
            li.className = isBreach ? 'suggestion-item' : 'suggestion-item info';
            li.innerHTML = `<i data-lucide="${isBreach ? 'alert-triangle' : 'info'}"></i><span>${text}</span>`;
            suggestionsList.appendChild(li);
        });
        lucide.createIcons();
    }
    // Client-side fallback analyzer if API endpoint fails
    function renderFallbackOfflineAnalysis(password) {
    // ── Character distribution bars ──
    function renderDistribution(dist) {
        if (!distCard) return;
        distCard.style.display = 'block';
        const total = Object.values(dist).reduce((a, b) => a + b, 0);
        if (total === 0) { distCard.style.display = 'none'; return; }
        const setBar = (bar, numEl, count) => {
            if (!bar || !numEl) return;
            bar.style.width = `${(count / total) * 100}%`;
            numEl.textContent = count;
        };
        setBar(distUpper,   distUpperN,   dist.uppercase ?? 0);
        setBar(distLower,   distLowerN,   dist.lowercase ?? 0);
        setBar(distDigits,  distDigitsN,  dist.digits    ?? 0);
        setBar(distSpecial, distSpecialN, dist.special   ?? 0);
    }
    // ── Reset UI to empty state ──
    function resetUI() {
        segments.forEach(s => {
            s.style.backgroundColor = 'rgba(255,255,255,0.07)';
            s.style.boxShadow = 'none';
        });
        strengthText.textContent = 'Awaiting input…';
        strengthText.style.color = 'var(--text-muted)';
        entropyBadge.textContent = '0.00 bits';
        if (gaugeEntropyVal) { gaugeEntropyVal.textContent = '0'; gaugeEntropyVal.style.color = ''; }
        updateGauge(0, 'var(--color-cyan)');
        if (pwnedStatusVal) { pwnedStatusVal.textContent = 'Awaiting input…'; pwnedStatusVal.className = 'metric-value neutral'; }
        if (pwnedStatusDesc) pwnedStatusDesc.textContent = 'Checks billions of leaked credentials via Have I Been Pwned (k-Anonymity).';
        [timeOnline, timeOffline, timeSuper].forEach(el => { if (el) { el.textContent = '—'; el.style.color = ''; } });
        if (poolVal) { poolVal.textContent = '—'; poolVal.className = 'metric-value neutral'; }
        if (suggestionsBox) suggestionsBox.style.display = 'none';
        if (distCard) distCard.style.display = 'none';
    }
    // ── Client-side fallback (when API is offline) ──
    function clientFallback(password) {
        const len = password.length;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasUpper   = /[A-Z]/.test(password);
        const hasLower   = /[a-z]/.test(password);
        const hasNumber  = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        
        let pool = 0;
        if (hasUpper) pool += 26;
        if (hasLower) pool += 26;
        if (hasNumber) pool += 10;
        if (hasSpecial) pool += 32;
        
        if (hasUpper)   pool += 26;
        if (hasLower)   pool += 26;
        if (hasNumber)  pool += 10;
        if (hasSpecial) pool += 33;
        const entropy = pool > 0 ? len * Math.log2(pool) : 0;
        let score = 0;
        if (len >= 8) score++;
        if (len >= 12) score++;
        if (pool >= 50) score++;
        if (len >= 8)    score++;
        if (len >= 12)   score++;
        if (pool >= 50)  score++;
        if (entropy >= 60) score++;
        
        const data = {
            score: score,
            rating: ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][score],
            entropy: entropy,
            pwned_count: -1, // Connection issue representation
            crack_times: {
                online_throttled: 'Unknown',
                offline_fast_hash: 'Unknown',
                supercomputer: 'Unknown'
        const suggestions = [];
        if (len < 12)       suggestions.push('Increase password length to at least 12–16 characters.');
        if (!hasUpper)      suggestions.push('Add uppercase letters (A–Z).');
        if (!hasLower)      suggestions.push('Add lowercase letters (a–z).');
        if (!hasNumber)     suggestions.push('Add numerical digits (0–9).');
        if (!hasSpecial)    suggestions.push('Add special characters (e.g. !, @, #, $).');
        suggestions.push('Breach check unavailable (offline mode).');
        return {
            score, entropy: Math.round(entropy * 100) / 100,
            pool_size: pool, pwned_count: -1,
            distribution: {
                uppercase: (password.match(/[A-Z]/g) || []).length,
                lowercase: (password.match(/[a-z]/g) || []).length,
                digits:    (password.match(/[0-9]/g) || []).length,
                special:   (password.match(/[^A-Za-z0-9]/g) || []).length,
            },
            suggestions: []
            crack_times: { online_throttled: 'Unknown', offline_fast_hash: 'Unknown', supercomputer: 'Unknown' },
            suggestions
        };
        
        if (len < 12) data.suggestions.push("Increase password length.");
        if (!hasSpecial || !hasNumber) data.suggestions.push("Add numerical digits and special character glyphs.");
        
        renderAnalysis(data);
    }
});
}); // end DOMContentLoaded
