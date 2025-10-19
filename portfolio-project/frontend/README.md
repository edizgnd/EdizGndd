# Portfolio Frontend

A modern, responsive portfolio website built with React and Tailwind CSS.

## Features

- 📱 Fully responsive design
- 🌐 Bilingual support (Turkish/English)
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and optimized
- 🔧 Admin panel for content management

## Tech Stack

- React 19
- React Router v7
- Tailwind CSS
- Axios
- Radix UI components
- Lucide React icons

## Getting Started

### Prerequisites

- Node.js 16+ 
- Yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

4. Start the development server:
```bash
yarn start
```

The app will run at `http://localhost:3000`

### Building for Production

```bash
yarn build
```

This creates an optimized production build in the `build` folder.

## Deployment to Vercel

### Method 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Method 2: Using Vercel Dashboard

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Configure environment variables:
   - `REACT_APP_BACKEND_URL`: Your backend API URL
4. Deploy

## Project Structure

```
src/
├── components/     # Reusable UI components
│   └── ui/        # Radix UI components
├── context/       # React Context providers
│   └── LanguageContext.js
├── pages/         # Page components
│   ├── HomePage.js
│   └── AdminPanel.js
├── App.js         # Main app component
└── index.js       # Entry point
```

## Environment Variables

- `REACT_APP_BACKEND_URL` - Backend API base URL (required)

## Admin Panel

Access the admin panel at `/admin` to manage:
- Hero section
- Statistics
- About information
- Skills
- Portfolio items
- Work experience & education
- Certificates
- Testimonials
- Contact information
- Received messages

Default admin credentials are managed through your backend.

## License

MIT License
