# Professional Next.js Portfolio & Blog

![Banner](./public/readme-banner.png)

A high-performance, aesthetically pleasing developer portfolio and blog built with the latest web technologies. I am an **ML Engineer** by profession, currently pursuing an **MSc in Natural Language Processing** in Trier, Germany. This project showcases the intersection of modern web development and robust backend systems.

## 🚀 Key Features

- **Rich Text Editor**: Powered by [Tiptap](https://tiptap.dev/), featuring custom extensions for resizable images, code blocks with syntax highlighting, and link normalization.
- **Modern Tech Stack**: Built with Next.js 16 (App Router), React 19, and Tailwind CSS 4 for a future-proof development experience.
- **Robust Backend**: Powered by Django 5.2, utilizing Redis for caching and PostgreSQL for reliable data storage.
- **Dynamic Theming**: Smooth dark/light mode transition with a custom `ThemeProvider`.
- **Witty Error Messaging**: Unique 401 Unauthorized handling with a collection of witty, random messages to delight (or mock) the user.
- **Responsive Design**: Fully optimized for all screen sizes, from mobile to desktop.
- **API Integration**: Robust data fetching and management using Axios with global interceptors for error handling.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Editor**: [Tiptap](https://tiptap.dev/)
- **Language**: TypeScript

### Backend
- **Framework**: [Django 5.2](https://www.djangoproject.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Caching**: [Redis](https://redis.io/)

### Tools & Deployment
- **State/Data**: Axios, React Hot Toast
- **Deployment**: Vercel ready

## 📂 Project Structure

- `app/`: Next.js App Router directory.
  - `components/`: Reusable UI components (Editor, Home, Theme, etc.).
  - `services/`: API service layers for blogs and tags.
  - `constants/`: Global constants and utility functions.
  - `lib/`: Core libraries and shared configurations (API client).
- `public/`: Static assets like icons and images.

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- Yarn / NPM / PNPM

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd next-portfolio
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables:
   Create a `.env.local` file in the root directory and add:
   ```env
   NEXT_PUBLIC_API_BASE_URL=your_api_endpoint
   ```

4. Run the development server:
   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Blog Management

The project includes a robust administrative interface for creating and managing blog posts.
- **Draft Support**: Toggle between draft and published states.
- **Media Management**: Resizable and alignable images within the editor.
- **Tagging System**: Categorize posts for better discoverability.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
