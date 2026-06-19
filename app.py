import hashlib
import math
import os
import secrets
import string
import re
import urllib.request
import urllib.error
from flask import Flask, request, jsonify, render_template
app = Flask(__name__)
# ─────────────────────────────────────────────
# Load common passwords for offline dictionary check
# ─────────────────────────────────────────────
COMMON_PASSWORDS = set()
COMMON_PASSWORDS_FILE = os.path.join(app.root_path, 'static', 'common_passwords.txt')
if os.path.exists(COMMON_PASSWORDS_FILE):
    try:
        with open(COMMON_PASSWORDS_FILE, 'r', encoding='utf-8') as f:
            COMMON_PASSWORDS = {line.strip().lower() for line in f if line.strip()}
    except Exception as e:
        print(f"Error loading common_passwords.txt: {e}")
# ─────────────────────────────────────────────
# Wordlist for passphrase generation
# ─────────────────────────────────────────────
WORD_LIST = [
    "apple", "brave", "cloud", "dance", "eagle", "flame", "grape", "honey",
    "ivory", "jewel", "karma", "lemon", "magic", "noble", "ocean", "piano",
    "quest", "raven", "solar", "tiger", "ultra", "vapor", "water", "xenon",
    "yield", "zebra", "amber", "blaze", "coral", "delta", "ember", "forge",
    "glass", "haven", "index", "joker", "knack", "lance", "maple", "north",
    "onyx", "pearl", "quake", "ridge", "stone", "trace", "unity", "vivid",
    "winds", "xtend", "yacht", "zonal", "arctic", "basalt", "cipher", "dagger",
    "energy", "falcon", "glitch", "harbor", "impact", "jungle", "knight", "lunar",
    "matrix", "nebula", "oracle", "photon", "quartz", "rocket", "signal", "tunnel",
    "uplift", "vertex", "wraith", "xenith", "yellow", "zephyr", "anchor", "beacon",
    "canopy", "dreamy", "eighty", "frozen", "galley", "hustle", "ignite", "jigsaw",
    "kettle", "legend", "mirror", "nickel", "output", "pellet", "quorum", "radius",
    "sentry", "throne", "urchin", "velvet", "walrus", "xerces", "yarrow", "zircon"
]
def get_pool_size(password):
    """Calculate the character pool size for entropy computation."""
    pool = 0
    has_lower = False
    has_upper = False
    has_digit = False
    has_special = False
    
    for char in password:
        if char.islower():
            has_lower = True
        elif char.isupper():
            has_upper = True
        elif char.isdigit():
            has_digit = True
        else:
            has_special = True
            
    if has_lower:
        pool += 26
    if has_upper:
        pool += 26
    if has_digit:
        pool += 10
    if has_special:
        pool += 33 # Standard special character set size
        
    has_lower = bool(re.search(r'[a-z]', password))
    has_upper = bool(re.search(r'[A-Z]', password))
    has_digit = bool(re.search(r'[0-9]', password))
    has_special = bool(re.search(r'[^A-Za-z0-9]', password))
    if has_lower:   pool += 26
    if has_upper:   pool += 26
    if has_digit:   pool += 10
    if has_special: pool += 33
    return pool, has_lower, has_upper, has_digit, has_special
def check_pwned_api(password):
    """
    Safely check if password is leaked in Have I Been Pwned DB.
    Uses k-Anonymity (sends only first 5 chars of SHA-1 hash).
    Privacy-preserving breach check via Have I Been Pwned API.
    Uses k-Anonymity: only first 5 chars of SHA-1 hash are sent.
    """
    try:
        sha1 = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
        prefix = sha1[:5]
        suffix = sha1[5:]
        
        prefix, suffix = sha1[:5], sha1[5:]
        url = f"https://api.pwnedpasswords.com/range/{prefix}"
        req = urllib.request.Request(url, headers={'User-Agent': 'SentinelPass-Client'})
        req = urllib.request.Request(url, headers={'User-Agent': 'SentinelPass-v2'})
        with urllib.request.urlopen(req, timeout=3.0) as response:
            content = response.read().decode('utf-8')
            for line in content.splitlines():
            for line in response.read().decode('utf-8').splitlines():
                parts = line.split(':')
                if parts[0] == suffix:
                    return int(parts[1]) # Return leak count
                    return int(parts[1])
        return 0
    except Exception as e:
        print(f"HIBP API check error: {e}")
        return -1 # Return -1 to represent API connection error or timeout
        print(f"HIBP API error: {e}")
        return -1
