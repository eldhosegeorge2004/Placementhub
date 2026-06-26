# 🎓 PlacementHub – AI-Powered Career Prep Platform

PlacementHub is a comprehensive, AI-driven Single Page Application (SPA) designed to help students and developers prepare for their careers. Built from the ground up using **Vanilla JavaScript, HTML, and CSS**, it delivers a seamless, zero-reload experience without the overhead of heavy frontend frameworks. 

The platform leverages the **Google Gemini API** to provide personalized mock interviews, dynamic quizzes, custom study roadmaps, and an interactive coding mentor. 

---

## ✨ Features

### 🤖 4 Powerful AI Modules
- **Mock Interview AI:** Simulates a real technical interview. It dynamically generates follow-up questions and provides instant feedback on your answers using Gemini.
- **AI Knowledge Check:** Dynamically generates multiple-choice quizzes based on any topic and difficulty level you choose.
- **Success Roadmap:** Creates a personalized, week-by-week study or career plan based on your end goals, breaking it down into actionable phases.
- **Coding Club:** An AI coding mentor that can debug your code, explain complex snippets, and optimize algorithms.

### 🛠 Core Tools
- **Resume Builder:** A classic, clean resume generation tool.
- **Typing Mastery:** Practice your typing speed and accuracy.
- **Aptitude Training:** Prepare for standard logical reasoning and math assessments.

### 🔒 Secure Architecture
- **Supabase Authentication:** Secure user registration and login, featuring anti-enumeration protection and robust session validation.
- **Bring Your Own Key (BYOK):** To ensure privacy and zero server-side AI costs, users provide their own free Google Gemini API key. Keys are securely encrypted and stored locally in the browser (`localStorage`).

### 🎨 Premium UI/UX
- Fully responsive, mobile-first design.
- Modern **Glassmorphism** aesthetics with smooth CSS transitions.
- Interactive sidebars and dynamic module loading.

---

## 🚀 Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3 (Flexbox/Grid)
- **Backend & Auth:** Supabase (PostgreSQL, GoTrue Auth)
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Graphics:** Three.js (for holographic AI avatar rendering)

---

## 💻 Running Locally

To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/eldhosegeorge2004/Placementhub.git
cd Placementhub
```

### 2. Install dependencies
This project uses Vite as a fast development server.
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Setup Supabase (Optional)
The project is currently linked to a live Supabase instance. If you want to host your own database:
1. Create a project on [Supabase](https://supabase.com/).
2. Get your Project URL and Anon Key.
3. Update the credentials inside `src/supabaseClient.js`.
4. Ensure Email Confirmations are **disabled** in your Supabase Auth settings to utilize the dummy-email auto-login feature.

### 5. Get a Gemini API Key
To use the AI features, you will need a free Google Gemini API key.
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. When you launch the PlacementHub app, sign up for an account and paste the key into the required field.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
