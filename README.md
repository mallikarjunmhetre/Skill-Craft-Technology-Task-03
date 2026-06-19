# Skill-Craft-Technology-Task-03
Skill Craft Technology Cyber Security Internship Projects.
# SentinelPass - Advanced Password Security Suite
# 🛡️ SentinelPass — Advanced Password Security Suite
SentinelPass is a multi-page, responsive web application built to audit credential security, generate cryptographically random credentials, and simulate common password-cracking algorithms in real-time. It is built using a Python Flask backend and a modern glassmorphic frontend utilizing HTML, Vanilla CSS, and JavaScript.
<div align="center">
## 🚀 Key Features
![SentinelPass Banner](https://img.shields.io/badge/SentinelPass-v2.0-06b6d4?style=for-the-badge&logo=shield&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
*   **Real-time Complexity Analysis:** Evaluates character classes (casing, digits, symbols) and lengths instantly on keystrokes.
*   **Shannon Entropy Calculation:** Computes mathematical entropy bits ($H = L \log_2(R)$) to estimate search-space sizes.
*   **Breach Database Integrity Checker:** Queries the *Have I Been Pwned* API securely using **k-Anonymity** (transmitting only the first 5 characters of the SHA-1 hash to preserve privacy).
*   **Offline Dictionary Check:** Instantly screens credentials against a local dictionary of common compromised passwords.
*   **Time-to-Crack Estimates:** Approximates crack durations across distinct threat profiles: throttled online logins, fast local hashing, and supercomputer/GPU clusters.
*   **Secure Password & Passphrase Generator:** Generates high-entropy random keys (via `window.crypto.getRandomValues`) or memorable passphrases with custom sliders.
*   **Interactive Brute-Force Simulator:** Visually demonstrates sequential brute-force attempts on passwords, illustrating exponential complexity bounds.
*   **Educational Knowledge Base:** Interactive guides covering attacks (Brute Force, Dictionary, Credential Stuffing) and defenses (Hashing, Salting, MFA).
**A multi-page, cybersecurity-focused web application for assessing, generating, and learning about password security.**
[🔍 Analyzer](#-password-analyzer) · [⚡ Generator](#-password-generator) · [🎓 Learn](#-learning-center) · [🛠 Tech Stack](#-technology-stack) · [🚀 Quick Start](#-quick-start)
</div>
---
## 📁 Project Structure
## 📸 Overview
```text
SentinelPass is a full-stack password security suite built with Python/Flask on the backend and pure HTML, CSS, and JavaScript on the frontend. It features:
- **Real-time** Shannon entropy analysis
- **Privacy-first** breach checking using [Have I Been Pwned](https://haveibeenpwned.com/) k-Anonymity
- **Cryptographically secure** password generation via Python's `secrets` module (CSPRNG)
- **Interactive** brute-force attack simulator
- **5-page** responsive dark UI with glassmorphism design and canvas particle animation
---
## ✨ Key Features
|
 Feature 
|
 Description 
|
|
---
|
---
|
|
 🔐 
**
Password Analyzer
**
|
 Real-time strength scoring, entropy bits, crack time estimation 
|
|
 🌐 
**
Breach Check (HIBP)
**
|
 k-Anonymity protocol — password never sent in full 
|
|
 📊 
**
Character Distribution
**
|
 Visual bar chart of uppercase/lowercase/digits/special chars 
|
|
 ⚡ 
**
CSPRNG Generator
**
|
 Server-side 
`secrets`
 module — truly random, not 
`Math.random()`
|
|
 📝 
**
Passphrase Generator
**
|
 Random word combinations with custom separators 
|
|
 🕐 
**
Crack Time Estimation
**
|
 Online (100/s), Offline hash (10B/s), Supercomputer (100T/s) 
|
|
 🖥️ 
**
Brute-Force Simulator
**
|
 Live console showing attack attempts with real-time stats 
|
|
 📖 
**
Dictionary Attack Demo
**
|
 Tests passwords against a common-password dictionary 
|
|
 🎓 
**
Knowledge Base
**
|
 7-topic interactive accordion covering all major attack types 
|
|
 📋 
**
Generation History
**
|
 Session-based history of the last 5 generated passwords 
|
|
 🎨 
**
Particle Background
**
|
 Canvas-animated network of floating nodes (CPU-optimised) 
|
|
 📱 
**
Fully Responsive
**
|
 Mobile-first design, works on all screen sizes 
|
---
## 🗂️ Project Structure
```
password-strength-checker/
│
├── app.py                  # Flask Web Server & REST API endpoints
├── requirements.txt        # Python dependency manifest
├── README.md               # GitHub documentation
├── app.py                    # Flask backend — routing, analysis engine, REST API
├── requirements.txt          # Python dependencies (only Flask needed)
├── README.md                 # This file
│
├── static/
│   ├── css/
│   │   └── style.css       # Core styling & glassmorphic layout CSS
│   │   └── style.css         # Complete design system (1500+ lines)
│   ├── js/
│   │   ├── analyzer.js     # Live input validation & API caller JS
│   │   ├── generator.js    # CSPRNG password/passphrase generator JS
│   │   └── simulator.js    # Interactive brute-force loop & accordion toggler JS
│   └── common_passwords.txt # Local lookup dictionary of weak passwords
│   │   ├── analyzer.js       # Strength analysis UI + gauge + distribution chart
│   │   ├── generator.js      # Password/passphrase generator + history
│   │   ├── simulator.js      # Brute-force simulator + dictionary demo + accordion
│   │   └── particles.js      # Canvas particle network animation
│   └── common_passwords.txt  # Offline dictionary for instant common-password check
│
└── templates/
    ├── base.html           # Shared layout layout structure
    ├── index.html          # Main hub / Dashboard page
    ├── analyzer.html       # Password strength analyzer interface
    ├── generator.html      # Password generator interface
    └── education.html      # Cyber learning center & attack simulator
    ├── base.html             # Shared nav, footer, particle canvas, toast, SEO meta
    ├── index.html            # Dashboard — feature cards + quick test widget
    ├── analyzer.html         # Full strength analyzer (5 pages total)
    ├── generator.html        # Secure password/passphrase generator
    ├── education.html        # Attack simulator + 7-topic knowledge base
    └── about.html            # Tech stack, project structure, setup guide
```
---
## 🛠️ Tools & Technologies Used
## 🚀 Quick Start
*   **Backend:** Python 3.13+, Flask 3.0 (Web Framework), Requests (HTTP client library).
*   **Frontend:** Vanilla HTML5, Modern CSS3 (CSS Variables, Flexbox, Grids, Transitions, Keyframe Animations), Vanilla JavaScript (ES6, Fetch API, CSPRNG Web Cryptography API).
*   **Icons & Fonts:** Lucide Icons (CDN), Google Fonts (Outfit & Fira Code).
*   **API Integrations:** Have I Been Pwned (HIBP) Range API for credential breach checks.
### Prerequisites
- Python 3.11 or higher
- pip
### Installation
```bash
# 1. Clone the repository
git clone https://github.com/yourusername/password-strength-checker.git
cd password-strength-checker
# 2. Create and activate a virtual environment
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
# 3. Install dependencies
pip install -r requirements.txt
# 4. Run the application
python app.py
```
### Open in Browser
Navigate to: **http://localhost:5000**
---
## 🛡️ Cybersecurity Considerations
## 📄 Pages
### k-Anonymity Privacy
To keep passwords private during leak checks:
1. The client-side password is encrypted locally via SHA-1: `sha1(password)`.
2. Only the first **5 hex characters** of the hash are transmitted to the server and forwarded to HIBP.
3. The API returns a list of suffix matches. The client/server compares the remaining suffix bytes locally. The cleartext password **never** traverses the network.
### 🏠 Dashboard (`/`)
- Welcome hero with animated particle background
- 4 feature cards (Analyzer, Generator, Simulator, About)
- **Quick Test widget** — type any password for an instant live score
- Security statistics row (81% breach stat, k-Anonymity, CSPRNG)
### Shannon Entropy Equation
Entropy quantifies password strength in bits:
$$H = L \log_2(R)$$
Where:
*   $L$ is the length of the password.
*   $R$ is the size of the character alphabet pool (determined by combination presence of lowercase, uppercase, digits, and special glyphs).
### 🔍 Password Analyzer (`/analyzer`)
- Live password input with show/hide toggle
- **Segmented 5-level strength bar** (Very Weak → Very Strong)
- **Shannon Entropy gauge** (SVG circular chart, animated fill)
- 5-item criteria checklist (length, upper, lower, digit, special)
- **Character distribution bar chart** (uppercase/lowercase/digit/special)
- **Breach database check** — HIBP API with k-Anonymity
- **Crack time table** — 3 attack scenarios with colour-coded severity
- Character pool size widget
- Actionable improvement suggestions
### ⚡ Password Generator (`/generator`)
- Tabbed: **Random Password** | **Memorable Passphrase**
- Server-side generation via Python `secrets` module
- Client-side `crypto.getRandomValues()` fallback
- Length slider (8–64 characters), character set toggles
- Word count slider (3–10 words), separator selector
- Live strength meter for generated password
- **Session-based history** — last 5 generated passwords with copy buttons
- One-click clipboard copy with visual feedback
### 🎓 Learning Center (`/education`)
- **Live Brute-Force Simulator** — async JavaScript loop with real console output
  - Real-time attempts counter, elapsed time, current guess
  - Configurable target (max 5 chars for demo speed)
  - Stop button to cancel mid-attack
  - Search space size calculation displayed
- **Dictionary Attack Demo** — instant common-password lookup
- **7-topic Knowledge Base** (expandable accordion):
  1. Brute Force Attack
  2. Dictionary Attack
  3. Rainbow Table Attack
  4. Hashing & Salting
  5. Credential Stuffing
  6. Multi-Factor Authentication (MFA)
  7. Zero-Trust Security
### ℹ️ About / Tools (`/about`)
- Full technology stack grid with icons
- Project file tree diagram
- 12 key features list
- 12 cybersecurity concepts covered
- GitHub & reference links
- Step-by-step local setup guide (timeline layout)
---
## ⚙️ Installation & Local Setup
## 🔒 Cybersecurity Concepts Implemented
### Prerequisites
Make sure Python 3.x and `pip` are installed on your machine.
|
 Concept 
|
 Implementation 
|
|
---
|
---
|
|
**
Shannon Entropy
**
|
`H = L × log₂(R)`
 — length × log₂(character pool size) 
|
|
**
k-Anonymity
**
|
 Only first 5 chars of SHA-1 hash sent to HIBP API 
|
|
**
CSPRNG
**
|
 Python 
`secrets.choice()`
 draws from OS entropy pool 
|
|
**
Brute Force
**
|
 Simulated via JavaScript generator, async batched 
|
|
**
Dictionary Attack
**
|
 Offline check against 
`common_passwords.txt`
|
|
**
Crack Time Models
**
|
 Online (100/s), GPU hash (10B/s), Supercomputer (100T/s) 
|
|
**
Hashing
**
|
 SHA-1 used only for breach lookup (never for storage) 
|
|
**
Zero-Trust
**
|
 Password never stored or logged server-side 
|
### 1. Clone the repository / Copy files
Navigate to the directory containing the project:
```bash
cd password-strength-checker
---
## 🛠️ Technology Stack
### Backend
|
 Tool 
|
 Purpose 
|
|
---
|
---
|
|
**
Python 3.11+
**
|
 Core language 
|
|
**
Flask 3.x
**
|
 Web framework, routing, Jinja2 templating 
|
|
**
secrets
**
|
 Cryptographically secure random generation (CSPRNG) 
|
|
**
hashlib
**
|
 SHA-1 hashing for k-Anonymity HIBP queries 
|
|
**
math
**
|
 Entropy calculation (
`log2`
) 
|
|
**
re
**
|
 Regex-based character class detection 
|
|
**
urllib
**
|
 HTTP requests to HIBP API (no external deps) 
|
### Frontend
|
 Tool 
|
 Purpose 
|
|
---
|
---
|
|
**
HTML5
**
|
 Semantic markup, ARIA accessibility roles 
|
|
**
Vanilla CSS3
**
|
 Custom properties, Grid, Flexbox, glassmorphism, animations 
|
|
**
Vanilla JavaScript
**
|
 Fetch API, DOM, Canvas 2D, crypto.getRandomValues 
|
|
**
Lucide Icons
**
|
 SVG icon library (CDN) 
|
|
**
Google Fonts
**
|
 Outfit (UI) + Fira Code (monospace) 
|
### APIs & Services
|
 Service 
|
 Usage 
|
|
---
|
---
|
|
**
Have I Been Pwned
**
|
 Breach database (k-Anonymity, 750M+ passwords) 
|
|
**
HIBP Range API
**
|
`GET /range/{prefix}`
 — 5-char SHA-1 prefix lookup 
|
---
## 🔐 Privacy & Security Design
> **Your password never leaves your device in full — ever.**
1. All strength analysis (entropy, checklist, suggestions) runs **client-side** first
2. For breach checking, your password is hashed with SHA-1 **locally**
3. Only the **first 5 characters** of the hash prefix are sent to the HIBP API
4. The API returns all hashes matching that prefix — your browser checks for a match **locally**
5. The server **never logs** any password or hash
This implements the **k-Anonymity** model: even if the HIBP API were compromised, attackers could not recover your original password from the query prefix alone.
---
## 📡 API Endpoints
### `POST /api/analyze`
Analyzes a password and returns a full security report.
**Request:**
```json
{ "password": "MyP@ssw0rd123" }
```
### 2. Install Dependencies
Install Flask and standard packages listed in `requirements.txt`:
```bash
pip install -r requirements.txt
**Response:**
```json
{
  "length": 13,
  "entropy": 82.51,
  "pool_size": 95,
  "score": 3,
  "rating": "Strong",
  "is_common": false,
  "pwned_count": 0,
  "crack_times": {
    "online_throttled": "2,604,811 years",
    "offline_fast_hash": "9 hours",
    "supercomputer": "Instantly"
  },
  "distribution": {
    "uppercase": 2,
    "lowercase": 7,
    "digits": 3,
    "special": 1
  },
  "checks": {
    "has_lower": true,
    "has_upper": true,
    "has_digit": true,
    "has_special": true,
    "length_ok": true
  },
  "suggestions": []
}
```
### 3. Run the Server
Launch the Flask development server:
---
### `POST /api/generate`
Generates a cryptographically secure password or passphrase.
**Request (Random Password):**
```json
{
  "mode": "password",
  "length": 16,
  "upper": true,
  "lower": true,
  "digits": true,
  "symbols": true
}
```
**Request (Passphrase):**
```json
{
  "mode": "passphrase",
  "words": 4,
  "separator": "-"
}
```
**Response:**
```json
{ "password": "kR7@mNqX!2pLsYvT" }
```
---
## 🎨 Design System
- **Color Palette**: Dark navy (`#060910`) base, cyan (`#06b6d4`), purple (`#8b5cf6`), blue (`#3b82f6`)
- **Typography**: Outfit (UI text) + Fira Code (mono/passwords)
- **Style**: Glassmorphism cards, backdrop-filter blur, gradient glows
- **Animations**: Fade-in-up, canvas particles, SVG gauge fills, segmented bar transitions
- **Responsive**: CSS Grid + Flexbox, mobile breakpoints at 768px and 500px
---
## 📦 Deployment
### Local Development
```bash
python app.py
# Runs on http://localhost:5000 with debug mode
```
### 4. Open in Browser
Open your browser and navigate to:
```text
http://127.0.5.1:5000/
### Production (Example with Gunicorn)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```
*(or local port specified in your console logs)*
### Docker (Optional)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["python", "app.py"]
```
---
## 📄 License
This project is open-source and available under the MIT License.
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add: your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request
---
## 📜 License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
---
## 🙏 Acknowledgements
- [Have I Been Pwned](https://haveibeenpwned.com/) by Troy Hunt — for the privacy-preserving breach API
- [Lucide Icons](https://lucide.dev/) — beautiful open-source SVG icons
- [Google Fonts](https://fonts.google.com/) — Outfit & Fira Code typefaces
- [NIST SP 800-63B](https://pages.nist.gov/800-63-3/sp800-63b.html) — Password security guidelines
---
<div align="center">
**Made with 🛡️ for cybersecurity education**
*SentinelPass v2.0 — Passwords are never stored or transmitted in full*
</div>
