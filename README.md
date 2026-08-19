# AceAI

<p align="center">
  <strong>AI-Powered Interview Preparation Platform</strong>
</p>

<p align="center">
  Turn any job description and your profile into a personalized interview preparation strategy.
</p>

<p align="center">
  <a href="https://aceai.site/register">🌐 Live Demo</a>
  &nbsp;&nbsp;•&nbsp;&nbsp;
  <a href="https://github.com/Citu388/AceAI">💻 GitHub Repository</a>
</p>

---

## About AceAI

**AceAI** is an AI-powered interview preparation platform that helps candidates prepare specifically for the job they are applying for.

Instead of providing generic interview questions, AceAI analyzes the **target job description** along with the candidate's **resume or self-description** and generates a personalized interview preparation strategy.

The platform identifies the skills required for the role, compares them with the candidate's profile, and creates a preparation roadmap containing technical questions, behavioral questions, and areas that need improvement.

### How it works

```text
                 ┌──────────────────────┐
                 │   Target Job         │
                 │   Description        │
                 └──────────┬───────────┘
                            │
                 ┌──────────▼───────────┐
                 │   Your Resume /      │
                 │   Profile            │
                 └──────────┬───────────┘
                            │
                            ▼
                  ┌───────────────────┐
                  │       AceAI       │
                  │   AI Analysis     │
                  └─────────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │Technical │  │Behavioral│  │  Roadmap │
        │Questions │  │Questions │  │          │
        └──────────┘  └──────────┘  └──────────┘
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                  ┌───────────────────┐
                  │   Match Score &   │
                  │    Skill Gaps     │
                  └───────────────────┘
```

---

## Key Features

### Job Description Analysis

Paste the complete job description for the position you're targeting.

AceAI uses the job requirements to understand:

- Required technical skills
- Role-specific knowledge
- Expected experience
- Important technologies
- Areas that should be prioritized during preparation

---

### Resume & Profile Analysis

You can provide your profile in two ways:

- Upload your **Resume** in PDF or DOCX format
- Provide a **Quick Self-Description** containing your experience and skills

AceAI uses this information to personalize the preparation strategy according to your actual background.

---

### Personalized Interview Strategy

AceAI generates an interview preparation strategy based on the relationship between:

**Job Requirements ↔ Candidate Profile**

This makes the preparation targeted toward the specific role instead of relying on generic interview questions.

---

## Application Flow

### Step 1 — Enter Target Job Description

Paste the job description of the position you want to apply for.

```text
Target Job Description
        ↓
Analyze requirements
```

### Step 2 — Add Your Profile

Upload your resume or provide a quick self-description.

```text
Resume / Self Description
        ↓
Analyze candidate profile
```

### Step 3 — Generate Strategy

AceAI generates a personalized preparation strategy.

```text
Job Description + Profile
            ↓
       AI Analysis
            ↓
  Personalized Strategy
```

### Step 4 — Prepare

The generated preparation dashboard includes:

- Technical Questions
- Behavioral Questions
- Road Map

### Step 5 — Identify Your Gaps

Review:

- Match Score
- Strengths
- Skill Gaps
- Areas to Improve

This gives you a clear direction for your interview preparation.

---

## Interview Preparation Dashboard

The dashboard provides a structured preparation experience with separate sections for:

| Section | Purpose |

| Technical Questions | Prepare for technical interviews |
| Behavioral Questions | Prepare for behavioral interviews |
| Road Map | Follow a personalized preparation plan |
| Match Score | Understand your fit for the role |
| Skill Gaps | Identify areas requiring improvement |

---

## Tech Stack

### Frontend

- **React.js**
- **Vite**
- **SCSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**

### AI

- AI API integration for:
  - Job description analysis
  - Candidate profile analysis
  - Interview question generation
  - Personalized preparation strategies
  - Skill gap identification

### Deployment

- **AWS EC2**
- **Ubuntu**
- **Nginx**
- **PM2**
- **HTTPS / SSL**

---

## Architecture

```text
                         ┌──────────────┐
                         │    User      │
                         └──────┬───────┘
                                │
                                ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       Vite          │
                    └──────────┬──────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │       Backend       │
                    └───────┬───────┬─────┘
                            │       │
                    ┌───────┘       └────────┐
                    ▼                        ▼
             ┌──────────────┐        ┌──────────────┐
             │   MongoDB    │        │    AI API    │
             │   Database   │        │              │
             └──────────────┘        └──────────────┘
```

---

## Project Structure

```text
AceAI/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Citu388/AceAI.git

cd AceAI
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

---

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The application will now be available on your local development server.

---

## Environment Variables

Sensitive credentials should **never** be committed to GitHub.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AI_API_KEY=your_ai_api_key
```

Make sure `.env` is included in `.gitignore`.

---

## Deployment

AceAI is deployed on **AWS EC2**.

The production architecture uses Nginx as a reverse proxy and PM2 to manage the Node.js backend process.

```text
                       Internet
                           │
                           ▼
                     aceai.site
                           │
                           ▼
                        Nginx
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
          React Frontend        /api → Backend
                                      │
                                      ▼
                                Node.js + Express
                                      │
                                      ▼
                                   MongoDB
```

### Production Technologies

- AWS EC2
- Ubuntu
- Nginx
- Node.js
- PM2
- MongoDB
- HTTPS
- Custom Domain

---

## Security

AceAI implements common web application security practices including:

- JWT-based authentication
- Protected routes
- Environment variables for sensitive credentials
- CORS configuration
- HTTPS in production
- Secure API communication

---

## Problem AceAI Solves

Preparing for interviews using generic question lists can make it difficult to know **what to study for a specific job**.

```

Instead of asking:

> "What interview questions should I prepare?"

AceAI helps answer:

> **"What should I prepare for THIS job based on MY profile?"**

---

## Future Improvements

-[ ]Voice-based AI interviews
-[ ]Real-time interview simulation
-[ ]Coding interview environment
-[ ]AI-generated answer evaluation
-[ ]More detailed skill-gap analysis
-[ ]Interview progress tracking
-[ ]Personalized learning resources
-[ ]More interview categories
-[ ]Advanced interview analytics
-[ ]Company-specific interview preparation

---

## Live Demo

Try AceAI:

### 👉 [https://aceai.site/register](https://aceai.site/register)

---

## 👨‍💻 Author

### Citu Sangwan

Software Engineer | MERN Stack Developer | Freelance Developer

<p>
  <a href="https://github.com/Citu388">GitHub</a>
</p>

---

## ⭐ Support

If you find **AceAI** useful, consider giving the repository a ⭐ on GitHub.

**Built with React, Node.js, MongoDB and AI.**
```
