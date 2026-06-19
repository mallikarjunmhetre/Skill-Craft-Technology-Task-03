# Skill-Craft-Technology-Task-03
Skill Craft Technology Cyber Security Internship Projects.
<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=30&pause=1000&color=06B6D4&center=true&vCenter=true&width=600&lines=🛡️+SentinelPass+v2.0;Advanced+Password+Security;Built+with+Python+%2B+Flask;Open+Source+%26+Privacy+First" alt="SentinelPass Typing SVG" />

<br/>

# 🛡️ SentinelPass — Password Security Suite

**A full-stack cybersecurity web application for real-time password analysis,
secure generation, breach detection, and interactive learning.**

<br/>

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HIBP](https://img.shields.io/badge/HIBP-k--Anonymity-EF4444?style=for-the-badge&logo=security&logoColor=white)](https://haveibeenpwned.com)
[![License](https://img.shields.io/badge/License-MIT-10B981?style=for-the-badge)](LICENSE)
[![Pages](https://img.shields.io/badge/GitHub-Pages-181717?style=for-the-badge&logo=github&logoColor=white)](https://yourusername.github.io/password-strength-checker)

<br/>

> 🔒 **Privacy First** — Your password **never** leaves your device in full. k-Anonymity ensures zero exposure.

<br/>

[🌐 **Live Demo**](https://yourusername.github.io/password-strength-checker) &nbsp;•&nbsp;
[📖 **Documentation**](#-documentation) &nbsp;•&nbsp;
[🚀 **Quick Start**](#-quick-start) &nbsp;•&nbsp;
[🛠️ **Tech Stack**](#-technology-stack)

</div>

---

## 📸 Preview

<div align="center">

| Dashboard | Analyzer | Generator |
|:---------:|:--------:|:---------:|
| 🏠 Hero with Quick Test | 🔍 Entropy Gauge + Chart | ⚡ CSPRNG + History |

| Learning Center | About / Tech Stack |
|:---------:|:------------------:|
| 🎓 Brute-Force Simulator | ℹ️ Full Docs + Setup Guide |

</div>

---

## ✨ Features at a Glance

<div align="center">

| # | Feature | Technology | Status |
|---|---------|-----------|--------|
| 1 | 🔐 **Real-Time Strength Analysis** | Python Shannon Entropy `H = L × log₂(R)` | ✅ |
| 2 | 🌐 **Breach Database Check** | HIBP API + k-Anonymity (SHA-1 prefix) | ✅ |
| 3 | 📊 **Character Distribution Chart** | Vanilla JS animated bar chart | ✅ |
| 4 | 🎯 **5-Level Segmented Strength Bar** | CSS3 transitions + glow effects | ✅ |
| 5 | ⏱️ **Crack Time Estimation** | 3 attack models (Online/GPU/Supercomputer) | ✅ |
| 6 | ⚡ **CSPRNG Password Generator** | Python `secrets` module (OS entropy pool) | ✅ |
| 7 | 📝 **Passphrase Generator** | Random word selection + custom separator | ✅ |
| 8 | 🕹️ **Live Brute-Force Simulator** | Async JS generator — non-blocking | ✅ |
| 9 | 📖 **Dictionary Attack Demo** | Common-password offline lookup | ✅ |
| 10 | 🎓 **7-Topic Knowledge Base** | Interactive accordion UI | ✅ |
| 11 | 📋 **Password History** | Session-based (last 5, never stored) | ✅ |
| 12 | 🎨 **Canvas Particle Background** | HTML5 Canvas 2D API | ✅ |
| 13 | 📱 **Fully Responsive Design** | CSS Grid + Flexbox, mobile-first | ✅ |
| 14 | ♿ **Accessible (ARIA)** | Roles, labels, live regions | ✅ |

</div>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SENTINELPASS v2.0                       │
│              Full-Stack Architecture Overview               │
└─────────────────────────────────────────────────────────────┘

  BROWSER (Client)                    SERVER (Flask)
  ─────────────────                   ───────────────
  
  ┌──────────────┐    HTTP Request    ┌──────────────────┐
  │   HTML5 UI   │ ────────────────► │   app.py         │
  │  5 Pages     │                   │  Flask Router    │
  └──────────────┘                   └────────┬─────────┘
         │                                    │
  ┌──────────────┐                   ┌────────▼─────────┐
  │  CSS3 Design │                   │  Analysis Engine │
  │  Glassmorphism│                  │  • Shannon H     │
  │  Animations  │                   │  • Pool size     │
  └──────────────┘                   │  • Crack times   │
         │                           │  • Dictionary    │
  ┌──────────────┐   JSON Response   └────────┬─────────┘
  │ JavaScript   │ ◄────────────────          │
  │ • analyzer   │                   ┌────────▼─────────┐
  │ • generator  │                   │  HIBP API Call   │
  │ • simulator  │                   │  (k-Anonymity)   │
  │ • particles  │                   │  SHA1 prefix ──► │ haveibeenpwned.com
  └──────────────┘                   │  match locally   │
                                     └──────────────────┘
```

---

## 🔐 k-Anonymity Privacy Model

```
Your Password                   What is Sent
─────────────                   ────────────

"MyPassword123!"
       │
       ▼
  SHA-1 Hash:          Only first 5 chars!
  A94A8FE5...    ──►   "A94A8" ──► HIBP API
                                        │
                                        ▼
                               Returns all hashes
                               starting with A94A8
                                        │
                                        ▼
                              Match checked LOCALLY
                              Password never exposed!
```

---

## 📊 Tech Stack Breakdown

```
Language / Tool         Usage in Project                    Coverage
──────────────          ────────────────                    ────────

Python 3.11+    ████████████████████████░░  Backend, Crypto, API      85%
HTML5           ████████████████████░░░░░░  Structure, Templates      75%
CSS3            ██████████████████████████  Full Design System       100%
JavaScript      ████████████████████████░░  UI Logic, Canvas, Fetch   90%
Flask           ████████████████████░░░░░░  Routing, Jinja2           75%
secrets (CSPRNG)████████░░░░░░░░░░░░░░░░░  Password Generation       30%
hashlib         ████████░░░░░░░░░░░░░░░░░  SHA-1 for k-Anonymity     30%
urllib          ████████░░░░░░░░░░░░░░░░░  HIBP API Requests         30%
Canvas API      ████████████░░░░░░░░░░░░░  Particle Animation        45%
```

---

## 🗂️ Project Structure

```
📁 password-strength-checker/
│
├── 🐍 app.py                    ← Flask backend (analysis engine + REST API)
├── 📋 requirements.txt          ← Only Flask (stdlib handles the rest)
├── 📖 README.md                 ← This file
├── 🚫 .gitignore                ← Excludes venv/, __pycache__, .env
│
├── 📁 static/
│   │
│   ├── 📁 css/
│   │   └── 🎨 style.css        ← 40KB design system (glassmorphism + animations)
│   │
│   ├── 📁 js/
│   │   ├── ⚡ analyzer.js      ← Strength analysis, gauge, distribution chart
│   │   ├── 🔑 generator.js     ← Generator UI, history, CSPRNG fallback
│   │   ├── 🖥️  simulator.js    ← Brute-force sim, dictionary demo, accordion
│   │   └── ✨ particles.js     ← Canvas particle network animation
│   │
│   └── 📄 common_passwords.txt ← Offline dictionary (common password list)
│
├── 📁 templates/
│   ├── 🧩 base.html            ← Shared nav, footer, canvas, toast, SEO
│   ├── 🏠 index.html           ← Dashboard + quick test widget
│   ├── 🔍 analyzer.html        ← Password strength analyzer
│   ├── ⚡ generator.html       ← Secure password generator
│   ├── 🎓 education.html       ← Attack simulator + knowledge base
│   └── ℹ️  about.html          ← Tech stack + setup guide
│
└── 📁 docs/                    ← GitHub Pages static landing page
    └── 🌐 index.html           ← Live demo landing page
```

---

## 🌐 Pages Overview

```
  ╔══════════════════════════════════════════════════════════╗
  ║              SENTINELPASS — SITE MAP                     ║
  ╠══════════════════════════════════════════════════════════╣
  ║                                                          ║
  ║   / (Dashboard)          /analyzer                       ║
  ║   ┌─────────────┐        ┌─────────────────────────┐    ║
  ║   │ Hero Banner │        │ Password Input          │    ║
  ║   │ 4 Feature   │        │ Segmented Strength Bar  │    ║
  ║   │   Cards     │        │ Entropy Gauge (SVG)     │    ║
  ║   │ Quick Test  │        │ Character Distribution  │    ║
  ║   │ Stats Row   │        │ Breach Check (HIBP)     │    ║
  ║   └─────────────┘        │ Crack Time Table        │    ║
  ║                          └─────────────────────────┘    ║
  ║   /generator             /education                      ║
  ║   ┌─────────────┐        ┌─────────────────────────┐    ║
  ║   │ Tab: Pw/PP  │        │ Brute-Force Simulator   │    ║
  ║   │ CSPRNG Gen  │        │ Terminal Console        │    ║
  ║   │ Strength Mtr│        │ Dictionary Demo         │    ║
  ║   │ History (5) │        │ 7-Topic Accordion       │    ║
  ║   │ Pro Tips    │        └─────────────────────────┘    ║
  ║   └─────────────┘                                        ║
  ║                          /about                          ║
  ║                          ┌─────────────────────────┐    ║
  ║                          │ Tech Stack Grid         │    ║
  ║                          │ File Tree Diagram       │    ║
  ║                          │ GitHub Links            │    ║
  ║                          │ Setup Timeline          │    ║
  ║                          └─────────────────────────┘    ║
  ╚══════════════════════════════════════════════════════════╝
```

---

## 🔌 REST API

### `POST /api/analyze`

```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"password": "MyP@ssw0rd123!"}'
```

**Response:**
```json
{
  "score": 4,
  "rating": "Very Strong",
  "entropy": 91.98,
  "pool_size": 95,
  "length": 14,
  "is_common": false,
  "pwned_count": 0,
  "crack_times": {
    "online_throttled": "7,726,743,781,458,831 centuries",
    "offline_fast_hash": "35,527 years",
    "supercomputer": "3 hours"
  },
  "distribution": {
    "uppercase": 2, "lowercase": 7,
    "digits": 3,    "special": 2
  },
  "checks": {
    "has_lower": true, "has_upper": true,
    "has_digit": true, "has_special": true,
    "length_ok": true
  },
  "suggestions": []
}
```

---

### `POST /api/generate`

**Password:**
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"mode":"password","length":20,"upper":true,"lower":true,"digits":true,"symbols":true}'
```

**Passphrase:**
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"mode":"passphrase","words":4,"separator":"-"}'
```

**Response:**
```json
{ "password": "zebra-haven-signal-magic" }
```

---

## 🚀 Quick Start

### Step 1 — Clone

```bash
git clone https://github.com/yourusername/password-strength-checker.git
cd password-strength-checker
```

### Step 2 — Virtual Environment

```bash
# Create
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate
```

### Step 3 — Install & Run

```bash
pip install -r requirements.txt
python app.py
```

### Step 4 — Open Browser

```
http://localhost:5000
```

---

## 🔒 Security & Privacy Design

| Principle | Implementation |
|-----------|---------------|
| **Zero server logging** | No passwords or hashes are ever stored |
| **k-Anonymity** | Only 5-char SHA-1 prefix sent to HIBP |
| **Client-side first** | Entropy/checklist calculated instantly in browser |
| **CSPRNG only** | Python `secrets` module — OS `/dev/urandom` source |
| **No third-party trackers** | No analytics, no cookies |
| **Open source** | Full code auditable on GitHub |

---

## 🎓 Cybersecurity Topics Covered

```
  ┌────────────────────────────────────────────────────────┐
  │             KNOWLEDGE BASE TOPICS                      │
  ├────────────────────────────────────────────────────────┤
  │  1. 💥 Brute Force Attack    — Sequential enumeration  │
  │  2. 📖 Dictionary Attack     — Wordlist-based cracking │
  │  3. 🌈 Rainbow Table Attack  — Pre-computed hash maps  │
  │  4. 🧂 Hashing & Salting     — bcrypt/Argon2/scrypt    │
  │  5. 🔁 Credential Stuffing   — Reused password attacks │
  │  6. 📱 Multi-Factor Auth     — MFA / TOTP / WebAuthn   │
  │  7. 🛡️  Zero-Trust Security  — Never trust, verify all │
  └────────────────────────────────────────────────────────┘
```

---

## 📦 Dependencies

```
Flask>=3.0.0          # Only external dependency!

# All others are Python Standard Library:
# hashlib  — SHA-1 hashing for k-Anonymity
# secrets  — Cryptographically secure random (CSPRNG)
# math     — Entropy calculation (log2)
# re       — Regex character class detection
# urllib   — HTTP requests to HIBP API
# string   — ASCII character sets
# os       — File path handling
```

---

## 🤝 Contributing

```bash
# Fork → Clone → Branch → Commit → Push → PR
git checkout -b feature/your-amazing-feature
git commit -m "feat: add amazing feature"
git push origin feature/your-amazing-feature
```

---

## 📜 License

```
MIT License — Copyright (c) 2026 SentinelPass

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software to use, copy, modify, merge, publish without
restriction, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.
```

---

<div align="center">

## 🌐 Links

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-06b6d4?style=for-the-badge)](https://yourusername.github.io/password-strength-checker)
[![HIBP API](https://img.shields.io/badge/HIBP-API_Docs-EF4444?style=for-the-badge&logo=security)](https://haveibeenpwned.com/API/v3)
[![Python Docs](https://img.shields.io/badge/Python-secrets_module-3776AB?style=for-the-badge&logo=python)](https://docs.python.org/3/library/secrets.html)
[![Flask Docs](https://img.shields.io/badge/Flask-Documentation-000000?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com)

<br/>

**Made with 🛡️ for cybersecurity education**

*SentinelPass v2.0 — Passwords are never stored or transmitted in full*

---

⭐ **Star this repo if you found it useful!**

</div>
