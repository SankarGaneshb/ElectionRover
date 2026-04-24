# Election Rover 🗳️🚀

Election Rover is an AI-powered interactive assistant designed to educate Indian citizens on the election process, timelines, and legal requirements. It leverages a Multi-Agent system to provide a gamified, multi-lingual, and role-specific learning experience.

## 🌟 Chosen Vertical
**Election Process Education**: Focuses on empowering Voters and Candidates with the knowledge required for a transparent and active democracy.

## 🏗️ Approach & Logic
### 1. Multi-Agent Orchestration (LangGraph)
The system uses **LangGraph** to coordinate between specialized AI agents:
*   **The Educator**: Simplifies ECI rules and procedures.
*   **The Polyglot**: Ensures contextual accuracy across Indian languages (English/Hindi initially).
*   **The Game Master**: Manages "Democracy Quests" and rewards progress with badges.
*   **The Role Expert**: Provides tailored deep-dives for specific personas (e.g., Candidates).

### 2. Feature-Sliced Design (FSD)
The frontend is built with **React 19** following the FSD architectural pattern to ensure maximum modularity, readability, and build integrity.

### 3. Gamification
Learning is structured as "Democracy Quests." Users earn points and badges (e.g., "Informed Citizen") as they progress through interactive modules.

### 4. Build Integrity (Market-Rover Standards)
*   **Secret Management**: Integration with Google Cloud Secret Manager.
*   **Green-on-Arrival**: Strict CI/CD and health monitoring.
*   **PWA**: Offline-first design for accessibility in low-connectivity areas.

## 🛠️ Technology Stack
*   **Frontend**: Vite, React, Tailwind CSS, Framer Motion, Lucide React.
*   **Backend**: FastAPI, LangGraph, LangChain, Google Generative AI (Gemini).
*   **Infrastructure**: Google Cloud (Secret Manager, Cloud Run).

## 🚀 How it Works
1.  **Exploratory Phase**: Users see the "Big Picture" of the election machinery.
2.  **Persona Selection**: Users choose their role (Voter/Candidate).
3.  **Linear Quests**: Guided by AI agents, users complete specific tasks (e.g., "Check Voter Eligibility").
4.  **Reward**: Users earn points and badges stored in their local session.

## ⚠️ Assumptions
*   Information is based on ECI (Election Commission of India) public documents as of 2026.
*   Users have basic internet access for the initial load (PWA handles subsequent offline access).
*   Google Cloud Project `electionrover` is used for secret management.

---
Built for **PromptWars 2026** 🇮🇳
