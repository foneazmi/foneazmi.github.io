# Farkhan Azmi Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features a Progressive Web App (PWA) with offline support, dynamic content loading, and a beautiful glassmorphism design.

## 🚀 Features

- **Modern Tech Stack**: React 19, TypeScript 6, Vite 8
- **Progressive Web App**: Offline support with service workers
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **Dynamic Content**: API-driven portfolio data with caching
- **Performance Optimized**: Code splitting, lazy loading, and optimized animations
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Testing**: Vitest with React Testing Library
- **Deployment**: Cloudflare Pages with GitHub Pages fallback

## 📋 Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher (recommended) or Node.js v18+
- Git

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/foneazmi/foneazmi.github.io.git
cd foneazmi.github.io
```

2. Install dependencies:
```bash
bun install
```

## 🏃 Development

Start the development server:
```bash
bun run dev
```

The site will be available at `http://localhost:5173`

## 🧪 Testing

Run tests:
```bash
bun test
```

Run tests with UI:
```bash
bun run test:ui
```

Run tests with coverage:
```bash
bun run test:coverage
```

## 🏗️ Building

Build for production:
```bash
bun run build
```

Preview production build:
```bash
bun run preview
```

## 📦 Deployment

### Cloudflare Pages

Deploy to Cloudflare Pages:
```bash
bun run deploy
```

This will:
1. Build the production bundle
2. Deploy to Cloudflare Pages
3. Deploy to GitHub Pages as fallback

### Manual Deployment

The `dist/` folder contains the production build and can be deployed to any static hosting service.

## 🎨 Project Structure

```
foneazmi.github.io/
├── public/              # Static assets
│   ├── icons/          # PWA icons
│   └── favicon.ico     # Favicon
├── src/
│   ├── components/     # React components
│   │   ├── common/    # Reusable components
│   │   └── features/  # Feature-specific components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── layouts/       # Layout components
│   ├── lib/           # Utilities and constants
│   ├── pages/         # Page components
│   ├── routes/        # Route configuration
│   ├── styles/        # Global styles
│   ├── test/          # Test utilities
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Helper functions
├── dist/              # Production build output
├── index.html         # HTML entry point
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies
```

## 🔧 Configuration

### Environment Variables

No environment variables are required for basic operation. The portfolio data is fetched from a public API endpoint.

### PWA Configuration

PWA settings can be modified in `vite.config.ts`:
- Icons: `public/icons/`
- Manifest: Configured in VitePWA plugin
- Service Worker: Auto-generated with Workbox

### API Configuration

API retry and cache settings are in `src/lib/portfolio-constants.ts`:
- Cache TTL: 7 days
- Max retries: 2
- Retry delays: 100ms base, 2000ms max

## 🧰 Tech Stack

### Core
- **React 19** - UI library
- **TypeScript 6** - Type safety
- **Vite 8** - Build tool and dev server

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Icon library

### Routing
- **React Router 7** - Client-side routing

### Testing
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **Happy DOM** - DOM implementation for tests

### Build & Deploy
- **Vite PWA Plugin** - Progressive Web App support
- **Cloudflare Pages** - Primary hosting
- **GitHub Pages** - Fallback hosting

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |
| `bun run lint` | Run ESLint |
| `bun test` | Run tests in watch mode |
| `bun run test:ui` | Run tests with UI |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run test:run` | Run tests once |
| `bun run deploy` | Build and deploy to Cloudflare Pages + GitHub Pages |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Farkhan Azmi**

- GitHub: [@foneazmi](https://github.com/foneazmi)
- Website: [foneazmi.github.io](https://foneazmi.github.io)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons by [Lucide](https://lucide.dev/)
- Fonts: Plus Jakarta Sans, Space Grotesk
