# Yu Chen — Personal Portfolio & AIoT Systems Showcase

An interactive, zero-dependency personal website and showcase for **Yu Chen**, an AI & IoT Engineering Student and Researcher based in Taiwan.

🌐 **Live Demo Website**: [https://bambamboo0321.github.io/0916/](https://bambamboo0321.github.io/0916/)

---

## 🚀 Key Features

- **Dynamic Interactive Terminal (`yuchen@aiot-node`)**:
  - Full developer CLI simulator supporting commands: `help`, `bio`, `skills`, `projects`, `status`, `telemetry`, `time`, `timezone`, `contact`, `whoami`, `date`, `clear`.
- **Live IoT Telemetry Waveform Simulator**:
  - Real-time dual-waveform canvas chart (junction temperature curve and vibration acceleration FFT) with dynamic time-axis grid lines.
  - Interactive **Time Zoom** controls (`10s`, `30s`, `60s`, `2m`).
  - Real-time controls for sampling frequency (Hz), workload intensity (%), and synthetic anomaly spike injection.
- **World Clock & Timezone Switcher**:
  - Live digital clock in the navigation bar and footer with instant switching across timezones (Taipei, Tokyo, San Francisco, New York, London, Berlin, Sydney, UTC).
- **Technical Capabilities Matrix**:
  - Categorized, filterable skill cards covering AI/ML, IoT/Hardware, Cloud/Systems, and Modern Web.
- **Featured Projects Showcase**:
  - Highlights real-time edge computer vision (`Sentinel-AI`), decentralized wireless mesh protocols (`NeuroMesh`), and physical AI agents (`OmniAgent`).
- **Modern Glassmorphism Design System**:
  - Dual Theme (Dark / Light) with system preference detection and `localStorage` persistence.
  - Fluid typography with Google Fonts (`Plus Jakarta Sans` & `JetBrains Mono`).

## 📁 Repository Structure

```
├── index.html                   # Root redirection to portfolio
├── L2 Personal Page/
│   ├── index.html               # Main portfolio markup & SEO metadata
│   ├── style.css                # CSS design system, glassmorphism & themes
│   ├── app.js                   # Client-side interactivity, terminal & telemetry canvas
│   └── assets/                  # High-resolution generated visual assets
└── README.md
```

## 🛠️ Quick Start

No build steps, node packages, or bundlers required. Simply clone and open:

```bash
# Clone the repository
git clone https://github.com/bambamboo0321/0916.git

# Serve locally with Python
cd 0916
python3 -m http.server 8080
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser.
