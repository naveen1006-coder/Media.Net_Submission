# Demo script for MediaNet-AdOS (Windows PowerShell)
# Starts the development server in MOCK_MODE

Write-Host "🚀 Starting MediaNet-AdOS Demo..." -ForegroundColor Green
Write-Host ""
Write-Host "Demo URLs available:" -ForegroundColor Cyan
Write-Host "  - demo-coffee"
Write-Host "  - demo-fashion"
Write-Host "  - demo-bakery"
Write-Host "  - demo-fitness"
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
Write-Host ""

$env:MOCK_MODE = "true"
npm run dev
