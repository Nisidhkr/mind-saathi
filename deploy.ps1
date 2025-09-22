# PowerShell Deployment Script for Render
# Run this script to prepare your app for Render deployment

Write-Host "🚀 Preparing Unified Mind App for Render Deployment..." -ForegroundColor Green

# Step 1: Build all components
Write-Host "📦 Building all components..." -ForegroundColor Yellow
npm run build:all

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please check the errors above." -ForegroundColor Red
    exit 1
}

# Step 2: Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Ready for Render deployment"
} else {
    Write-Host "📝 Adding changes to Git..." -ForegroundColor Yellow
    git add .
    git commit -m "Updated for Render deployment - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

Write-Host "✅ Deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Push to GitHub: git remote add origin <your-repo-url> && git push -u origin main"
Write-Host "2. Go to https://render.com and create a new Blueprint"
Write-Host "3. Connect your GitHub repository"
Write-Host "4. Render will automatically detect render.yaml and deploy all services"
Write-Host "5. Set up MongoDB Atlas and add the connection string to environment variables"
Write-Host ""
Write-Host "📖 For detailed instructions, see RENDER_DEPLOYMENT.md" -ForegroundColor Cyan
