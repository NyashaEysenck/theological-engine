# Micaiah's Stand - Biblical Truth Explorer

A modern web application built with React and TypeScript for exploring biblical truth, understanding common Christian myths, and tracking Bible reading progress.

## Features

- 📖 **Bible Reading Progress Tracker**
  - Sequential and chronological reading plans
  - Chapter-by-chapter progress tracking
  - Historical and geographical context for each chapter
  - Detailed chapter introductions and themes

- 🔍 **Myth Deconstruction**
  - Common Christian myths explored
  - Biblical counter-arguments
  - Scriptural references and context
  - Categorized by topics

- 🛡️ **Core Doctrines**
  - Foundational Christian beliefs
  - Biblical support and definitions
  - Common misunderstandings addressed
  - Clear, balanced explanations

- 📚 **Scripture Context**
  - Commonly misused verses explained
  - Historical and literary context
  - Proper interpretation guidelines
  - Book themes and backgrounds

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Build Tool**: Vite
- **State Management**: React Context API

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── bible/         # Bible reading components
│   └── common/        # Shared components
├── contexts/          # React Context providers
├── data/             # Static data and mock databases
├── pages/            # Route components
├── services/         # API and business logic
├── types/            # TypeScript type definitions
└── utils/            # Helper functions
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Development Features

- **Authentication System**
  - User registration and login
  - Protected routes
  - Session management

- **Progress Tracking**
  - Reading progress persistence
  - Achievement system
  - Experience points and levels
  - Reading streaks

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts
  - Touch-friendly interactions

- **Performance Optimizations**
  - Code splitting
  - Lazy loading
  - Optimized animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)