#!/usr/bin/env bash
# INTERVO - Local Machine Setup & Runner (macOS / Linux)

cd "$(dirname "$0")" || exit 1

echo "====================================================================="
echo "               INTERVO - LOCAL ENVIRONMENT LAUNCHER"
echo "     Interactive Live Coding Arena & AI Mock Interview Coach"
echo "====================================================================="
echo "Project Directory: $(pwd)"
echo ""

# 1. Check Node.js
echo "[1/4] Checking Node.js runtime..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in your PATH!"
    echo "Please install Node.js (v18 or higher) from https://nodejs.org/"
    exit 1
fi
echo "[OK] Node.js detected: $(node -v)"
echo ""

# 2. Check .env
echo "[2/4] Checking local .env file..."
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "[INFO] Copying .env.example to .env..."
        cp .env.example .env
        echo "[OK] Created .env file."
    else
        echo "GEMINI_API_KEY=\"\"" > .env
        echo "APP_URL=\"http://localhost:3000\"" >> .env
        echo "[OK] Generated default .env file."
    fi
else
    echo "[OK] .env file found."
fi
echo ""

# 3. Check node_modules
echo "[3/4] Verifying dependencies..."
if [ ! -d "node_modules" ]; then
    echo "[INFO] Installing npm packages (first-time setup)..."
    npm install || { echo "[ERROR] npm install failed"; exit 1; }
    echo "[OK] Dependencies installed."
else
    echo "[OK] node_modules found."
fi
echo ""

# 4. Start Server
echo "[4/4] Starting INTERVO development server..."
echo "====================================================================="
echo " * Local Application URL : http://localhost:3000"
echo " * Press Ctrl + C to stop the server"
echo "====================================================================="
echo ""

# Open default browser on macOS or Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    (sleep 2 && open http://localhost:3000) &
elif command -v xdg-open &> /dev/null; then
    (sleep 2 && xdg-open http://localhost:3000) &
fi

npm run dev
