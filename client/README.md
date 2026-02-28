# Academic Status Transparency Notification System (MVP)

A Minimum Viable Product (MVP) for a higher education institution's Academic Status Transparency Notification System. 

It uses a simulated MERN environment (built completely in React, Vite, and Tailwind CSS with local state mock data) designed to provide administration tools to educators and tokenized transparency to parents/guardians.

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have Node.js and `npm` installed.

### Installation & Execution
1. Open your terminal in this directory (`minor_prject`).
2. Install the necessary dependencies (if you haven't already):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Look at the terminal output and click the Local link provided (usually `http://localhost:4173`).

---

## 🔑 Login & Accountability (How to Test This)

### 1. Institution Admin Portal
Navigate to `/` (the root URL). You will see the Admin Login page.
*   **Username:** `admin`
*   **Password:** `admin123`

### 2. The Admin Dashboard
Once logged in, you will be redirected to the Dashboard at `/dashboard`. 
*   **Accountability Check:** Verify that clicking the "**Send Report**" button triggers a toast notification explicitly stating that an email has been sent to the student's designated contact email.
*   **Security Check:** If you attempt to access `/dashboard` without logging in, the app will kick you back to the login page.

### 3. The Parent/Guardian View
This is the simulated token URL. Parents do **not** need to log in to see this—they simply follow the secure link sent via email. 
*   Visit `http://localhost:4173/report/2302621` directly in your browser.
*   **Accountability Check:** Try changing the URN at the end of the URL (e.g., to `2302624` for a detained student) to see the color-coded UI change from Green (Eligible) to Red (Detained). Check how it looks on mobile by shrinking the browser window.

---

## 📂 Where to Look for Which Steps (Project Structure)

Here is a breakdown of the important files in this project:

```text
src/
├── App.jsx                     # 📍 Main Router & Protected Route logic
├── index.css                   # 📍 Tailwind CSS style configuration
│
├── data/
│   └── mockDB.js               # 📍 Mock database (5 students, SGPA, attendance, marks)
│
└── pages/
    ├── LoginPage.jsx           # 📍 Step 1: Login Card & mock authentication logic
    ├── AdminDashboard.jsx      # 📍 Step 2: Core Admin table and Toast report logic
    └── ParentView.jsx          # 📍 Step 3: Mobile-responsive Parent Dashboard (read-only)
```

## 🛠 Tech Stack Used
*   **React** for building the component-based UI.
*   **Vite** for the build tool and local development server.
*   **Tailwind CSS (v3)** for rapid, clean, institutional styling (Blues and Whites).
*   **React Router v7** for handling the different page locations (Login vs Admin vs Parent).
*   **Lucide React** for the professional SVG icons.
*   **Sonner** for the sleek "Toast" alert notifications when sending emails.
