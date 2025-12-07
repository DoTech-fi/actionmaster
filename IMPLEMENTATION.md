# Jenkins-Inspired DevOps Dashboard - Implementation

## Overview
A modernized DevOps dashboard inspired by Jenkins, featuring a warm dark theme with a fixed sidebar, top navigation, and an elegant tree view for visualizing YAML-based folder hierarchies.

## Features Implemented

### 1. **Fixed Left Sidebar** (`src/components/dashboard/Sidebar.tsx`)
- Fixed width navigation (240px on desktop, collapsible on mobile)
- Warm charcoal background (#1b1b1d)
- Menu items: New Item, Build History, Project Relationship, Check Fingerprint
- Active state with amber accent border and glow animation
- Responsive: collapses to icon-only on smaller viewports
- Version display in footer

### 2. **Top Navigation Bar** (`src/components/dashboard/TopNav.tsx`)
- Full-width header with branding, search, and user actions
- Search bar with warm styling and focus states
- Notification bell with active indicator
- User profile section with avatar
- Settings access
- Elevated with shadow for visual hierarchy

### 3. **Main Content Area** (`src/components/dashboard/MainContent.tsx`)
- Flexible canvas with generous padding
- Stats grid showing key metrics:
  - Total Builds
  - Success Rate
  - Active Pipelines
  - Failed Builds
- Recent Activity feed with status indicators
- Warm-gray panel backgrounds (#252527)

### 4. **Tree View Component** (`src/components/dashboard/TreeView.tsx`)
- Displays YAML-based folder hierarchies
- Refresh functionality
- Footer with repository statistics
- Smooth animations and hover states

### 5. **Tree Node (Recursive)** (`src/components/dashboard/TreeNode.tsx`)
- Recursive component supporting multi-level nesting
- Expand/collapse with smooth chevron rotation (200ms ease-out)
- Visual depth cues with connecting lines
- Icons for folders, repositories, and files
- Warm hover states with amber glow
- Active selection highlighting
- Status badges for repositories

## Design System

### Color Palette
- **Base Background**: #111113 (deep warm charcoal)
- **Sidebar Background**: #1b1b1d (warm charcoal)
- **Panel Background**: #252527 (elevated warm-gray)
- **Text Primary**: #ececec (warm white)
- **Text Secondary**: #b8b8b8 (warm gray)
- **Accent Primary**: #f4c15d (amber/gold)
- **Accent Secondary**: #4ea8de (warm blue)

### Typography
- **JetBrains Mono**: Code-like elements (repository names, file paths)
- **Space Grotesk**: Headings and navigation labels
- **Manrope**: Body text and descriptions

### Animations
- Tree node expansion: 200ms ease-out
- Hover states: 150ms ease-out with scale (1.01x)
- Active nav item: 250ms cubic-bezier with glow pulse
- All animations are smooth and purposeful

### Visual Effects
- Subtle noise texture overlay on main background
- Soft shadows on panels for Z-axis separation
- Semi-transparent connecting lines in tree view
- Warm glow on hover states

## Component Architecture

```
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.tsx       # Main container
│   │   ├── Sidebar.tsx         # Left navigation
│   │   ├── TopNav.tsx          # Top header
│   │   ├── MainContent.tsx     # Main content area
│   │   ├── TreeView.tsx        # Tree container
│   │   ├── TreeNode.tsx        # Recursive tree node
│   │   └── index.ts            # Barrel exports
│   └── home.tsx                # Route component
└── index.css                   # Global styles & theme
```

## Responsive Design
- **Desktop (lg+)**: Full sidebar (240px), all features visible
- **Tablet (md)**: Sidebar overlay mode
- **Mobile (sm)**: Collapsible sidebar with hamburger menu
- Stats grid adapts from 4 columns to 2 to 1

## Mock Data
The tree view currently displays mock YAML-based folder hierarchies with:
- Production environment (frontend & backend services)
- Staging environment (test environments)
- Development environment (feature branches)

## Future Enhancements
- Connect to real Jenkins API
- Add build logs viewer
- Implement search functionality
- Add filtering and sorting options
- Real-time build status updates
- User authentication and permissions
- Customizable dashboard layouts

## Technical Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React
- **Routing**: React Router v6
- **UI Components**: Custom components with Radix UI primitives

## Running the Application
```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```