def format_crack_time(seconds):
    """Convert seconds to a human-readable time string."""
    if seconds < 1:
        return "Instantly"
    
    intervals = [
        ('centuries', 60 * 60 * 24 * 365.25 * 100),
        ('years', 60 * 60 * 24 * 365.25),
        ('months', 60 * 60 * 24 * 30),
        ('days', 60 * 60 * 24),
        ('hours', 60 * 60),
        ('minutes', 60),
        ('seconds', 1)
        ('years',     60 * 60 * 24 * 365.25),
        ('months',    60 * 60 * 24 * 30),
        ('days',      60 * 60 * 24),
        ('hours',     60 * 60),
        ('minutes',   60),
        ('seconds',   1),
    ]
    
    for name, count in intervals:
        value = seconds / count
        if value >= 1:
            value = int(round(value))
            if value == 1:
                # Singular
                return f"1 {name[:-1]}"
            return f"{value:,} {name}"
            return f"1 {name[:-1]}" if value == 1 else f"{value:,} {name}"
    return "Instantly"
def get_char_distribution(password):
    """Return counts of each character category for chart display."""
    return {
        "uppercase": sum(1 for c in password if c.isupper()),
        "lowercase": sum(1 for c in password if c.islower()),
        "digits":    sum(1 for c in password if c.isdigit()),
        "special":   sum(1 for c in password if not c.isalnum()),
    }
def analyze_password(password):
    """Core password analysis engine."""
    if not password:
        return {
            "error": "Password cannot be empty"
        }
        
        return {"error": "Password cannot be empty"}
    length = len(password)
    pool_size, has_lower, has_upper, has_digit, has_special = get_pool_size(password)
    
    # Calculate Shannon Entropy: H = L * log2(R)
    entropy = 0
    if pool_size > 0:
        entropy = length * math.log2(pool_size)
        
    # Offline dictionary check
    is_common = password.lower() in COMMON_PASSWORDS
    
    # Check if password contains very common substrings or simple repetitions
    # Shannon Entropy: H = L * log2(R)
    entropy = length * math.log2(pool_size) if pool_size > 0 else 0
    # Offline checks
    is_common   = password.lower() in COMMON_PASSWORDS
    is_repeated = len(set(password)) <= 2 and length > 3
    is_sequential = password.lower() in "abcdefghijklmnopqrstuvwxyz1234567890qwertyuiopasdfghjklzxcvbnm"
    
    # Check Have I Been Pwned (HIBP)
    is_sequential = any(
        seq in password.lower()
        for seq in ["123456", "abcdef", "qwerty", "password", "111111", "000000"]
    )
    # Breach check (HIBP with k-Anonymity)
    pwned_count = check_pwned_api(password)
    
    # Crack time estimation
    # Hashing speeds (guesses per second):
    # 1. Throttled online login: 100 guesses/sec
    # 2. Offline attack on simple hash (MD5/SHA1 fast brute-force): 10 billion (10^10) guesses/sec
    # 3. Supercomputer/GPU Rig (e.g. Hashcat cluster): 100 trillion (10^14) guesses/sec
    
    total_guesses = 2 ** entropy if entropy > 0 else 0
    # Average guesses needed is half of total search space
    avg_guesses = total_guesses / 2 if total_guesses > 0 else 0
    
    avg_guesses   = total_guesses / 2 if total_guesses > 0 else 0
    crack_times = {
        "online_throttled": format_crack_time(avg_guesses / 100) if avg_guesses > 0 else "Instantly",
        "offline_fast_hash": format_crack_time(avg_guesses / 10000000000) if avg_guesses > 0 else "Instantly",
        "supercomputer": format_crack_time(avg_guesses / 100000000000000) if avg_guesses > 0 else "Instantly"
        "online_throttled": format_crack_time(avg_guesses / 100)          if avg_guesses > 0 else "Instantly",
        "offline_fast_hash": format_crack_time(avg_guesses / 10_000_000_000) if avg_guesses > 0 else "Instantly",
        "supercomputer":     format_crack_time(avg_guesses / 100_000_000_000_000) if avg_guesses > 0 else "Instantly",
    }
    
    # Deduce a rating score (0 to 4 scale, commonly used for password strength meters)
    # 0 = Very Weak, 1 = Weak, 2 = Medium, 3 = Strong, 4 = Very Strong
    # Strength score (0-4)
    score = 0
    if length >= 8:
        score += 1
    if length >= 12:
        score += 1
    if pool_size >= 50: # Has at least 3 character sets (e.g., lower + upper + digit = 62)
        score += 1
    if entropy >= 60: # 60+ bits is considered robust
        score += 1
        
    # Penalties for known weaknesses
    if is_common or is_repeated or (pwned_count > 0):
        score = min(score, 1) # Cap score at 1 (Weak) if it's leaked or standard common
        
    if length >= 8:    score += 1
    if length >= 12:   score += 1
    if pool_size >= 50: score += 1
    if entropy >= 60:  score += 1
    if is_common or is_repeated or pwned_count > 0:
        score = min(score, 1)
    rating_labels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"]
    rating = rating_labels[score] if score < len(rating_labels) else "Very Strong"
    
    # Construct suggestions list
    rating = rating_labels[min(score, 4)]
    # Suggestions
    suggestions = []
    if length < 12:
        suggestions.append("Increase password length to at least 12-16 characters.")
    if not has_lower:
        suggestions.append("Add lowercase letters.")
    if not has_upper:
        suggestions.append("Add uppercase letters.")
    if not has_digit:
        suggestions.append("Add numerical digits.")
    if not has_special:
        suggestions.append("Add special characters (e.g., !, @, #, $, etc.).")
    if is_common:
        suggestions.append("This is a highly common password. Choose something unique.")
    if length < 12:     suggestions.append("Increase password length to at least 12–16 characters.")
    if not has_lower:   suggestions.append("Add lowercase letters (a–z).")
    if not has_upper:   suggestions.append("Add uppercase letters (A–Z).")
    if not has_digit:   suggestions.append("Add numerical digits (0–9).")
    if not has_special: suggestions.append("Add special characters (e.g. !, @, #, $).")
    if is_common:       suggestions.append("This is a highly common password. Choose something unique.")
    if is_sequential:   suggestions.append("Avoid sequential patterns like '123456' or 'qwerty'.")
    if pwned_count > 0:
        suggestions.append(f"WARNING: This password was found in a breach database {pwned_count:,} times. Never reuse this password!")
        suggestions.append(f"⚠ BREACH ALERT: This password appeared {pwned_count:,} times in known data breaches!")
    elif pwned_count == -1:
        suggestions.append("Could not check data breaches (offline mode/connection issue).")
        
        suggestions.append("Breach check unavailable (offline/network issue). Results may be incomplete.")
    return {
        "length": length,
        "entropy": round(entropy, 2),
        "pool_size": pool_size,
        "is_common": is_common,
        "pwned_count": pwned_count,
        "score": score,
        "rating": rating,
        "crack_times": crack_times,
        "suggestions": suggestions,
        "length":       length,
        "entropy":      round(entropy, 2),
        "pool_size":    pool_size,
        "is_common":    is_common,
        "pwned_count":  pwned_count,
        "score":        score,
        "rating":       rating,
        "crack_times":  crack_times,
        "suggestions":  suggestions,
        "distribution": get_char_distribution(password),
        "checks": {
            "has_lower": has_lower,
            "has_upper": has_upper,
            "has_digit": has_digit,
            "has_special": has_special
            "has_lower":   has_lower,
            "has_upper":   has_upper,
            "has_digit":   has_digit,
            "has_special": has_special,
            "length_ok":   length >= 12,
        }
    }
