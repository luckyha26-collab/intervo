@echo off
setlocal enabledelayedexpansion

:: Switch to the script's directory so paths are always relative to the project root
cd /d "%~dp0"

:: Set console title and UTF-8 encoding
title INTERVO - Live Coding Arena ^& AI Mock Interview Coach
chcp 65001 >nul

cls
echo =====================================================================
echo                INTERVO - LOCAL ENVIRONMENT LAUNCHER
echo      Interactive Live Coding Arena ^& AI Mock Interview Coach
echo =====================================================================
echo Project Directory: %~dp0
echo.

:: 1. Verify Node.js
echo [1/4] Checking Node.js runtime...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ---------------------------------------------------------------------
    echo [ERROR] Node.js is not installed or not in your system PATH!
    echo.
    echo To fix this:
    echo 1. Download Node.js (LTS version 18 or 20+ recommended) from:
    echo    https://nodejs.org/
    echo 2. Run the installer and make sure "Add to PATH" is checked.
    echo 3. Restart this script after installing.
    echo ---------------------------------------------------------------------
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
echo [OK] Node.js detected: %NODE_VERSION%
echo.

:: 2. Verify and configure .env
echo [2/4] Checking local .env file...
if not exist ".env" (
    if exist ".env.example" (
        echo [INFO] No .env found. Automatically creating .env from .env.example...
        copy ".env.example" ".env" >nul
        echo [OK] .env file created successfully!
    ) else (
        echo [INFO] Generating default .env file...
        echo # INTERVO Local Environment > .env
        echo GEMINI_API_KEY="" >> .env
        echo APP_URL="http://localhost:3000" >> .env
        echo [OK] Created default .env file.
    )
    echo.
    echo [TIP] You can open .env in any text editor and add your GEMINI_API_KEY
    echo       if you wish to use server-side live Gemini AI prompts.
) else (
    echo [OK] Existing .env file found.
)
echo.

:: 3. Check and install dependencies
echo [3/4] Verifying node_modules dependencies...
if not exist "node_modules\" (
    echo [INFO] First-time setup detected. Installing all npm packages...
    echo Please wait a moment while npm installs packages...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] 'npm install' encountered an issue!
        echo Please ensure you have an active internet connection.
        echo Try running 'npm install' directly in cmd if needed.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependencies installed successfully!
) else (
    echo [OK] node_modules folder is already present.
)
echo.

:: 4. Start local development server
echo [4/4] Starting INTERVO development server on your local machine...
echo.
echo =====================================================================
echo  * Local Application URL : http://localhost:3000
echo  * Status                : Server starting...
echo  * To Stop Server        : Press Ctrl + C in this terminal window
echo =====================================================================
echo.

:: Automatically open browser at http://localhost:3000 after 3 seconds
start "" /b cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: Start the Vite + Express full-stack development server
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] Process ended with exit code %errorlevel%.
)

echo.
echo Server has been stopped.
pause
