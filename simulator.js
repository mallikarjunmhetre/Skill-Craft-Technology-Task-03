/* ═══════════════════════════════════════════════
   simulator.js — Brute-Force & Dictionary Demos
   SentinelPass v2.0
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. Accordion Toggle Logic
       ========================================================================== */
    const accordions = document.querySelectorAll('.accordion-item');
    
    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        
        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other accordions
            accordions.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });
            
            // Toggle current
            if (isOpen) {
                item.classList.remove('open');
                content.style.maxHeight = '0';
            } else {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
    // ── Brute-Force Simulator ──
    const simInput      = document.getElementById('sim-password');
    const startBtn      = document.getElementById('sim-start-btn');
    const stopBtn       = document.getElementById('sim-stop-btn');
    const simConsole    = document.getElementById('sim-console');
    const simAttempts   = document.getElementById('sim-val-attempts');
    const simTime       = document.getElementById('sim-val-time');
    const simGuess      = document.getElementById('sim-val-guess');
    const simSearchInfo = document.getElementById('sim-search-info');
    const simSearchText = document.getElementById('sim-search-text');
    // Dictionary Attack Demo
    const dictInput     = document.getElementById('dict-input');
    const dictCheckBtn  = document.getElementById('dict-check-btn');
    const dictResult    = document.getElementById('dict-result');
    // Accordion Knowledge Base
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.accordion-item');
            const wasOpen = item.classList.contains('open');
            // Close all
            document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('open'));
            // Toggle clicked
            if (!wasOpen) item.classList.add('open');
            lucide.createIcons();
        });
    });
    /* ==========================================================================
       2. Brute Force Simulator Logic
       ========================================================================== */
    const simPassword = document.getElementById('sim-password');
    const simStartBtn = document.getElementById('sim-start-btn');
    const simConsole = document.getElementById('sim-console');
    const simValAttempts = document.getElementById('sim-val-attempts');
    const simValTime = document.getElementById('sim-val-time');
    const simValGuess = document.getElementById('sim-val-guess');
    // ── Brute Force character set ──
    const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let simRunning = false;
    let simStartTime = 0;
    let simAttempts = 0;
    let animationFrameId = null;
    let simRunning  = false;
    let simStopped  = false;
    let attempts    = 0;
    let startTime   = null;
    let timerHandle = null;
    simStartBtn.addEventListener('click', () => {
        if (simRunning) {
            stopSimulation(false, 'Simulation stopped by user.');
        } else {
            startSimulation();
    // ── Log helper ──
    function log(text, cls = '') {
        if (!simConsole) return;
        const line = document.createElement('div');
        line.className = `console-line${cls ? ' ' + cls : ''}`;
        line.textContent = text;
        simConsole.appendChild(line);
        simConsole.scrollTop = simConsole.scrollHeight;
    }
    function clearConsole() {
        if (simConsole) simConsole.innerHTML = '';
    }
    function updateStats(guess) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        if (simAttempts) simAttempts.textContent = attempts.toLocaleString();
        if (simTime)     simTime.textContent     = `${elapsed}s`;
        if (simGuess)    simGuess.textContent    = guess;
    }
    // ── Generator that yields brute-force candidates ──
    function* bruteForceGenerator(maxLen) {
        for (let length = 1; length <= maxLen; length++) {
            yield* genCombinations('', length);
        }
    });
    }
    function startSimulation() {
        const target = simPassword.value;
    function* genCombinations(prefix, remaining) {
        if (remaining === 0) {
            yield prefix;
            return;
        }
        for (const char of CHARSET) {
            yield* genCombinations(prefix + char, remaining - 1);
        }
    }
    // ── Compute search space size ──
    function searchSpaceSize(target) {
        const n = CHARSET.length;
        let total = 0;
        for (let i = 1; i <= target.length; i++) {
            total += Math.pow(n, i);
        }
        return total;
    }
    // ── Start simulation ──
    startBtn?.addEventListener('click', () => {
        const target = simInput?.value?.trim()?.toLowerCase();
        if (!target) {
            logToConsole('Error: Target password cannot be empty.', 'error');
            log('⚠ Enter a target password first.', 'warn');
            return;
        }
        if (target.length > 5) {
            logToConsole('Error: Password length restricted to max 5 chars to prevent browser lockup.', 'error');
            log('⚠ Max 5 characters for the demo. Please shorten the target.', 'warn');
            return;
        }
        // Validate chars
        for (const c of target) {
            if (!CHARSET.includes(c)) {
                log(`⚠ Only lowercase letters (a-z) and digits (0-9) allowed. Remove: "${c}"`, 'warn');
                return;
            }
        }
        // Initialize variables
        // Setup
        clearConsole();
        simStopped = false;
        simRunning = true;
        simStartBtn.innerText = 'Stop Attack';
        simStartBtn.style.background = 'linear-gradient(135deg, var(--strength-0), #f43f5e)';
        simStartBtn.style.boxShadow = 'var(--glow-red)';
        
        simPassword.disabled = true;
        simConsole.innerHTML = '';
        logToConsole(`Target locked: "${target}"`, 'dim');
        logToConsole('Deducing character pool requirements...');
        attempts   = 0;
        startTime  = Date.now();
        // Determine the alphabet subset based on what's in the target
        let alphabet = '';
        if (/[a-z]/.test(target)) alphabet += 'abcdefghijklmnopqrstuvwxyz';
        if (/[A-Z]/.test(target)) alphabet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (/[0-9]/.test(target)) alphabet += '0123456789';
        if (/[^A-Za-z0-9]/.test(target)) alphabet += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Safety fallback if characters are somehow not in basic sets
        if (!alphabet) alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
        startBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'inline-flex';
        logToConsole(`Alphabet pool identified: [${alphabet}] (Size: ${alphabet.length})`, 'dim');
        logToConsole('Launching visual brute-force solver. Decrypting...');
        // Show search space
        const space = searchSpaceSize(target);
        if (simSearchInfo) {
            simSearchInfo.style.display = 'block';
            if (simSearchText) {
                simSearchText.textContent =
                    ` ${CHARSET.length} chars × lengths 1–${target.length} = up to ${space.toLocaleString()} combinations.`;
            }
        }
        simStartTime = performance.now();
        simAttempts = 0;
        
        // Start running frames
        runSimulationLoop(target, alphabet);
    }
        log(`[ Attack started on target: "${target}" ]`, 'dim');
        log(`[ Character set: ${CHARSET.length} chars (a-z, 0-9) ]`, 'dim');
        log(`[ Max search space: ${space.toLocaleString()} combinations ]`, 'dim');
        log('');
    function runSimulationLoop(target, alphabet) {
        const batchSize = 1350; // Try 1350 combinations per frame
        runBruteForce(target);
    });
    // ── Stop simulation ──
    stopBtn?.addEventListener('click', () => {
        simStopped = true;
    });
    // ── Async brute-force runner (batch processing to not freeze UI) ──
    async function runBruteForce(target) {
        const gen = bruteForceGenerator(target.length);
        const BATCH = 500;        // guesses per frame
        const LOG_EVERY = 250;    // log every N attempts
        timerHandle = setInterval(() => {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
            if (simTime) simTime.textContent = `${elapsed}s`;
        }, 100);
        const tick = () => new Promise(r => setTimeout(r, 0));
        let found = false;
        let lastGuess = '';
        outer:
        while (true) {
            for (let i = 0; i < BATCH; i++) {
                if (simStopped) {
                    log('', '');
                    log(`[ ■ Simulation stopped by user after ${attempts.toLocaleString()} attempts ]`, 'warn');
                    finishSim();
                    return;
                }
                const next = gen.next();
                if (next.done) {
                    log('', '');
                    log(`[ Search exhausted — target not in charset/length range ]`, 'error');
                    finishSim();
                    return;
                }
                const guess = next.value;
                attempts++;
        for (let i = 0; i < batchSize; i++) {
            const guess = getCombination(simAttempts, alphabet);
            simAttempts++;
            lastGuess = guess;
                if (attempts % LOG_EVERY === 0) {
                    log(`Trying: ${guess}`, 'attempt');
                    updateStats(guess);
                }
            if (guess === target) {
                found = true;
                break;
                if (guess === target) {
                    found = true;
                    updateStats(guess);
                    break outer;
                }
            }
            await tick();
        }
        const elapsed = (performance.now() - simStartTime) / 1000;
        
        // Update dashboard values
        simValAttempts.innerText = simAttempts.toLocaleString();
        simValTime.innerText = `${elapsed.toFixed(2)}s`;
        simValGuess.innerText = lastGuess;
        // Print sample logs in console periodically to show movement
        if (simAttempts % 10 === 0 || found) {
            logToConsole(`Attempt ${simAttempts.toLocaleString()}: testing "${lastGuess}"`);
        }
        if (found) {
            stopSimulation(true, `SUCCESS! Match located: "${target}". Cracked in ${simAttempts.toLocaleString()} iterations in ${elapsed.toFixed(3)}s.`);
        } else if (simRunning) {
            animationFrameId = requestAnimationFrame(() => runSimulationLoop(target, alphabet));
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(3);
            log('', '');
            log('━'.repeat(40), 'dim');
            log(`✓ PASSWORD CRACKED: "${target}"`, 'success');
            log(`  Total attempts : ${attempts.toLocaleString()}`, 'success');
            log(`  Time taken     : ${elapsed}s`, 'success');
            log(`  Attack speed   : ~${Math.round(attempts / elapsed).toLocaleString()} guesses/sec (browser JS)`, 'dim');
            log('━'.repeat(40), 'dim');
            log('', '');
            log('[ Real GPU clusters run at 100,000,000,000,000 guesses/sec! ]', 'dim');
            log('[ A 16-char password would take millions of years even then.  ]', 'dim');
            updateStats(target);
        }
        finishSim();
    }
    function stopSimulation(success, message) {
    function finishSim() {
        clearInterval(timerHandle);
        simRunning = false;
        cancelAnimationFrame(animationFrameId);
        
        simStartBtn.innerText = 'Start Attack';
        simStartBtn.style.background = '';
        simStartBtn.style.boxShadow = '';
        
        simPassword.disabled = false;
        if (success) {
            logToConsole(message, 'success');
            simValGuess.style.color = 'var(--strength-4)';
        } else {
            logToConsole(message, 'error');
            simValGuess.style.color = '';
        }
        startBtn.style.display = 'inline-flex';
        if (stopBtn) stopBtn.style.display = 'none';
        lucide.createIcons();
    }
    // Mathematical mapping of index to base-N strings
    function getCombination(index, alphabet) {
        const base = alphabet.length;
        let temp = index;
        let result = '';
        
        while (temp >= 0) {
            result = alphabet[temp % base] + result;
            temp = Math.floor(temp / base) - 1;
        }
        return result;
    }
    // ── Dictionary Attack Demo ──
    const COMMON_DEMO_WORDS = new Set([
        'password','123456','password123','admin','letmein','welcome',
        'monkey','dragon','master','qwerty','abc123','iloveyou','sunshine',
        'princess','football','shadow','superman','baseball','login','pass',
        'test','guest','user','hello','hello123','passw0rd','p@ssword',
        'password1','1234567890','12345','111111','000000','654321','qwerty123',
        'abc','root','secret','changeme','default','access','passpass',
        'trustno1','mustang','access','batman','thomas','jordan',
    ]);
    function logToConsole(message, type = '') {
        const line = document.createElement('div');
        line.className = 'console-line';
        if (type === 'success') {
            line.classList.add('success');
            line.innerHTML = `<i data-lucide="check" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> ${message}`;
        } else if (type === 'error') {
            line.classList.add('error');
            line.innerHTML = `<i data-lucide="x" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> ${message}`;
        } else if (type === 'dim') {
            line.classList.add('dim');
            line.innerText = `> ${message}`;
    dictCheckBtn?.addEventListener('click', () => {
        const word = dictInput?.value?.trim()?.toLowerCase();
        if (!word) return;
        const found = COMMON_DEMO_WORDS.has(word);
        if (!dictResult) return;
        dictResult.style.display = 'block';
        if (found) {
            dictResult.innerHTML = `
                <div style="display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1.1rem;
                     background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.3);
                     border-radius:8px; color:var(--color-red);">
                    <i data-lucide="alert-triangle" style="width:18px;height:18px;flex-shrink:0;"></i>
                    <div>
                        <strong>FOUND in dictionary!</strong>
                        <p style="font-size:0.82rem;margin-top:0.25rem;color:var(--text-secondary);">
                            "<span style="font-family:var(--font-mono);">${escHTML(dictInput.value.trim())}</span>"
                            is in the common-password list. Any attacker would crack this instantly.
                        </p>
                    </div>
                </div>`;
        } else {
            line.innerText = `  ${message}`;
            dictResult.innerHTML = `
                <div style="display:flex;align-items:center;gap:0.75rem;padding:0.85rem 1.1rem;
                     background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.3);
                     border-radius:8px; color:var(--color-green);">
                    <i data-lucide="check-circle-2" style="width:18px;height:18px;flex-shrink:0;"></i>
                    <div>
                        <strong>Not in this demo dictionary.</strong>
                        <p style="font-size:0.82rem;margin-top:0.25rem;color:var(--text-secondary);">
                            Real attackers use wordlists with millions of entries (RockYou, SecLists, etc.).
                            Always use the full Analyzer + HIBP check for a definitive result.
                        </p>
                    </div>
                </div>`;
        }
        
        simConsole.appendChild(line);
        simConsole.scrollTop = simConsole.scrollHeight;
        lucide.createIcons();
    });
    dictInput?.addEventListener('keydown', e => {
        if (e.key === 'Enter') dictCheckBtn?.click();
    });
    function escHTML(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
});
}); // end DOMContentLoaded
