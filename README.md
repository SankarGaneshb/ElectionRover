# 🗳️ Election Rover: The Cyber-Tricolor Intelligence Platform

> **Defend Your Democracy with Agentic Precision.**

Election Rover is a state-of-the-art, multi-agent intelligence platform designed to navigate the complexities of the world's largest democratic exercise. Built for **PromptWars 2026**, it transforms the Indian election process into a high-UX, gamified educational journey through specialized AI agents and a robust "Cyber-Tricolor" design system.

---

## 🌟 Vision & Vertical
**Democratic Empowerment through Education**: We bridge the gap between complex ECI (Election Commission of India) protocols and the citizen, providing a "Zero-Scroll" dashboard that empowers Voters and Candidates with real-time, role-specific intelligence.

## 🧠 Core Architecture: The Multi-Agent Hive
Election Rover is powered by a **LangGraph-orchestrated Multi-Agent System** that simulates a team of election experts working in concert:

| Agent | Specialty | Function |
| :--- | :--- | :--- |
| **🛡️ The Educator** | Protocol Logic | Simplifies ECI rules into actionable milestones. |
| **🌐 The Polyglot** | Linguistic Nuance | Ensures contextual accuracy across 11 regional languages. |
| **🎮 The Game Master** | Gamification | Manages "Democracy Quests" and validates badge issuance. |
| **👤 The Role Expert** | Stakeholder RACI | Routes queries based on Voter/Candidate/Official roles. |

---

## 🎨 Design Philosophy: Cyber-Tricolor
*   **National Identity**: A premium HSL-tailored palette utilizing Saffron, White, and Green with sleek dark-mode glassmorphism.
*   **Zero-Scroll Architecture**: A high-density dashboard that eliminates scrolling, prioritizing clarity and immediate interaction.
*   **Motion-Agnostic**: Full respect for "Reduce Motion" preferences while maintaining smooth micro-animations.

## 🌍 Massive Regional Inclusion (11 Languages)
Election Rover is built for the entire nation, supporting instant UI transformation across:
**English, हिन्दी (Hindi), தமிழ் (Tamil), తెలుగు (Telugu), ಕನ್ನಡ (Kannada), বাংলা (Bengali), മലയാളം (Malayalam), मराठी (Marathi), ગુજરાતી (Gujarati), ଓଡ଼ିଆ (Odia), and ਪੰਜਾਬੀ (Punjabi).**

---

## 🛠️ Technology Stack
### **Frontend**
*   **Core**: React 19, Vite, Tailwind CSS 4.0.
*   **Aesthetics**: Framer Motion (Micro-animations), Lucide React (Iconography).
*   **Architecture**: Feature-Sliced Design (FSD).
*   **Accessibility**: i18next (Multi-regional support), PWA (Offline-first).

### **Backend**
*   **Logic**: FastAPI, LangGraph, LangChain.
*   **AI Engine**: Google Gemini 3.1 (Generative AI).
*   **Environment**: Python 3.13-slim.

### **Infrastructure**
*   **Deployment**: Google Cloud Run (Serverless).
*   **Security**: Google Cloud Secret Manager (API Integrity).
*   **Automation**: GitHub Actions (Green-on-Arrival CI/CD).

---

## 🏛️ Core Engineering Pillars
Election Rover is engineered to the highest standards of production-grade software:

*   **💎 Code Quality**: Implements **Feature-Sliced Design (FSD)** for a modular, readable, and highly maintainable frontend architecture.
*   **🛡️ Security**: Zero-hardcoding policy. All sensitive orchestration is handled via **Google Cloud Secret Manager**.
*   **⚡ Efficiency**: Serverless, high-concurrency hosting on **Cloud Run** with PWA-based offline caching.
*   **🧪 Testing**: Full-stack validation via **Vitest** and **Pytest** integrated into a mandatory "Green-on-Arrival" CI/CD pipeline.
*   **♿ Accessibility**: **11-Language support** with "Reduce Motion" compliance and high-contrast, WCAG-friendly "Cyber-Tricolor" aesthetics.
*   **☁️ Google Services**: Deep, meaningful integration of **Gemini 3.1**, **Cloud Run**, **Cloud Build**, and **Secret Manager**.

---

## 💎 Solution Highlights & Technical Demonstration
Election Rover is designed to demonstrate excellence across all core evaluation criteria:

*   **🤖 Smart, Dynamic Assistant**: Uses a **LangGraph-based Multi-Agent Hive** to provide real-time, expert-level election guidance.
*   **🧠 Contextual Decision Making**: The assistant adapts its logic, tone, and protocols based on the user's selected role (**Voter** vs. **Candidate**) and their current progress in the "Democracy Quests."
*   **🛠️ Practical Real-World Usability**: Features an **offline-first PWA** and **11-language support**, making it a viable tool for every Indian citizen, even in areas with low connectivity.
*   **🧹 Clean & Maintainable Code**: Adheres to **Feature-Sliced Design (FSD)** and **Build Integrity** standards (Market-Rover Style), ensuring the codebase is production-ready and scalable.
*   **🇮🇳 Vertical Choice**: **Election Process Education**—Focused on democratizing technical ECI knowledge through agentic intelligence.

---

## 🚀 Deployment & Build Integrity
Election Rover follows strict **"Green-on-Arrival"** standards. Every push to the `master` branch triggers:
1.  **Vitest Suite**: Validating the Cyber-Tricolor React components in a JSDOM environment.
2.  **Pytest Logic**: Verifying the Multi-Agent graph paths and API response schemas.
3.  **Cloud Build**: Orchestrated deployment to Google Cloud Run.

### **Required GitHub Secrets/Variables**
*   `GCP_SA_KEY` (Secret): JSON key for a Service Account with Cloud Build & Run permissions.
*   `GCP_PROJECT_ID` (Variable): Target Google Cloud Project ID.
*   `GEMINI_API_KEY`: Stored securely in Google Cloud Secret Manager.

---

## ⚠️ Assumptions & Context
*   **Data Source**: All election protocols and role guidance are based on public ECI (Election Commission of India) documentation as of 2026.
*   **Connectivity**: Designed as a PWA; initial load requires internet, while subsequent "Democracy Quests" are cached for offline accessibility in rural areas.
*   **Infrastructure**: Assumes a Google Cloud environment with Secret Manager enabled for secure API orchestration.
*   **AI Context**: Gemini 3.1 is utilized for real-time linguistic nuance and protocol simplification.

---
Built with 🇮🇳 for **PromptWars 2026** | **[SankarGaneshb/ElectionRover](https://github.com/SankarGaneshb/ElectionRover)**
