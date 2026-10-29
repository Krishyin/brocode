# DEBUG YOURSELF // The Art of Finding Out
### A Personal, Interactive Birthday Workstation for Ramakrishnan

> *“You didn't debug my code for me. You taught me how to debug the unknown.”*

---

## 1. Project Overview

**DEBUG YOURSELF** is a technical, interactive birthday gift created by **Krishna** for **Ramakrishnan**. 

Rather than a conventional greeting card or static web page, it is structured as an interactive investigation workstation. The visitor begins faced with unresolved incidents, unfamiliar terminology, and complex production logs—tracing Krishna's actual journey from an overwhelmed junior engineer to an independent developer capable of investigating and resolving complex production systems.

As each challenge is solved, the workstation transforms from confusion into clarity, culminating in an intimate, heartfelt birthday reveal.

---

## 2. Interactive Scenes & Story Progression

1. **Scene 0: The Workstation (Boot Sequence)**
   - Minimalist, cinematic boot terminal (`KRISHNA_WORKSTATION // SESSION INITIALIZING`).
   - Incident `BD-001` flagged with `STATUS: ROOT CAUSE UNKNOWN` and `PRIORITY: PERSONAL`.
   - Fast-forward / skip option available.

2. **Scene 1: The Unknown**
   - Deconstructs the intimidating terms from early career days: **API, Endpoint, Headers, Payload, JSON**.
   - Interactive evidence cards with real-world mental models and syntax traces.
   - Core discovery: *“Every unfamiliar thing looks complicated until you learn how to investigate it.”*

3. **Scene 2: The Learning Lab**
   - Simulated Power Apps dual-screen runtime (Screen A: Welcome &rarr; Screen B: Greeting).
   - Recreates the challenge of learning how to pass context variables via the 3rd parameter of `Navigate()` versus global `Set()`.
   - Live simulated preview and feedback.
   - Core discovery: *“The answer matters. Learning how to find it matters even more.”*

4. **Scene 3: The Question That Kept Coming Back (Inside Joke)**
   - Playful, affectionate shared memory: Krishna repeatedly confusing `Update()` and `UpdateIf()` in Power Apps.
   - Interactive challenge using a simulated employee collection table:
     - **Challenge A:** Update one specific record with `Update()`.
     - **Challenge B:** Update conditional rows with `UpdateIf()`.
   - Accurate architectural distinction presented with warmth and humor.
   - Core reveal: *“Same question. Different day. Better answer.”*

5. **Scene 4: The API Labyrinth**
   - Interactive HTTP inspector (`POST /api/patients`).
   - Investigates a real-world scenario (HTTP 415 Unsupported Media Type caused by `Content-Type: text/plain` payload mismatch).
   - Interactive hypothesis validation, header patching, and response verification.
   - Core discovery: *“The words that once looked intimidating became tools you could use.”*

6. **Scene 5: The Production Incident**
   - Immersive production debugging scenario (`INCIDENT: PROD-4821`).
   - Multi-tab evidence dashboard: telemetry logs, request payload, validation schema, git release diff, and response codes.
   - Pinpoints schema drift (mandatory `contactEmail` added in v2.4.1), patches the request transformer, and runs a regression suite.
   - Core milestone: *“You can now walk into something unfamiliar, investigate it, and find your way through.”*

7. **Scene 6: The Final Birthday Reveal**
   - Ambient calming transition: logs settle, interface quietens, warm amber lighting fades in.
   - Step-by-step emotional reveal:
     - *“You didn't debug my code for me.”*
     - *“You taught me how to debug the unknown.”*
     - **HAPPY BIRTHDAY, RAMAKRISHNAN**
   - The full personal birthday letter from Krishna.
   - Symbolic git commit record (`commit: gratitude`).

8. **Hidden Detail: `why_this_exists.txt`**
   - Accessible via the station header or discreet investigation link:
     ```text
     Some lessons remain long after the screen is closed.
     Some fixes change more than the program.
     Find the root cause.
     ```

9. **Persistent Investigation Journal**
   - Engineering notebook accessible anytime across the top navigation bar, recording discoveries and takeaways as each scene is unlocked.

---

## 3. Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5
- **Styling:** Tailwind CSS with custom dev palette (`#06090e` near-black, deep navy `#0c121d`, warm amber `#d97706`, emerald `#059669`)
- **Typography:** JetBrains Mono (monospaced logs & code), Inter (interface UI), Playfair Display (final emotional letter)
- **Audio:** Native Web Audio API synthesizer for tactile mechanical clicks and warm chimes (zero external audio files, mute toggle included)
- **Icons:** Lucide React

---

## 4. Local Development

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 5. Live Website & Deployment

Live Website: **[https://Krishyin.github.io/brocode/](https://Krishyin.github.io/brocode/)**

The application is hosted on GitHub Pages via GitHub Actions with relative asset path resolution (`base: './'`).

---

## 6. Author

Crafted with gratitude and brotherhood by **Krishna** for **Ramakrishnan**.
