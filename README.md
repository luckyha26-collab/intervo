# INTERVO - Live Coding Arena & AI Mock Interview Coach

INTERVO is a comprehensive, production-grade AI interview flight simulator and live coding arena featuring Monaco editor code sandboxes, automated test case evaluation, calibrated AI Bar Raiser personas with native Web Speech synthesis, AES-256 client-side vault encryption, and personalized readiness analytics.

---

## 🚀 How to Run on Your Local Device

### Option 1: 1-Click Automated Setup (Windows)
1. Download and extract this project folder to your local machine.
2. Double-click **`run.bat`** (or **`start.bat`**).
3. The script will automatically:
   - Check your Node.js installation (v18+ recommended).
   - Create your local `.env` configuration file from `.env.example`.
   - Install required dependencies via `npm install` (first-time only).
   - Start the development server.
   - Automatically open your default browser to **`http://localhost:3000`**.

---

### Option 2: 1-Click Automated Setup (macOS / Linux)
1. Open your terminal and navigate to the project directory:
   ```bash
   cd /path/to/intervo
   ```
2. Run the startup script:
   ```bash
   chmod +x run.sh
   ./run.sh
   ```
3. The script will verify Node.js, install packages, start the server, and open `http://localhost:3000`.

---

### Option 3: Manual Command Line Setup (Any OS)
If you prefer running commands manually:

1. **Prerequisites**:
   - Ensure Node.js (v18 or higher) is installed: `node -v`
   - Ensure npm is installed: `npm -v`

2. **Setup Environment**:
   ```bash
   cp .env.example .env
   ```
  
3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```

5. **Open in Browser**:
   Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔑 Candidate Access & Demo Accounts

All practice modules and the Live Coding Arena are protected behind zero-leak candidate authentication. You can sign up with any email or use the 1-click verified demo profiles:

| Candidate Name | Role | Email | Password |
|---|---|---|---|
| **Aarav Sharma** | Full Stack Engineer | `aarav@example.com` | `password123` |
| **Priya Patel** | Backend Architect | `priya@example.com` | `password123` |

Or simply click the **"Aarav Sharma"** or **"Priya Patel"** instant demo login buttons directly on the landing page or login modal!

---

## 🛠️ Available Scripts

- **`npm run dev`**: Starts full-stack dev server (Express + Vite) on port 3000.
- **`npm run build`**: Builds the production frontend bundle (`dist/`) and compiles `server.js`.
- **`npm start`**: Runs the compiled production server (`node server.js`).
- **`npm run lint`**: Runs TypeScript type checking (`tsc --noEmit`).

---

## 🛡️ Privacy & Encryption
Candidate resumes and practice scorecards are encrypted in client-side storage using AES-256 encryption.