# ─────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')
def education():
    return render_template('education.html')
@app.route('/about')
def about():
    return render_template('about.html')
# ─────────────────────────────────────────────
# API Endpoints
# ─────────────────────────────────────────────
@app.route('/api/analyze', methods=['POST'])
def api_analyze():
    data = request.get_json() or {}
    password = data.get('password', '')
    analysis = analyze_password(password)
    return jsonify(analysis)
    return jsonify(analyze_password(password))
@app.route('/api/generate', methods=['POST'])
def api_generate():
    """Server-side cryptographically secure password generator (CSPRNG)."""
    data = request.get_json() or {}
    mode = data.get('mode', 'password')
    if mode == 'passphrase':
        word_count = max(3, min(int(data.get('words', 4)), 12))
        separator  = data.get('separator', '-')
        words = [secrets.choice(WORD_LIST) for _ in range(word_count)]
        result = separator.join(words)
    else:
        length = max(8, min(int(data.get('length', 16)), 128))
        charset = ''
        if data.get('upper', True):   charset += string.ascii_uppercase
        if data.get('lower', True):   charset += string.ascii_lowercase
        if data.get('digits', True):  charset += string.digits
        if data.get('symbols', True): charset += string.punctuation
        if not charset:
            charset = string.ascii_letters + string.digits
        # Guarantee at least one of each requested type
        result_chars = []
        if data.get('upper', True):   result_chars.append(secrets.choice(string.ascii_uppercase))
        if data.get('lower', True):   result_chars.append(secrets.choice(string.ascii_lowercase))
        if data.get('digits', True):  result_chars.append(secrets.choice(string.digits))
        if data.get('symbols', True): result_chars.append(secrets.choice(string.punctuation))
        remaining = length - len(result_chars)
        result_chars += [secrets.choice(charset) for _ in range(remaining)]
        secrets.SystemRandom().shuffle(result_chars)
        result = ''.join(result_chars)
    return jsonify({"password": result})
if __name__ == '__main__':
    app.run(debug=True, port=5000)
