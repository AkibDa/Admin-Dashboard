# GreenPlate Admin Dashboard

A modern, feature-rich admin dashboard for managing the GreenPlate platform built with React, Vite, Tailwind CSS, and Firebase.

## 📋 Overview

The GreenPlate Admin Dashboard is a comprehensive administration interface designed to manage college food stalls, student data, and domains. It provides secure authentication, role-based access control, and real-time data management capabilities.

## 🎯 Features

- **Authentication & Authorization**
  - Firebase-based email and password authentication
  - Admin role verification
  - Protected routes for authorized access only
  - Persistent user sessions with auth state management

- **Dashboard**
  - Real-time statistics (Total Stalls, Active Bookings, Total Users, etc.)
  - Visual analytics with gradient cards
  - Quick overview of platform metrics

- **Stalls Management**
  - View all registered food stalls
  - Add new stalls with details (name, email, etc.)
  - Edit existing stall information
  - Delete stalls from the system
  - Toggle stall verification status
  - Search and filter capabilities

- **Domains Management**
  - Manage college domains
  - Add, edit, and delete domains
  - Campus/college organization support

- **Students Management**
  - Student data management interface
  - Integration with college domain system

- **Responsive Design**
  - Mobile-friendly interface using Tailwind CSS
  - Sidebar navigation with dynamic routing
  - Clean and intuitive UI components

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **Styling**: Tailwind CSS 4.1.18
- **Backend Services**: Firebase (Authentication & Firestore)
- **Linting**: ESLint 9.39.1

## 📁 Project Structure

```
src/
├── app/
│   ├── api.js                 # API configuration and endpoints
│   ├── config.js              # Application configuration
│   └── firebase.js            # Firebase initialization
│
├── components/
│   ├── Button.jsx             # Reusable button component
│   ├── Input.jsx              # Reusable input field component
│   ├── Loader.jsx             # Loading indicator component
│   ├── Modal.jsx              # Modal dialog component
│   ├── Navbar.jsx             # Top navigation bar
│   └── Sidebar.jsx            # Left sidebar navigation
│
├── context/
│   └── AuthContext.jsx        # Authentication context provider
│
├── pages/
│   ├── Dashboard/
│   │   ├── Dashboard.jsx      # Main dashboard page with stats
│   │   └── DashboardLayout.jsx # Dashboard layout wrapper
│   ├── Domains/
│   │   └── Domains.jsx        # Domain management page
│   ├── Login/
│   │   └── Login.jsx          # Login authentication page
│   ├── Stalls/
│   │   └── Stalls.jsx         # Stall management page
│   └── Students/
│       └── Students.jsx       # Student management page
│
├── routes/
│   ├── AppRoutes.jsx          # Main route configuration
│   └── ProtectedRoute.jsx     # Protected route wrapper
│
├── services/
│   ├── authService.js         # Authentication service methods
│   ├── collegeService.js      # College-related API services
│   ├── domainService.js       # Domain management services
│   ├── stallService.js        # Stall management services
│   └── studentService.js      # Student management services
│
├── App.jsx                    # Root application component
├── index.css                  # Global styles
└── main.jsx                   # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Firebase project with authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Admin-Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The dashboard will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## 🔐 Authentication Flow

1. Users navigate to the login page (`/login`)
2. Firebase authenticates users with email and password
3. Admin status is verified from the database
4. Authenticated users are redirected to the dashboard
5. Protected routes ensure only authorized users can access admin features
6. Session persists across page refreshes using Firebase auth state

## 🗺️ Route Structure

| Route | Component | Protection | Description |
|-------|-----------|-----------|-------------|
| `/login` | Login | Public | User authentication page |
| `/dashboard` | Dashboard | Protected | Main dashboard with statistics |
| `/stalls` | Stalls | Protected | Food stall management |
| `/domains` | Domains | Protected | College domain management |
| `*` | Dashboard | Protected | Default redirect for unmatched routes |

## 🔧 Key Components

### AuthContext
Manages global authentication state including:
- Current logged-in user
- Admin verification status
- Login/logout functionality
- Auth state persistence

### ProtectedRoute
Wrapper component that:
- Checks if user is authenticated
- Verifies admin privileges
- Redirects to login if unauthorized

### Services Layer
Each service module handles API calls for:
- Authentication operations
- Stall CRUD operations
- Domain management
- Student data management
- College information

## 🎨 Styling

The project uses Tailwind CSS 4.1.18 with:
- Utility-first approach
- Custom color schemes (green/emerald for GreenPlate branding)
- Responsive breakpoints
- Gradient backgrounds for visual appeal

## ⚙️ Configuration Files

- `vite.config.js` - Vite build configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint rules for code quality
- `package.json` - Project dependencies and scripts

## 🔄 Development Workflow

1. **Components**: Reusable UI components in `/components`
2. **Pages**: Full page views in `/pages` with layouts
3. **Services**: API integration and data fetching in `/services`
4. **Context**: Global state management via React Context API
5. **Routes**: Client-side routing via React Router

## 📱 Responsive Breakpoints

The dashboard is optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop screens (1024px and up)

## 🐛 Known Issues

- Students page component is currently empty and needs implementation

## 🤝 Contributing

When contributing to this project:
1. Follow the existing code structure and naming conventions
2. Use functional components with React hooks
3. Maintain component modularity
4. Ensure proper error handling in services
5. Update this README with any significant changes

## 📝 License

See the LICENSE file for details.

## 📧 Support

For issues, questions, or suggestions, please open an issue in the repository.