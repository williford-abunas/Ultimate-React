# The Wild Oasis - Cabin Booking Management System

A modern, full-stack cabin booking management application built with React, Vite, and Supabase. This application provides a comprehensive dashboard for managing cabin rentals, bookings, guest check-ins, and business analytics.

## 🌟 Features

### Dashboard
- **Real-time Analytics**: View booking statistics, sales data, occupancy rates, and check-in metrics
- **Interactive Charts**: Visualize booking trends and duration patterns using Recharts
- **Filter Controls**: Filter dashboard data by date ranges and other criteria

### Cabin Management
- **Cabin Catalog**: Browse and manage luxury cabin inventory (8 different cabin types)
- **CRUD Operations**: Create, read, update, and delete cabin listings
- **Image Management**: Upload and manage cabin photos with Supabase storage
- **Pricing Management**: Set regular prices and discount rates for each cabin

### Booking System
- **Booking Management**: View, create, and manage guest bookings
- **Check-in/Check-out**: Streamlined guest check-in and check-out processes
- **Guest Information**: Track guest details and special requests
- **Payment Tracking**: Monitor booking payment status

### User Management
- **Authentication**: Secure login and user registration with Supabase Auth
- **User Profiles**: Manage user accounts and personal information
- **Role-based Access**: Protected routes and user permissions

### Additional Features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live data synchronization with Supabase
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Form Validation**: Robust form validation with React Hook Form

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Styled Components
- **State Management**: React Query (TanStack Query)
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 27-the-wild-oasis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Set up your database tables (cabins, bookings, guests, users)
   - Configure Supabase storage for cabin images
   - Update the Supabase configuration in `src/supabase.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
├── context/             # React context providers
├── data/               # Mock data and data utilities
├── features/           # Feature-specific components and hooks
│   ├── authentication/ # Login, signup, user management
│   ├── bookings/       # Booking management
│   ├── cabins/         # Cabin management
│   ├── check-in-out/   # Check-in/check-out processes
│   ├── dashboard/      # Dashboard analytics
│   └── settings/       # Application settings
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API service functions
├── styles/             # Global styles and themes
├── ui/                 # UI component library
└── utils/              # Utility functions
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 UI Components

The application includes a comprehensive design system with:
- **Form Components**: Input, Select, Textarea, Checkbox
- **Layout Components**: AppLayout, Sidebar, Header, MainNav
- **Data Display**: Table, Pagination, Stats, Charts
- **Feedback**: Modal, Toast, Spinner, ErrorBoundary
- **Navigation**: Button, ButtonGroup, Menus

## 🔐 Authentication

The app uses Supabase Auth for:
- User registration and login
- Password updates
- User profile management
- Protected route access

## 📊 Data Management

- **Real-time Sync**: All data syncs in real-time with Supabase
- **Optimistic Updates**: Immediate UI updates with rollback on errors
- **Caching**: Intelligent data caching with React Query
- **Error Handling**: Comprehensive error states and retry logic

## 🌙 Dark Mode

The application supports both light and dark themes with:
- Context-based theme management
- Persistent theme preference
- Smooth theme transitions
- Consistent design tokens

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the Ultimate React course and is for educational purposes.

## 🙏 Acknowledgments

- Built as part of the Ultimate React course
- UI design inspired by modern dashboard applications
- Icons provided by React Icons
- Charts powered by Recharts
