/**
 * Alex Vance - Personal Portfolio Interactive Logic
 * High-performance Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingEffect();
  initCounters();
  initTerminal();
  initSkillsFilter();
  initTelemetrySimulator();
  initContactAndClipboard();
  initScrollAndNav();
  initTimeAndZone();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rootHtml = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('av_portfolio_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    rootHtml.setAttribute('data-theme', savedTheme);
  } else if (!systemPrefersDark) {
    rootHtml.setAttribute('data-theme', 'light');
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = rootHtml.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    rootHtml.setAttribute('data-theme', newTheme);
    localStorage.setItem('av_portfolio_theme', newTheme);
  });
}

/* ==========================================================================
   2. Dynamic Typing Headline Effect
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const titles = [
    'AI & IoT Engineering Student',
    'Edge AI & Autonomous Systems Specialist',
    'Embedded Firmware & Hardware Enthusiast',
    'Distributed Systems & Agent Researcher'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 75;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 35;
    } else {
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 75;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Animated Stat Counters
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 1500;
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-grid');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   4. Interactive Terminal Console
   ========================================================================== */
function initTerminal() {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const terminalForm = document.getElementById('terminalForm');
  const quickBtns = document.querySelectorAll('.quick-cmd-btn');

  if (!terminalBody || !terminalInput) return;

  const commandDb = {
    help: `
Available Commands:
  - <strong style="color: #38bdf8;">help</strong>           Show this list of available commands
  - <strong style="color: #38bdf8;">cat bio.md</strong>     Read full biography & engineering philosophy
  - <strong style="color: #38bdf8;">skills</strong>         List core technical proficiencies & stack
  - <strong style="color: #38bdf8;">projects</strong>       Summary of key production deployments
  - <strong style="color: #38bdf8;">status</strong>         Query edge cluster hardware and firmware health
  - <strong style="color: #38bdf8;">telemetry</strong>      Display live simulated sensor readings
  - <strong style="color: #38bdf8;">contact</strong>        Show direct channels and social links
  - <strong style="color: #38bdf8;">whoami</strong>         Display current session user identity
  - <strong style="color: #38bdf8;">date</strong>           Display current system epoch & timestamp
  - <strong style="color: #38bdf8;">clear</strong>          Clear current terminal buffer
    `,
    'cat bio.md': `
<strong>Yu Chen — AI & IoT Engineering Student & Researcher</strong>
------------------------------------------------------------------
Passionate student engineer based in Taiwan, bridging intelligent software
with physical hardware. Exploring low-power neural networks, microcontrollers,
and autonomous cyber-physical systems.
Core Focus:
1. Intelligent Edge: On-device neural inference and NPU acceleration.
2. Robust Hardware: Resilient wireless mesh protocols and sensor networks.
3. System Thinking: Holistic design from bare-metal silicon to cloud telemetry.
    `,
    skills: `
<strong>Core Competencies Matrix:</strong>
- AI & NPU:     TensorRT, ONNX Runtime, YOLOv10, INT8 Quantization, PyTorch
- IoT Hardware: FreeRTOS, Zephyr RTOS, Nordic nRF5340, ESP32, STM32, C++20, Rust
- Protocols:    BLE 5.4 Mesh, Thread/Matter, MQTT-SN, CoAP, WebSockets
- Cloud/Data:   Apache Kafka, ClickHouse, Docker, Kubernetes, FastAPI, Python
- Frontend:     Real-time Canvas/WebGL, Modern ES6+, Responsive Design Tokens
    `,
    projects: `
<strong>Featured Shipped Deployments:</strong>
1. <strong>Sentinel-AI</strong>: Sub-3ms edge vision unit for high-speed industrial safety.
2. <strong>NeuroMesh</strong>: Decentralized self-healing 1,000-node wireless sensor grid.
3. <strong>OmniAgent</strong>: Multimodal physical space orchestrator with local LLM agents.
(Scroll down to the Projects section for full interactive architecture deep-dives!)
    `,
    status: `
[SYSTEM HEALTH CHECK]
  Node:           EdgeGateway-TX9
  Firmware:       v3.12-RTOS (Nordic nRF5340 Dual-Cortex M33)
  NPU:            Hailo-8 26 TOPS Edge Accelerator
  Mesh Status:    CONNECTED (92 child nodes, 0 packet loss)
  Uptime:         142 days, 18 hrs, 24 mins
  Memory Pool:    78% free | 0 leaks detected
    `,
    telemetry: `
[CURRENT SENSOR STREAM]
  Silicon Temp:   41.8 °C (Thermal throttling threshold: 85.0 °C)
  Tri-axial Vibe: 0.24 g RMS
  Inference Lat:  2.1 ms @ INT8 FP16 hybrid
  Dispatched:     1,240 pkt/sec across mesh routing table
    `,
    contact: `
<strong>Direct Communications:</strong>
  Email:    yuchen.aiot@gmail.com
  GitHub:   https://github.com/bambamboo0321
  LinkedIn: https://linkedin.com
  Twitter:  https://twitter.com
  Base:     Taiwan / Available Globally
    `,
    whoami: `yuchen@visitor-session (Authenticated via Web Console)`,
    date: () => new Date().toISOString() + ` (Local: ${new Date().toLocaleString()})`,
    time: () => {
      const now = new Date();
      return `Current Epoch: ${now.getTime()} ms\nLocal Time:    ${now.toLocaleString()}\nUniversal UTC: ${now.toUTCString()}`;
    },
    timezone: () => {
      const now = new Date();
      const zones = [
        ['Local Time', Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local'],
        ['Beijing / CST', 'Asia/Shanghai'],
        ['Tokyo / JST', 'Asia/Tokyo'],
        ['San Francisco / PT', 'America/Los_Angeles'],
        ['New York / ET', 'America/New_York'],
        ['London / GMT', 'Europe/London'],
        ['Universal UTC', 'UTC']
      ];
      return `<strong>Global Clocks Synchronized:</strong>\n` + zones.map(([label, tz]) => {
        try {
          const t = new Intl.DateTimeFormat([], { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now);
          return `  ${label.padEnd(20)}: <span style="color: #38bdf8;">${t}</span> (${tz})`;
        } catch(e) { return ''; }
      }).join('\n') + `\n<em>Tip: You can also toggle the timezone directly in the top-right navigation bar.</em>`;
    },
    tz: () => commandDb.timezone()
  };

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Append command prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'term-line';
    promptLine.innerHTML = `<span class="term-prompt">yuchen@aiot-node</span>:<span class="term-path">~</span>$ <span class="term-cmd">${escapeHtml(trimmed)}</span>`;
    terminalBody.appendChild(promptLine);

    const cmdLower = trimmed.toLowerCase();

    if (cmdLower === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    const outputLine = document.createElement('div');
    outputLine.className = 'term-output';

    if (commandDb[cmdLower]) {
      const resp = typeof commandDb[cmdLower] === 'function' ? commandDb[cmdLower]() : commandDb[cmdLower];
      outputLine.innerHTML = resp.replace(/\n/g, '<br>');
    } else if (cmdLower.startsWith('echo ')) {
      outputLine.textContent = trimmed.substring(5);
    } else if (cmdLower === 'about') {
      outputLine.innerHTML = commandDb['cat bio.md'].replace(/\n/g, '<br>');
    } else if (cmdLower === 'sudo' || cmdLower.startsWith('sudo ')) {
      outputLine.innerHTML = `<span style="color: #ef4444;">Permission denied: Nice try, guest! This node is cryptographically locked.</span>`;
    } else {
      outputLine.innerHTML = `command not found: <span style="color: #f87171;">${escapeHtml(trimmed)}</span>. Type <strong style="color: #4ade80;">'help'</strong> to see available commands.`;
    }

    terminalBody.appendChild(outputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = terminalInput.value;
    terminalInput.value = '';
    executeCommand(cmd);
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      executeCommand(cmd);
      terminalInput.focus();
    });
  });

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m]);
  }
}

