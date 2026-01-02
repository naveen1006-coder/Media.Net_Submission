# MediaNet-AdOS - Contextual Ad Engine

A complete Vite + React application for creating contextual advertising campaigns. Built with React 18, Tailwind CSS, and Lucide icons.

## Features

- **Dynamic Context Generation**: Analyzes URLs and generates relevant ad content dynamically
- **Processing Animation**: Step-by-step UI showing analysis progress
- **Two-Column Workspace**: Intelligence panel and control panel for campaign creation
- **Budget Calculator**: Live calculations for CPM, reach, clicks, and CPC
- **Policy Filter**: Detects prohibited advertising claims
- **ROAS Prediction**: Calculates expected return on ad spend
- **Campaign Persistence**: Saves campaigns to localStorage
- **Accessible Design**: WCAG-compliant with keyboard navigation

## Project Structure

```
media-net-ados/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Pill.jsx
│   │   ├── AdPreview.jsx
│   │   ├── BudgetCard.jsx
│   │   └── StepList.jsx
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Workspace.jsx
│   │   ├── Launch.jsx
│   │   ├── Success.jsx
│   │   └── Dashboard.jsx
│   ├── utils/
│   │   ├── contextGenerator.js
│   │   ├── policyFilter.js
│   │   ├── budgetCalculator.js
│   │   └── storage.js
│   ├── styles/
│   │   └── design-tokens.js
│   └── data/
│       ├── demo_data.json
│       └── db.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm

### Steps

1. **Navigate to the project directory:**
   ```bash
   cd media-net-ados
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:5173` (or the URL shown in terminal)

## Demo Usage

### 3-Step Demo Script

1. **Type a demo shortcut** (or any URL):
   - `demo-coffee` → Coffee shop theme
   - `demo-fashion` → Fashion store theme
   - `demo-bakery` → Bakery theme
   - `demo-fitness` → Fitness/yoga theme
   - Or try: `mikes-coffee.com`, `fashion-store.com`, etc.

2. **Analyze Context:**
   - Click "Analyze Context" button
   - Watch the processing animation (~3 seconds)
   - View intelligently generated topics, headlines, and descriptions

3. **Adjust Budget & Launch:**
   - Select/deselect topics by clicking pills
   - Choose Publisher Mix (Premium News or Niche Blogs)
   - Adjust budget slider ($10-$1000)
   - Edit headline and description in the ad preview
   - Click "Launch Campaign"
   - Review warnings (if any) and confirm
   - See ROAS prediction on success page

## Key Features Explained

### Dynamic Context Generator

The `generateContext(url)` function analyzes the URL and returns different outputs based on:
- **Keywords**: Coffee, fashion, bakery, fitness themes
- **Product paths**: Detects `/product/` or `?product=` for transactional keywords
- **Fallback**: Extracts domain tokens for generic SMB keywords
- **Deterministic randomness**: Uses URL hash for consistent but varied results

### Budget Calculations

Live calculations based on exact formulas:
- **Base CPM**: $4.50
- **Premium News**: CPM × 1.6 = $7.20
- **Niche Blogs**: CPM × 0.7 = $3.15
- **Reach**: `Math.floor((budget / CPM) × 1000)`
- **Est. Clicks**: `Math.round(Reach × CTR)`
- **CPC**: `budget / EstClicks`

### ROAS Calculation

```
avgOrderValue = $25
conversionRate = 2%
estSales = estClicks × 0.02
estRevenue = estSales × $25
ROAS = estRevenue / budget
```

## Deployment to Netlify

### Option 1: Connect Git Repository

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose your repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variable: `MOCK_MODE=true`
   - Click "Deploy site"

### Option 2: Drag & Drop

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy:**
   - Go to [netlify.com/drop](https://app.netlify.com/drop)
   - Drag the `dist` folder
   - Site is live!

## Environment Variables

- `MOCK_MODE`: Set to `true` for demo mode (default: true)

## Design Principles

- **No glassmorphism**: Uses flat cards with subtle shadows
- **Accessibility**: 4.5:1 contrast ratio, keyboard navigation, ARIA labels
- **Inter font**: Via Google Fonts
- **Tailwind CSS**: Utility-first styling
- **Lucide icons**: Modern, lightweight icons

## Testing

All inputs are editable and update the ad preview in real-time. Test with various URLs to see dynamic context generation:

- Coffee/Cafe URLs
- Fashion/Apparel URLs
- Bakery URLs
- Fitness/Gym URLs
- Product-specific URLs with `/product/` path
- Generic domain names

## Policy Filter

Detects and warns about prohibited words:
- `FDA`
- `clinically`
- `cure`
- `guarantee`
- `risk-free`

Requires explicit confirmation before campaign launch if warnings are detected.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT

## Credits

Built with:
- [Vite](https://vitejs.dev/)
- [React 18](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)
