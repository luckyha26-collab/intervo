# INTERVO - PowerShell Environment Launcher
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "INTERVO - Live Coding Arena"

$ProjectDir = $PSScriptRoot
if (-not $ProjectDir) { $ProjectDir = Get-Location }
Set-Location -Path $ProjectDir

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "               INTERVO - LOCAL ENVIRONMENT LAUNCHER                 " -ForegroundColor Cyan
Write-Host "     Interactive Live Coding Arena & AI Mock Interview Coach        " -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "Project Directory: $ProjectDir`n"

# 1. Verify Node.js
Write-Host "[1/4] Checking Node.js runtime..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "[OK] Node.js detected: $nodeVersion`n" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not found in your system PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js (v18+) from https://nodejs.org/"
    pause
    exit 1
}

# 2. Check .env file
Write-Host "[2/4] Checking local .env file..." -ForegroundColor Yellow
$envPath = Join-Path $ProjectDir ".env"
$envExamplePath = Join-Path $ProjectDir ".env.example"
if (-not (Test-Path $envPath)) {
    if (Test-Path $envExamplePath) {
        Copy-Item -Path $envExamplePath -Destination $envPath
        Write-Host "[OK] Created .env from .env.example`n" -ForegroundColor Green
    } else {
        Set-Content -Path $envPath -Value "GEMINI_API_KEY=`"`"`nAPP_URL=`"http://localhost:3000`""
        Write-Host "[OK] Created default .env file`n" -ForegroundColor Green
    }
} else {
    Write-Host "[OK] Existing .env file found.`n" -ForegroundColor Green
}

# 3. Verify dependencies
Write-Host "[3/4] Verifying node_modules..." -ForegroundColor Yellow
$modulesPath = Join-Path $ProjectDir "node_modules"
if (-not (Test-Path $modulesPath)) {
    Write-Host "[INFO] Installing dependencies via npm install..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed." -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "[OK] Dependencies installed.`n" -ForegroundColor Green
} else {
    Write-Host "[OK] node_modules folder is present.`n" -ForegroundColor Green
}

# 4. Launch server and open browser
Write-Host "[4/4] Starting INTERVO server..." -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host " * Local URL    : http://localhost:3000" -ForegroundColor Green
Write-Host " * To stop      : Press Ctrl + C" -ForegroundColor Gray
Write-Host "=====================================================================`n" -ForegroundColor Cyan

Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:3000"
} | Out-Null

npm run dev