/* ==========================================================================
   5. Skills Matrix Filtering
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Live IoT Telemetry Waveform Simulator (Canvas)
   ========================================================================== */
function initTelemetrySimulator() {
  const canvas = document.getElementById('telemetryChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const valTemp = document.getElementById('valTemp');
  const valVibe = document.getElementById('valVibe');
  const valLatency = document.getElementById('valLatency');
  const valPackets = document.getElementById('valPackets');

  const freqSlider = document.getElementById('freqSlider');
  const loadSlider = document.getElementById('loadSlider');
  const freqVal = document.getElementById('freqVal');
  const loadVal = document.getElementById('loadVal');
  const triggerAnomalyBtn = document.getElementById('triggerAnomalyBtn');

  let width = (canvas.width = canvas.parentElement.clientWidth);
  let height = (canvas.height = 220);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = 220;
  });

  // Slider controls
  let samplingFreq = 60;
  let workload = 45;
  let anomalyFactor = 0;

  freqSlider.addEventListener('input', (e) => {
    samplingFreq = +e.target.value;
    freqVal.textContent = `${samplingFreq} Hz`;
  });

  loadSlider.addEventListener('input', (e) => {
    workload = +e.target.value;
    loadVal.textContent = `${workload}%`;
  });

  triggerAnomalyBtn.addEventListener('click', () => {
    anomalyFactor = 1.0;
    triggerAnomalyBtn.style.borderColor = '#ef4444';
    triggerAnomalyBtn.style.color = '#ef4444';
    setTimeout(() => {
      triggerAnomalyBtn.style.borderColor = '';
      triggerAnomalyBtn.style.color = '';
    }, 1200);
  });

  // Time Zoom controls
  const zoomBtns = document.querySelectorAll('.zoom-btn');
  let currentZoomSec = 30; // 30s default
  let bufferLength = 120;

  let vibeHistory = new Array(bufferLength).fill(height / 2);
  let tempHistory = new Array(bufferLength).fill(height * 0.7);

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoomBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentZoomSec = +btn.getAttribute('data-zoom');
      // 10s: 60 samples, 30s: 120 samples, 60s: 240 samples, 120s: 480 samples
      const newLen = Math.round((currentZoomSec / 30) * 120);
      adjustBufferLength(newLen);
    });
  });

  function adjustBufferLength(newLen) {
    bufferLength = newLen;
    if (newLen > vibeHistory.length) {
      const diff = newLen - vibeHistory.length;
      for (let i = 0; i < diff; i++) {
        vibeHistory.unshift(vibeHistory[0] || height / 2);
        tempHistory.unshift(tempHistory[0] || height * 0.7);
      }
    } else if (newLen < vibeHistory.length) {
      vibeHistory.splice(0, vibeHistory.length - newLen);
      tempHistory.splice(0, tempHistory.length - newLen);
    }
  }

  let phase = 0;
  let frameCount = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let y = 30; y < height - 25; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Dynamic Time-Zoom axis grid lines & markers
    const divisions = 4;
    for (let i = 0; i <= divisions; i++) {
      const x = (i / divisions) * (width - 60) + 30;
      ctx.beginPath();
      ctx.moveTo(x, 15);
      ctx.lineTo(x, height - 25);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.stroke();

      const secOffset = Math.round(currentZoomSec * (1 - i / divisions));
      const label = secOffset === 0 ? 'Now' : `-${secOffset}s`;
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label, x, height - 8);
    }

    phase += (samplingFreq / 60) * 0.12;
    frameCount++;

    // Calculate simulated current readings
    const baseVibe = Math.sin(phase) * 18 + Math.sin(phase * 2.3) * 8 + (Math.random() - 0.5) * 6;
    const spike = anomalyFactor * 65 * (Math.random() - 0.5);
    const newVibeY = (height - 30) / 2 + baseVibe + spike;

    const baseTempY = (height - 30) * 0.75 - (workload / 100) * 45 + Math.sin(phase * 0.4) * 4;

    vibeHistory.push(newVibeY);
    vibeHistory.shift();

    tempHistory.push(baseTempY);
    tempHistory.shift();

    // Smooth anomaly decay
    if (anomalyFactor > 0.01) {
      anomalyFactor *= 0.94;
    } else {
      anomalyFactor = 0;
    }

    // Update KPI numbers periodically
    if (frameCount % 12 === 0) {
      const currentTemp = (36 + (workload * 0.18) + (Math.sin(phase * 0.2) * 1.2) + (anomalyFactor * 12)).toFixed(1);
      const currentVibe = (0.15 + (Math.abs(baseVibe + spike) * 0.012)).toFixed(2);
      const currentLatency = (1.6 + (workload * 0.018) + (anomalyFactor * 3.5)).toFixed(1);
      const currentPkt = Math.floor(800 + samplingFreq * 8.5 + workload * 3 + (Math.random() * 40));

      valTemp.textContent = currentTemp;
      valVibe.textContent = currentVibe;
      valLatency.textContent = currentLatency;
      valPackets.textContent = currentPkt.toLocaleString();
    }

    // Draw Temperature Curve (Indigo)
    drawCurve(tempHistory, '#818cf8', 'rgba(129, 140, 248, 0.12)');

    // Draw Vibration Waveform (Cyan)
    drawCurve(vibeHistory, '#06b6d4', 'rgba(6, 182, 212, 0.18)');

    requestAnimationFrame(render);
  }

  function drawCurve(data, strokeColor, fillColor) {
    const step = width / (data.length - 1);

    ctx.beginPath();
    ctx.moveTo(0, data[0]);

    for (let i = 1; i < data.length; i++) {
      const prevX = (i - 1) * step;
      const prevY = data[i - 1];
      const curX = i * step;
      const curY = data[i];
      const midX = (prevX + curX) / 2;
      ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + curY) / 2);
    }

    ctx.lineTo(width, data[data.length - 1]);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Area fill
    ctx.lineTo(width, height - 20);
    ctx.lineTo(0, height - 20);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  render();
}

