# MediaNet-AdOS - Complete Git-Style File Tree

## 📁 Project Structure

```
media-net-ados/
├── .gitignore
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── scripts/
│   ├── run-demo.ps1
│   └── run-demo.sh
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── AdPreview.jsx
    │   ├── BudgetCard.jsx
    │   ├── Pill.jsx
    │   └── StepList.jsx
    ├── data/
    │   ├── db.json
    │   └── demo_data.json
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── Landing.jsx
    │   ├── Launch.jsx
    │   ├── Success.jsx
    │   └── Workspace.jsx
    ├── styles/
    │   └── design-tokens.js
    └── utils/
        ├── budgetCalculator.js
        ├── contextGenerator.js
        ├── policyFilter.js
        └── storage.js
```

## 📄 File Contents

### Configuration Files

#### `.gitignore`
```gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

#### `package.json`
```json
{
  "name": "media-net-ados",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "demo": "MOCK_MODE=true vite"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

#### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.MOCK_MODE': JSON.stringify(process.env.MOCK_MODE || 'true')
  }
})
```

#### `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          600: '#4338ca',
        },
      },
    },
  },
  plugins: [],
}
```

#### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

#### `index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="MediaNet AdOS - Contextual Ad Engine for Smart Advertising" />
    <title>MediaNet AdOS - Contextual Ad Engine</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

### Source Files

#### `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

#### `src/App.jsx`
```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './pages/Landing';
import { Workspace } from './pages/Workspace';
import { Launch } from './pages/Launch';
import { Success } from './pages/Success';
import { Dashboard } from './pages/Dashboard';

/**
 * Main App Component with Client-Side Routing
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/launch" element={<Launch />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

#### `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f9fafb;
  color: #0b1020;
}

/* Focus styles for accessibility - 4.5:1 contrast ratio minimum */
:focus-visible {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Button base styles */
button {
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Input base styles */
input, textarea {
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
}

/* Card styles - flat, no glassmorphism */
.card {
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Animation utilities */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Checkbox styles */
input[type="checkbox"] {
  cursor: pointer;
  width: 20px;
  height: 20px;
  accent-color: #4f46e5;
}
```

---

### Components

Full component code available in:
- [src/components/Pill.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/components/Pill.jsx)
- [src/components/AdPreview.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/components/AdPreview.jsx)
- [src/components/BudgetCard.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/components/BudgetCard.jsx)
- [src/components/StepList.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/components/StepList.jsx)

---

### Pages

Full page code available in:
- [src/pages/Landing.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/pages/Landing.jsx) - Entry point with URL input
- [src/pages/Workspace.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/pages/Workspace.jsx) - Main campaign workspace
- [src/pages/Launch.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/pages/Launch.jsx) - Campaign confirmation
- [src/pages/Success.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/pages/Success.jsx) - ROAS display
- [src/pages/Dashboard.jsx](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/pages/Dashboard.jsx) - Campaign list

---

### Utilities

Full utility code available in:
- [src/utils/contextGenerator.js](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/utils/contextGenerator.js) - Dynamic context generation
- [src/utils/policyFilter.js](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/utils/policyFilter.js) - Policy violation detection
- [src/utils/budgetCalculator.js](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/utils/budgetCalculator.js) - CPM/ROAS calculations
- [src/utils/storage.js](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/src/utils/storage.js) - localStorage utilities

---

### Data Files

#### `src/data/demo_data.json`
```json
{
  "demo-coffee": "mikes-coffee.com",
  "demo-fashion": "fashion-store.com",
  "demo-bakery": "sweet-bakes-shop.com",
  "demo-fitness": "fit-yoga-studio.com",
  "demo-product": "green-mug-shop.com/product/ceramic-mug"
}
```

#### `src/data/db.json`
```json
{
  "campaigns": []
}
```

---

### Design Tokens

#### `src/styles/design-tokens.js`
```javascript
// Design tokens for MediaNet-AdOS
// No glassmorphism - flat cards with subtle shadows

export const TOKENS = {
  colors: {
    primary: "#4f46e5",
    primary600: "#4338ca",
    neutral900: "#0b1020",
    neutral700: "#374151",
    neutral300: "#d1d5db",
    success: "#16a34a",
    danger: "#ef4444"
  },
  spacing: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24
  },
  radius: {
    default: 8,
    lg: 16
  }
};
```

---

### Scripts

#### `scripts/run-demo.sh` (Bash)
```bash
#!/bin/bash

# Demo script for MediaNet-AdOS
# Starts the development server in MOCK_MODE

echo "🚀 Starting MediaNet-AdOS Demo..."
echo ""
echo "Demo URLs available:"
echo "  - demo-coffee"
echo "  - demo-fashion"
echo "  - demo-bakery"
echo "  - demo-fitness"
echo ""
echo "Starting development server..."
echo ""

export MOCK_MODE=true
npm run dev
```

#### `scripts/run-demo.ps1` (PowerShell)
```powershell
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
```

---

## 🚀 Quick Start

### Installation
```bash
cd media-net-ados
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Demo Script
```bash
# Unix/Mac
bash scripts/run-demo.sh

# Windows PowerShell
.\scripts\run-demo.ps1
```

---

## 🎯 3-Step Demo

1. **Enter URL**: Type `demo-coffee` (or any demo shortcut)
2. **Analyze**: Click "Analyze Context" → watch processing animation
3. **Launch**: Adjust budget → edit ad → launch campaign → view ROAS

---

## 📦 Deploy to Netlify

### Method 1: Git Connection
1. Push to GitHub
2. Netlify → "New site from Git"
3. Build: `npm run build`
4. Publish: `dist`
5. Env: `MOCK_MODE=true`

### Method 2: Drag & Drop
1. Run `npm run build`
2. Drag `dist` to [netlify.com/drop](https://app.netlify.com/drop)

---

## ✅ Features Implemented

- ✅ Vite + React 18
- ✅ Tailwind CSS + Inter font
- ✅ Client-side routing (React Router)
- ✅ Landing, Workspace, Launch, Success, Dashboard pages
- ✅ Dynamic `generateContext(url)` - NOT hardcoded
- ✅ Processing animation (4 steps, ~3 seconds)
- ✅ Two-column workspace
- ✅ Clickable topic pills with toggle
- ✅ Publisher mix selector (Premium/Niche)
- ✅ Budget calculator with exact formulas
- ✅ Live CPM, Reach, Clicks, CPC calculations
- ✅ Editable ad preview (Bing-style)
- ✅ Policy filter with warnings
- ✅ Campaign confirmation page
- ✅ ROAS prediction with breakdown
- ✅ localStorage persistence
- ✅ Accessibility (4.5:1 contrast, keyboard nav)
- ✅ NO glassmorphism (flat design)
- ✅ Demo data and scripts
- ✅ Complete documentation

---

## 📚 Full Documentation

See [README.md](file:///c:/Users/meena/.gemini/antigravity/playground/glacial-omega/media-net-ados/README.md) for complete documentation.

---

**Project Location**: `c:\Users\meena\.gemini\antigravity\playground\glacial-omega\media-net-ados`
