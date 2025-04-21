# 🧠 Mindful Journal - Modern Mental Wellness Tracker

![Screenshot (1313)](https://github.com/user-attachments/assets/e6040d92-f9a6-4327-b16c-93780c16ef08)

![Screenshot (1316)](https://github.com/user-attachments/assets/4a0c43e9-2cf0-480d-93cc-48cc3e774d87)

![Screenshot (1317)](https://github.com/user-attachments/assets/79dd852c-52bd-4060-82d0-29fee8a765b7)

![Screenshot (1318)](https://github.com/user-attachments/assets/584ee8c2-efc6-41a2-ac61-47eb76889ee9)

![Screenshot (1319)](https://github.com/user-attachments/assets/be2e85f7-a605-47e8-ad32-7ebdd9d48ba5)



- A beautiful, secure, and intelligent journaling app designed for your mental wellness.

- Track moods, tag reflections, measure streaks, and visualize progress — all personalized for you.

- Voice-to-text journaling, calendar heatmaps, PDF export, achievements, and more — powered by Firebase and built with ❤️ using React and TailwindCSS.

## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact

## 📘 Introduction

- Mindful Journal is a clean, responsive, and feature-rich web app focused on mental wellness through daily journaling and self-reflection.

- With personalized dashboards, mood trackers, tag analysis, and achievement streaks, users are empowered to understand their emotions over time.

- Built with Firebase for authentication and Firestore for real-time storage, it offers seamless login/signup, voice journaling, PDF export, and secure cloud sync.

- Perfect for mindful living, productivity, or therapy journaling.



## ✨ Features

🖊️ Rich Journal Entries — Write, edit, delete, and filter daily entries

🎙️ Voice-to-Text Journaling — Dictate your thoughts on the go

📊 Mood & Tag Tracking — Track emotions, filter by tags

📆 Calendar Heatmap — Visualize your journaling frequency

🏆 Streaks & Achievements — Motivation through milestones

📥 Export as PDF — Download entries anytime

👤 Firebase Authentication — Secure sign-up/login system

📈 Personalized Dashboard — Smart analytics for your growth

🌐 Stellar Integration — Blockchain-based reward system for journaling

💫 Modern UI — Sleek, animated, and mobile-friendly

## 🛠 Project Implementation Process

#### 1. Setup & Auth
- Initialized React + Vite for fast dev environment
- Firebase integration for secure auth and Firestore for data storage
- User-specific journal entry saving and fetching

#### 2. Journal & Progress System
- Built rich-text journal system with tags, mood, and date inputs
- Created Progress.jsx for personalized dashboards with streaks, mood charts, word counts, and heatmap

#### 3. Export Setting
- Integrated jsPDF for single-click PDF exporting

#### 4. Polishing
- Added Framer Motion for animations
- Custom gradients, modern layout, and responsive design
- Loading indicators, transitions, and full mobile optimization

## 📁 File Structure

```bash
mindful-journal/
├── public/                # Logo, icons, favicon
├── src/
│   ├── components/        # Navbar, JournalList, Dashboard, etc.
│   ├── context/           # AuthContext for Firebase auth state
│   ├── pages/             # LoginSignup, Journal, Progress, Dashboard
│   ├── styles/            # TailwindCSS config and animations
│   ├── utils/             # Firebase config, Stellar SDK helper
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md   
```

## 💻 Technology Stack

Category	Tech Used

⚛️ Framework	React (with Vite)

🔐 Auth	Firebase Authentication

🧠 Database	Firebase Firestore

🌈 Styling	Tailwind CSS + Framer Motion

🧾 Export	jsPDF

🗣️ Voice Input	Web Speech API

💸 Blockchain	Stellar SDK (Testnet)

📦 Deployment	Vercel

## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/mindful-journal.git
cd mindful-journal
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the frontend

```bash
npm run dev
```

## 🚀 Usage
- Sign up using email/password
- Navigate to Dashboard to see your wellness stats
- Go to Journal → write or dictate your entry
- Track your mood, tags, and reflections
- See progress on the Progress page
- Earn rewards through journaling (via Stellar)
- Export entries as PDF or analyze trends over time


## 📸 Screenshots

![Screenshot (1312)](https://github.com/user-attachments/assets/22737251-51f0-427f-8e0d-46ab60079213)

![Screenshot (1314)](https://github.com/user-attachments/assets/4b4797b7-b1bb-406a-ad3f-fcef1771790d)

![Screenshot (1315)](https://github.com/user-attachments/assets/43689fc7-f7d9-45dc-b682-c53ee96530d3)

![Screenshot (1316)](https://github.com/user-attachments/assets/4a0c43e9-2cf0-480d-93cc-48cc3e774d87)

![Screenshot (1317)](https://github.com/user-attachments/assets/79dd852c-52bd-4060-82d0-29fee8a765b7)

![Screenshot (1318)](https://github.com/user-attachments/assets/584ee8c2-efc6-41a2-ac61-47eb76889ee9)

![Screenshot (1319)](https://github.com/user-attachments/assets/be2e85f7-a605-47e8-ad32-7ebdd9d48ba5)

![Screenshot (1320)](https://github.com/user-attachments/assets/c9deaa43-0f61-4abd-bc50-3f9301d4cceb)

![Screenshot (1321)](https://github.com/user-attachments/assets/d4b4860f-ee60-4e2c-a73e-3bbc43d852c3)

![Screenshot (1322)](https://github.com/user-attachments/assets/37334ccc-cf75-4329-be0e-6869c000b783)

![Screenshot (1323)](https://github.com/user-attachments/assets/a3a40b07-0644-41e5-ac9b-d91ffcb66dac)

![Screenshot (1324)](https://github.com/user-attachments/assets/8efa8152-3e00-476a-b5b0-f8f20da8191e)

![Screenshot (1325)](https://github.com/user-attachments/assets/34110d5a-d492-457f-a932-a27fdb68aeaf)

![Screenshot (1326)](https://github.com/user-attachments/assets/2759ece0-1035-487e-992f-2771eb5932ff)

![Screenshot (1327)](https://github.com/user-attachments/assets/3a18aa79-a409-4460-bc22-939ff675c74d)

![Screenshot (1328)](https://github.com/user-attachments/assets/d1d71800-00ff-4715-93b7-baf5744ef754)

![Screenshot (1329)](https://github.com/user-attachments/assets/a1ee4fe6-ebda-4aaa-8d35-c246bfe07d0f)

![Screenshot (1330)](https://github.com/user-attachments/assets/f3079527-cb6c-408a-a725-f699afd56069)

## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