/* ==========================================================================
   7. Contact Form & Clipboard Interactivity
   ========================================================================== */
function initContactAndClipboard() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyLabel = document.getElementById('copyEmailLabel');
  const emailText = document.getElementById('emailText');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText.textContent.trim());
        copyLabel.textContent = 'Copied to Clipboard! 📋';
        copyBtn.style.color = 'var(--accent-emerald)';
        setTimeout(() => {
          copyLabel.textContent = 'Copy Address';
          copyBtn.style.color = '';
        }, 2200);
      } catch (err) {
        copyLabel.textContent = 'Press Ctrl+C to Copy';
      }
    });
  }

  // Contact Form Submission Simulation
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitContactBtn');
  const submitText = document.getElementById('submitBtnText');
  const toastNotice = document.getElementById('toastNotice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // UI pending state
      submitBtn.disabled = true;
      submitText.textContent = 'Encrypting & Transmitting...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitText.textContent = 'Transmit Dispatch';
        contactForm.reset();

        // Trigger toast
        toastNotice.classList.add('visible');
        setTimeout(() => {
          toastNotice.classList.remove('visible');
        }, 4000);
      }, 1000);
    });
  }
}

/* ==========================================================================
   8. Navigation, Scroll Spy & Back-to-Top
   ========================================================================== */
