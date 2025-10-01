# Vercel Clone Frontend

A modern, responsive frontend application that mimics Vercel's design and functionality for deploying projects from GitHub repositories.

## Features

### 🎨 Modern UI/UX
- **Vercel-inspired Design**: Clean, dark theme with modern aesthetics
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle transitions and hover effects for better user experience

### 🚀 Project Management
- **Dashboard Overview**: Real-time stats and project status
- **Project Cards**: Visual representation of deployed projects with status indicators
- **Quick Actions**: Deploy, redeploy, and view projects with one click

### 📦 Deployment Interface
- **GitHub Integration**: Deploy directly from GitHub repository URLs
- **Real-time Logs**: Live deployment logs with syntax highlighting
- **Status Tracking**: Visual indicators for deployment status (building, ready, error)
- **URL Management**: Easy access to deployed project URLs with copy functionality

### 🎯 Key Components

#### Header
- Vercel-style logo and branding
- Navigation menu (Dashboard, Projects, Deployments, Domains)
- User actions (notifications, settings, profile)

#### Sidebar
- Navigation between different sections
- Active state indicators
- Help & Support section

#### Dashboard
- Welcome section with quick project creation
- Statistics cards (Total Projects, Live, Building, Uptime)
- Recent deployments timeline
- Project grid with status indicators

#### Deployment Interface
- GitHub URL input with validation
- Real-time deployment progress
- Live logs with terminal-style output
- Deployment URL display with copy/open actions

#### Project Cards
- Project status with color-coded indicators
- Framework detection
- Last deployment timestamp
- Quick action buttons (View, Redeploy)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect)
- **Real-time Communication**: Socket.io client
- **HTTP Client**: Axios
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

### Static Export

The app is configured for static export:

```bash
npm run export
```

## Configuration

### Backend Integration

The frontend connects to your backend services:

- **API Server**: `http://localhost:9000` (for project deployment)
- **Socket Server**: `http://localhost:9002` (for real-time logs)

Update these URLs in the components if your backend runs on different ports.

### Environment Variables

Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
NEXT_PUBLIC_SOCKET_URL=http://localhost:9002
```

## Project Structure

```
frontend-nextjs/
├── app/
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   ├── header.tsx           # Main header component
│   ├── sidebar.tsx          # Navigation sidebar
│   ├── project-card.tsx     # Project display card
│   └── deployment-interface.tsx # Deployment form and logs
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```

## Features in Detail

### Real-time Deployment Logs
- Terminal-style output with syntax highlighting
- Auto-scrolling to latest log entries
- Color-coded status messages
- Copy functionality for deployment URLs

### Project Status Management
- **Ready**: Project successfully deployed and accessible
- **Building**: Deployment in progress with live updates
- **Error**: Deployment failed with error details

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on smaller screens
- Adaptive grid layouts
- Touch-friendly interface elements

## Customization

### Theme Colors
Update the CSS variables in `globals.css` to customize the color scheme:

```css
.dark {
  --background: 0 0% 0%;        /* Main background */
  --card: 240 3.7% 15.9%;       /* Card backgrounds */
  --border: 240 3.7% 15.9%;     /* Border colors */
  /* ... other variables */
}
```

### Component Styling
All components use Tailwind CSS classes and can be easily customized by modifying the className props.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Vercel Clone application suite.