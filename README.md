# Anagram Checker

A fast and intuitive web application to find anagrams for any English word. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Instant Anagram Finding**: Enter a word and get all possible anagrams instantly
- **Word Validation**: Checks if your input is a valid English word
- **Search History**: Keep track of your previous searches
- **Copy to Clipboard**: Easily copy anagrams with a single click
- **Responsive Design**: Works seamlessly on desktop and mobile devices


## Screenshots

### Checker Page - Desktop
![Checker Desktop](/public/screenshots/checker_desk.png)

### Checker Page - Mobile
![Checker Mobile](/public/screenshots/checker_mobile.png)

### History Page - Desktop
![History Desktop](/public/screenshots/history_desk.png)

### History Page - Mobile
![History Mobile](/public/screenshots/history_mobile.png)

## Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun** (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnicetJonhia/anagram-checker.git
   cd anagram-checker
   ```

2. **Install dependencies**

   Using **Bun** (recommended):
   ```bash
   bun install
   ```

   Or using **npm**:
   ```bash
   npm install
   ```

### Running the Application

#### Development Mode

Using **Bun**:
```bash
bun run dev
```

Using **npm**:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Build

Using **Bun**:
```bash
bun run build
bun run start
```

Using **npm**:
```bash
npm run build
npm start
```

## Project Structure

```
anagram-checker/
├── app/
│   ├── page.tsx              # Main anagram checker page
│   ├── history/
│   │   └── page.tsx          # Search history page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── AnagramChecker.tsx    # Main component
│   ├── Navigation.tsx        # Navigation component
│   ├── ui/                   # Reusable UI components
│   └── theme-provider.tsx    # Theme configuration
├── lib/
│   ├── anagramUtils.ts       # Anagram finding logic
│   └── utils.ts              # Utility functions
├── public/
│   ├── wordlist.txt          # Dictionary of valid English words
│   └── screenshots/          # Application screenshots
├── package.json
├── tsconfig.json
├── next.config.mjs
└── postcss.config.mjs
```

## How It Works

1. **Word Input**: Enter any English word in the input field
2. **Validation**: The app checks if the word is valid against a comprehensive word list
3. **Anagram Search**: Finds all valid English words that are anagrams of your input
4. **History Tracking**: Automatically saves your searches to browser history
5. **Easy Copying**: Click on any anagram to copy it to your clipboard

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Package Manager**: [Bun](https://bun.sh/) (recommended) or npm

## Performance

- Optimized word list loading for instant searches
- Debounced input handling to reduce unnecessary computations
- Efficient anagram algorithm for fast results
- Browser history stored in localStorage

## Browser Support

Works on all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+



## Author

[AnicetJonhia](https://github.com/AnicetJonhia)

---

Enjoy finding anagrams! 🎯