function initScrollAndNav() {
  const navMenu = document.getElementById('navMenu');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile menu toggle
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // Back to top
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Scroll Spy for Nav Highlighting
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   9. World Clock & Timezone Management (Central Big Display + Nav & Footer)
   ========================================================================== */
function initTimeAndZone() {
  const navTimeDigits = document.getElementById('navTimeDigits');
  const clockDisplay = document.getElementById('clockDisplay');
  const footerZoneLabel = document.getElementById('footerZoneLabel');
  const yearDisplay = document.getElementById('currentYear');
  const timezoneSelect = document.getElementById('timezoneSelect');

  // Big Central Clock Elements
  const bigTimeHours = document.getElementById('bigTimeHours');
  const bigTimeMinutes = document.getElementById('bigTimeMinutes');
  const bigTimeSeconds = document.getElementById('bigTimeSeconds');
  const bigTimePeriod = document.getElementById('bigTimePeriod');
  const bigTimeDate = document.getElementById('bigTimeDate');
  const centralZoneBadge = document.getElementById('centralZoneBadge');
  const formatToggleBtn = document.getElementById('formatToggleBtn');
  const tzPills = document.querySelectorAll('.tz-pill');

  if (yearDisplay) {
    yearDisplay.textContent = new Date().getFullYear();
  }

  // Detect user's local timezone
  const detectedLocalZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Taipei';

  // Read saved preference or default to Asia/Taipei
  let activeZone = localStorage.getItem('av_preferred_timezone') || 'Asia/Taipei';
  let is24Hour = localStorage.getItem('av_clock_format') !== '12H'; // default 24H

  if (formatToggleBtn) {
    formatToggleBtn.textContent = is24Hour ? '24H' : '12H';
    formatToggleBtn.addEventListener('click', () => {
      is24Hour = !is24Hour;
      localStorage.setItem('av_clock_format', is24Hour ? '24H' : '12H');
      formatToggleBtn.textContent = is24Hour ? '24H' : '12H';
      updateClocks();
    });
  }

  const zoneLabels = {
    'auto': 'Local Time',
    'Asia/Taipei': 'Taipei / Taiwan (UTC+8)',
    'Asia/Shanghai': 'Beijing / CST (UTC+8)',
    'Asia/Tokyo': 'Tokyo / JST (UTC+9)',
    'America/Los_Angeles': 'US Pacific / PT',
    'America/New_York': 'US Eastern / ET',
    'Europe/London': 'London / GMT',
    'Europe/Berlin': 'Berlin / CET',
    'Australia/Sydney': 'Sydney / AEST',
    'UTC': 'UTC (Universal)'
  };

  function setTimezone(newZone) {
    activeZone = newZone;
    localStorage.setItem('av_preferred_timezone', activeZone);

    if (timezoneSelect) {
      timezoneSelect.value = activeZone;
    }

    tzPills.forEach(pill => {
      if (pill.getAttribute('data-zone') === activeZone) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    updateClocks();
  }

  if (timezoneSelect) {
    timezoneSelect.value = activeZone;
    timezoneSelect.addEventListener('change', (e) => {
      setTimezone(e.target.value);
    });
  }

  tzPills.forEach(pill => {
    pill.addEventListener('click', () => {
      setTimezone(pill.getAttribute('data-zone'));
    });
  });

  function updateClocks() {
    const now = new Date();
    const effectiveZone = activeZone === 'auto' ? detectedLocalZone : activeZone;

    // Format time parts
    try {
      const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone: effectiveZone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: !is24Hour
      });

      const parts = dtf.formatToParts(now);
      let hours = '00', minutes = '00', seconds = '00', dayPeriod = '';

      parts.forEach(p => {
        if (p.type === 'hour') hours = p.value;
        if (p.type === 'minute') minutes = p.value;
        if (p.type === 'second') seconds = p.value;
        if (p.type === 'dayPeriod') dayPeriod = p.value.toUpperCase();
      });

      if (bigTimeHours) bigTimeHours.textContent = hours;
      if (bigTimeMinutes) bigTimeMinutes.textContent = minutes;
      if (bigTimeSeconds) bigTimeSeconds.textContent = seconds;
      if (bigTimePeriod) bigTimePeriod.textContent = dayPeriod;

      const formattedNav = `${hours}:${minutes}:${seconds}${dayPeriod ? ' ' + dayPeriod : ''}`;
      if (navTimeDigits) navTimeDigits.textContent = formattedNav;
      if (clockDisplay) clockDisplay.textContent = formattedNav;

      // Full Calendar Date
      if (bigTimeDate) {
        const dateStr = new Intl.DateTimeFormat('en-US', {
          timeZone: effectiveZone,
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(now);
        bigTimeDate.textContent = dateStr;
      }

      if (centralZoneBadge) {
        centralZoneBadge.textContent = (zoneLabels[activeZone] || activeZone).toUpperCase();
      }

      if (footerZoneLabel) {
        footerZoneLabel.textContent = zoneLabels[activeZone] || activeZone;
      }
    } catch (err) {
      const fallback = now.toLocaleTimeString();
      if (navTimeDigits) navTimeDigits.textContent = fallback;
      if (clockDisplay) clockDisplay.textContent = fallback;
    }
  }

  // Initial call & sync pills
  setTimezone(activeZone);
  setInterval(updateClocks, 1000);
}
