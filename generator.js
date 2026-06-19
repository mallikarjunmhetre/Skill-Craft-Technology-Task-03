/* ═══════════════════════════════════════════════
   generator.js — Secure Password Generator Logic
   SentinelPass v2.0
═══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabPassword = document.getElementById('tab-password');
    const tabPassphrase = document.getElementById('tab-passphrase');
    const panelPassword = document.getElementById('panel-password');
    const panelPassphrase = document.getElementById('panel-passphrase');
    
    // Output & Action Buttons
    const generatedOutput = document.getElementById('generated-output');
    const copyBtn = document.getElementById('copy-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    
    // Strength meter
    const genStrengthBar = document.getElementById('gen-strength-bar');
    const genStrengthText = document.getElementById('gen-strength-text');
    
    // Random Password Controls
    const lengthSlider = document.getElementById('length-slider');
    const lengthVal = document.getElementById('length-val');
    const charUpper = document.getElementById('char-upper');
    const charLower = document.getElementById('char-lower');
    const charNumbers = document.getElementById('char-numbers');
    const charSymbols = document.getElementById('char-symbols');
    
    // Passphrase Controls
    const wordsSlider = document.getElementById('words-slider');
    const wordsVal = document.getElementById('words-val');
    // Word library for passphrases
    const WORD_LIST = [
        'apple', 'banana', 'cherry', 'silver', 'golden', 'shadow', 'wizard', 'forest', 'ocean', 'summer', 
        'winter', 'spring', 'autumn', 'breeze', 'crypto', 'secure', 'anchor', 'castle', 'dragon', 'rocket', 
        'falcon', 'galaxy', 'planet', 'starlight', 'matrix', 'circuit', 'quantum', 'cipher', 'tunnel', 'beacon', 
        'canyon', 'valley', 'meadow', 'summit', 'timber', 'glacier', 'island', 'harbor', 'voyage', 'sailor', 
        'compass', 'feather', 'shield', 'helmet', 'sword', 'hammer', 'lantern', 'candle', 'ledger', 'journal', 
        'pencil', 'canvas', 'marble', 'granite', 'pebble', 'copper', 'bronze', 'cobalt', 'carbon', 'oxygen', 
        'helium', 'vertex', 'vector', 'tensor', 'binary', 'octal', 'pixel', 'sprite', 'avatar', 'nebula', 
        'cosmos', 'comet', 'meteor', 'aurora', 'eclipse', 'solstice', 'equinox', 'whisper', 'thunder', 'lightning', 
        'monsoon', 'cyclone', 'typhoon', 'tornado', 'blizzard', 'volcano', 'geyser', 'boulder', 'fossil', 'amber', 
        'crystal', 'diamond', 'emerald', 'sapphire', 'ruby', 'topaz', 'quartz', 'jasper', 'garnet', 'amethyst', 
        'obsidian', 'basalt', 'pumice', 'gypsum', 'calcite', 'halite', 'pyrite', 'magnet', 'gravity', 'velocity', 
        'momentum', 'inertia', 'friction', 'tension', 'torque', 'energy', 'entropy', 'frequency', 'resonance', 'spectrum', 
        'prism', 'lens', 'mirror', 'laser', 'photon', 'electron', 'proton', 'neutron', 'nucleus', 'atom', 
        'molecule', 'polymer', 'protein', 'enzyme', 'hormone', 'neuron', 'synapse', 'cortex', 'strand', 'spiral', 
        'helix', 'sphere', 'cylinder', 'pyramid', 'cube', 'cone', 'torus', 'phoenix', 'horizon', 'mirage'
    // ── DOM References ──
    const tabPassword    = document.getElementById('tab-password');
    const tabPassphrase  = document.getElementById('tab-passphrase');
    const panelPassword  = document.getElementById('panel-password');
    const panelPassphrase= document.getElementById('panel-passphrase');
    const genOutput      = document.getElementById('generated-output');
    const copyBtn        = document.getElementById('copy-btn');
    const regenBtn       = document.getElementById('regenerate-btn');
    const generateBtn    = document.getElementById('generate-btn');
    const lengthSlider   = document.getElementById('length-slider');
    const lengthVal      = document.getElementById('length-val');
    const wordsSlider    = document.getElementById('words-slider');
    const wordsVal       = document.getElementById('words-val');
    const clearHistoryBtn= document.getElementById('clear-history-btn');
    const historyList    = document.getElementById('history-list');
    const genStrengthText= document.getElementById('gen-strength-text');
    const genSegments    = [0,1,2,3,4].map(i => document.getElementById(`gsen-${i}`));
    const STRENGTH_COLORS = [
        'var(--strength-0)', 'var(--strength-1)', 'var(--strength-2)',
        'var(--strength-3)', 'var(--strength-4)'
    ];
    const STRENGTH_LABELS = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'];
    let currentMode = 'password'; // 'password' or 'passphrase'
    let currentMode = 'password';
    let passwordHistory = [];
    // Tab Event Listeners
    tabPassword.addEventListener('click', () => {
        currentMode = 'password';
        tabPassword.classList.add('active');
        tabPassphrase.classList.remove('active');
        panelPassword.style.display = 'block';
        panelPassphrase.style.display = 'none';
        generate();
    });
    // ── Tab switching ──
    tabPassword?.addEventListener('click', () => switchTab('password'));
    tabPassphrase?.addEventListener('click', () => switchTab('passphrase'));
    tabPassphrase.addEventListener('click', () => {
        currentMode = 'passphrase';
        tabPassphrase.classList.add('active');
        tabPassword.classList.remove('active');
        panelPassword.style.display = 'none';
        panelPassphrase.style.display = 'block';
        generate();
    });
    function switchTab(mode) {
        currentMode = mode;
        if (mode === 'password') {
            tabPassword.classList.add('active');
            tabPassphrase.classList.remove('active');
            panelPassword.style.display = 'block';
            panelPassphrase.style.display = 'none';
        } else {
            tabPassphrase.classList.add('active');
            tabPassword.classList.remove('active');
            panelPassphrase.style.display = 'block';
            panelPassword.style.display = 'none';
        }
    }
    // Control slider updates
    lengthSlider.addEventListener('input', () => {
        lengthVal.innerText = lengthSlider.value;
        generate();
    // ── Slider labels ──
    lengthSlider?.addEventListener('input', () => {
        if (lengthVal) lengthVal.textContent = lengthSlider.value;
        updateSliderTrack(lengthSlider);
    });
    wordsSlider.addEventListener('input', () => {
        wordsVal.innerText = wordsSlider.value;
        generate();
    wordsSlider?.addEventListener('input', () => {
        if (wordsVal) wordsVal.textContent = wordsSlider.value;
        updateSliderTrack(wordsSlider);
    });
    // Option checkbox updates
    [charUpper, charLower, charNumbers, charSymbols].forEach(cb => {
        cb.addEventListener('change', () => {
            // Guarantee at least one checkbox is checked
            if (!charUpper.checked && !charLower.checked && !charNumbers.checked && !charSymbols.checked) {
                cb.checked = true;
            }
            generate();
        });
    });
    function updateSliderTrack(slider) {
        const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, var(--color-cyan) ${pct}%, rgba(255,255,255,0.1) ${pct}%)`;
    }
    // Init slider tracks
    if (lengthSlider) updateSliderTrack(lengthSlider);
    if (wordsSlider)  updateSliderTrack(wordsSlider);
    // Separator selection updates
    document.querySelectorAll('input[name="separator"]').forEach(radio => {
        radio.addEventListener('change', generate);
    });
    // ── Generate on button clicks ──
    generateBtn?.addEventListener('click', generate);
    regenBtn?.addEventListener('click', generate);
    // Actions
    regenerateBtn.addEventListener('click', generate);
    
    copyBtn.addEventListener('click', () => {
        const textToCopy = generatedOutput.innerText;
        if (textToCopy === 'Awaiting generation...' || textToCopy === '') return;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Toggle copy icon to visual success checkmark
            const icon = copyBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'check');
            copyBtn.style.borderColor = 'var(--strength-4)';
            copyBtn.style.color = 'var(--strength-4)';
            lucide.createIcons();
            
            setTimeout(() => {
                icon.setAttribute('data-lucide', 'copy');
                copyBtn.style.borderColor = '';
                copyBtn.style.color = '';
                lucide.createIcons();
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
    // Initial load generation
    // ── Auto-generate on load ──
    generate();
    // Core Generation Router
    function generate() {
    async function generate() {
        // Spin the regen icon
        const regenIcon = regenBtn?.querySelector('i');
        if (regenIcon) {
            regenIcon.style.transition = 'transform 0.5s ease';
            regenIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => { regenIcon.style.transform = ''; }, 500);
        }
        let payload = { mode: currentMode };
        if (currentMode === 'password') {
            generateRandomPassword();
            payload.length  = parseInt(lengthSlider?.value ?? 16);
            payload.upper   = document.getElementById('char-upper')?.checked   ?? true;
            payload.lower   = document.getElementById('char-lower')?.checked   ?? true;
            payload.digits  = document.getElementById('char-numbers')?.checked ?? true;
            payload.symbols = document.getElementById('char-symbols')?.checked ?? true;
            // Must have at least one charset
            if (!payload.upper && !payload.lower && !payload.digits && !payload.symbols) {
                payload.lower = true;
                const lowerCheck = document.getElementById('char-lower');
                if (lowerCheck) lowerCheck.checked = true;
            }
        } else {
            generatePassphrase();
            payload.words = parseInt(wordsSlider?.value ?? 4);
            const sepEl = document.querySelector('input[name="separator"]:checked');
            payload.separator = sepEl ? sepEl.value : '-';
        }
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            displayGenerated(data.password);
        } catch (err) {
            // Client-side CSPRNG fallback using crypto.getRandomValues
            const pw = clientGenerate(payload);
            displayGenerated(pw);
        }
    }
    // CSPRNG Random Character Password Generator
    function generateRandomPassword() {
        const len = parseInt(lengthSlider.value);
        
        const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lower = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    function displayGenerated(password) {
        if (!password || !genOutput) return;
        genOutput.textContent = password;
        genOutput.classList.add('generated');
        let characterPool = '';
        let guaranteedChars = [];
        addToHistory(password);
        assessGeneratedStrength(password);
    }
        if (charUpper.checked) {
            characterPool += upper;
            guaranteedChars.push(getRandomCharFromString(upper));
    // ── Client-side CSPRNG fallback ──
    function clientGenerate(payload) {
        if (payload.mode === 'passphrase') {
            const words = [
                'apple','brave','cloud','delta','eagle','forge','grape','haven',
                'ivory','joker','karma','lunar','magic','noble','ocean','pearl',
                'quest','raven','solar','tiger','ultra','vivid','water','xenon',
                'yield','zebra','amber','blaze','coral','ember','flame','glitch',
                'harbor','impact','jungle','knight','lance','maple','nebula','onyx',
                'photon','quartz','rocket','signal','tunnel','uplift','vertex','wraith'
            ];
            const sep = payload.separator ?? '-';
            const count = payload.words ?? 4;
            const selected = [];
            const arr = new Uint32Array(count);
            crypto.getRandomValues(arr);
            arr.forEach(n => selected.push(words[n % words.length]));
            return selected.join(sep);
        }
        if (charLower.checked) {
            characterPool += lower;
            guaranteedChars.push(getRandomCharFromString(lower));
        }
        if (charNumbers.checked) {
            characterPool += numbers;
            guaranteedChars.push(getRandomCharFromString(numbers));
        }
        if (charSymbols.checked) {
            characterPool += symbols;
            guaranteedChars.push(getRandomCharFromString(symbols));
        }
        // Fill remaining spaces from total selection pool
        const remainingLength = len - guaranteedChars.length;
        let passwordArray = [...guaranteedChars];
        let chars = '';
        if (payload.upper)   chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (payload.lower)   chars += 'abcdefghijklmnopqrstuvwxyz';
        if (payload.digits)  chars += '0123456789';
        if (payload.symbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';
        if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < remainingLength; i++) {
            passwordArray.push(getRandomCharFromString(characterPool));
        }
        // Shuffle the array to ensure the guaranteed characters aren't predictable at the start
        passwordArray = shuffleArray(passwordArray);
        const password = passwordArray.join('');
        
        generatedOutput.innerText = password;
        evaluateStrength(password, len, characterPool.length);
        const len = payload.length ?? 16;
        const arr = new Uint32Array(len);
        crypto.getRandomValues(arr);
        return Array.from(arr, n => chars[n % chars.length]).join('');
    }
    // CSPRNG Memorable Passphrase Generator
    function generatePassphrase() {
        const numWords = parseInt(wordsSlider.value);
        const separator = document.querySelector('input[name="separator"]:checked').value;
        const chosenWords = [];
    // ── Strength meter for generated password ──
    function assessGeneratedStrength(password) {
        const len = password.length;
        const hasUpper   = /[A-Z]/.test(password);
        const hasLower   = /[a-z]/.test(password);
        const hasNum     = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);
        // Select W words from standard list using crypto random values
        const randomValues = new Uint32Array(numWords);
        window.crypto.getRandomValues(randomValues);
        let pool = 0;
        if (hasUpper)   pool += 26;
        if (hasLower)   pool += 26;
        if (hasNum)     pool += 10;
        if (hasSpecial) pool += 33;
        for (let i = 0; i < numWords; i++) {
            const index = randomValues[i] % WORD_LIST.length;
            let word = WORD_LIST[index];
            
            // Add casing variation (e.g. capitalizing first letter to improve entropy slightly)
            if (i % 2 === 0) {
                word = word.charAt(0).toUpperCase() + word.slice(1);
        const entropy = pool > 0 ? len * Math.log2(pool) : 0;
        let score = 0;
        if (len >= 8)    score++;
        if (len >= 12)   score++;
        if (pool >= 50)  score++;
        if (entropy >= 60) score++;
        score = Math.min(score, 4);
        const color = STRENGTH_COLORS[score];
        genSegments.forEach((seg, i) => {
            if (!seg) return;
            if (i <= score) {
                seg.style.backgroundColor = color;
                seg.style.boxShadow = `0 0 6px ${color}`;
            } else {
                seg.style.backgroundColor = 'rgba(255,255,255,0.07)';
                seg.style.boxShadow = 'none';
            }
            chosenWords.push(word);
        });
        if (genStrengthText) {
            genStrengthText.textContent = STRENGTH_LABELS[score];
            genStrengthText.style.color = color;
        }
    }
        const passphrase = chosenWords.join(separator);
        generatedOutput.innerText = passphrase;
    // ── Copy to clipboard ──
    copyBtn?.addEventListener('click', () => {
        const text = genOutput?.textContent?.trim();
        if (!text || text === 'Click Generate…') return;
        navigator.clipboard.writeText(text).then(() => {
            showToast('Password copied!');
            // Visual feedback on button
            const icon = copyBtn.querySelector('i');
            icon?.setAttribute('data-lucide', 'check');
            lucide.createIcons();
            setTimeout(() => {
                icon?.setAttribute('data-lucide', 'copy');
                lucide.createIcons();
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Password copied!');
        });
    });
        // Entropy pool: size of word list = ~150.
        // E = W * log2(150) = W * 7.23 bits
        // Plus basic pool representation
        evaluateStrength(passphrase, passphrase.length, 150);
    // ── Password History ──
    function addToHistory(password) {
        passwordHistory.unshift(password);
        if (passwordHistory.length > 5) passwordHistory.pop();
        renderHistory();
    }
    // Helper: secure character picker
    function getRandomCharFromString(str) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        return str.charAt(array[0] % str.length);
    function renderHistory() {
        if (!historyList) return;
        if (passwordHistory.length === 0) {
            historyList.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem;text-align:center;padding:1rem 0;">No history yet.</p>';
            return;
        }
        historyList.innerHTML = '';
        passwordHistory.forEach((pw, idx) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <span class="history-pass">${escapeHTML(pw)}</span>
                <button class="history-copy" title="Copy" aria-label="Copy password ${idx + 1}">
                    <i data-lucide="copy"></i>
                </button>`;
            item.querySelector('.history-copy').addEventListener('click', () => {
                navigator.clipboard.writeText(pw).then(() => showToast('Copied from history!'));
            });
            historyList.appendChild(item);
        });
        lucide.createIcons();
    }
    // Helper: Fisher-Yates cryptographically secure shuffle
    function shuffleArray(array) {
        const temp = [...array];
        const randoms = new Uint32Array(temp.length);
        window.crypto.getRandomValues(randoms);
        
        for (let i = temp.length - 1; i > 0; i--) {
            const j = randoms[i] % (i + 1);
            [temp[i], temp[j]] = [temp[j], temp[i]];
        }
        return temp;
    clearHistoryBtn?.addEventListener('click', () => {
        passwordHistory = [];
        renderHistory();
    });
    // ── Helpers ──
    function escapeHTML(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }
    // Instant client side strength updates
    function evaluateStrength(text, length, poolSize) {
        const entropy = length * Math.log2(poolSize);
        
        let score = 0;
        if (length >= 8) score++;
        if (length >= 12) score++;
        if (entropy >= 55) score++;
        if (entropy >= 75) score++;
}); // end DOMContentLoaded
        const scores = [
            { width: '20%', color: 'var(--strength-0)', label: 'Weak' },
            { width: '45%', color: 'var(--strength-1)', label: 'Fair' },
            { width: '65%', color: 'var(--strength-2)', label: 'Good' },
            { width: '85%', color: 'var(--strength-3)', label: 'Strong' },
            { width: '100%', color: 'var(--strength-4)', label: 'Unbreakable' }
        ];
        const evaluation = scores[score];
        genStrengthBar.style.width = evaluation.width;
        genStrengthBar.style.backgroundColor = evaluation.color;
        genStrengthText.innerText = `${evaluation.label} (~${Math.round(entropy)} bits entropy)`;
        genStrengthText.style.color = evaluation.color;
    }
});
