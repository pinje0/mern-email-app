# Frontend - MERN Email Application

React + TypeScript + Vite frontend for the MERN Email Application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Run development server
npm run dev

# Build for production
npm run build
```

App starts on `http://localhost:5173`

## 📋 Available Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🗂️ Project Structure

```
src/
├── components/
│   ├── EmailModal.tsx       # Create/Edit email modal
│   └── Navbar.tsx           # Navigation component
├── contexts/
│   └── AuthContext.tsx      # Authentication state management
├── pages/
│   ├── Calendar.tsx         # Calendar view with email events
│   ├── EmailList.tsx        # Table view of all emails
│   └── Login.tsx            # Login page
├── services/
│   └── api.ts               # Axios API client
├── types/
│   └── index.ts             # TypeScript interfaces
├── App.tsx                  # Main app component with routing
├── main.tsx                 # App entry point
└── index.css                # Global styles
```

## 🔧 Environment Variables

Create `.env` file in this directory:

```env
# API URL for backend connection
# For local development:
VITE_API_URL=http://localhost:5000/api

# For production deployment:
# VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Note:** Vite requires environment variables to start with `VITE_` prefix.

## 🎨 Features

### Authentication
- Login form with email/password
- JWT token stored in localStorage
- Automatic redirect to login if token expires
- Logout functionality with timestamp recording

### Calendar View (`/calendar`)
- Monthly calendar display using react-big-calendar
- Click on date to create new email
- Click on event to edit existing email
- Shows email recipient on calendar
- Navigation: Today, Back, Next buttons

### Email List View (`/emails`)
- Table display of all email schedules
- Columns: Email, Date, Description, Status, Actions
- Status badges (pending, sent, failed)
- Edit, Send, Delete actions
- Responsive design

### Email Modal
- Create new or edit existing email
- Form fields: Email, Date, Description
- Send Now button (for immediate sending)
- Delete button
- Cancel and Save actions

## 🛣️ Routes

| Route | Component | Auth Required | Description |
|-------|-----------|---------------|-------------|
| `/` | Redirect | - | Redirects to login or calendar |
| `/login` | Login | No | Login page |
| `/calendar` | Calendar | Yes | Calendar view of emails |
| `/emails` | EmailList | Yes | List view of all emails |

## 🔌 API Integration

The frontend uses Axios for API calls:

**Base URL:** Configured via `VITE_API_URL` environment variable

**Authentication:** JWT token automatically added to headers:
```javascript
Authorization: Bearer <token>
```

**Interceptors:**
- Request interceptor adds auth token
- Response interceptor handles 401 errors (redirects to login)

## 🎨 Styling

- Custom CSS in `index.css`
- Responsive design with media queries
- CSS classes for components:
  - `.navbar` - Navigation bar
  - `.login-container` - Login page
  - `.calendar-container` - Calendar view
  - `.email-list-container` - Email list table
  - `.modal-overlay` - Modal backdrop
  - `.modal-content` - Modal content

### Status Colors
- **Pending** (Orange): `#f39c12`
- **Sent** (Green): `#27ae60`
- **Failed** (Red): `#e74c3c`

## 🧩 Components

### Navbar
- Shows app name/logo
- Welcome message with user name
- Navigation links (Calendar, Email List)
- Logout button

### EmailModal
- Props:
  - `isOpen` - Show/hide modal
  - `selectedDate` - Pre-filled date
  - `email` - Email data for editing (null for create)
  - `onCreate`, `onUpdate`, `onDelete`, `onSend` - Action handlers
- Handles form validation
- Shows error messages
- Loading states for async operations

### Calendar
- Uses `react-big-calendar` library
- Configured with date-fns localizer
- Events mapped from email data
- Timezone-safe date handling

### EmailList
- Table with all email schedules
- Sortable/filterable (future feature)
- Action buttons for each row
- Empty state handling

## 📦 Dependencies

**Core:**
- react - UI library
- react-dom - DOM rendering
- react-router-dom - Routing
- axios - HTTP client

**UI Components:**
- react-big-calendar - Calendar component
- date-fns - Date utilities

**Build Tools:**
- vite - Build tool
- typescript - TypeScript compiler
- @vitejs/plugin-react-swc - React plugin

**Types:**
- @types/react
- @types/react-dom
- @types/react-big-calendar

## 🐛 Debugging

### Common Issues

**Calendar not displaying:**
- Check if `react-big-calendar` CSS is imported
- Verify date-fns locale configuration

**API calls failing:**
- Check `VITE_API_URL` in `.env`
- Ensure backend is running
- Check browser console for CORS errors

**Authentication issues:**
- Clear localStorage and re-login
- Check JWT token expiry
- Verify backend auth endpoints

### Development Tools

**Browser Extensions:**
- React Developer Tools
- Redux DevTools (if using Redux in future)

**Network Debugging:**
- Use browser Network tab to inspect API calls
- Check request/response headers
- Verify JWT token is sent correctly

## 🔮 Future Improvements

See `AGENTS.md` in root directory for planned features:
- UI/UX improvements
- Deployment to Vercel
- Production database setup
- Email scheduling automation
