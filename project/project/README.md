# POWERGRID Material Demand Forecasting

A modern, dynamic full-stack web application for predicting material requirements for power transmission projects with real-time visualizations and interactive UI.

## Features

### Authentication
- Secure login with session persistence
- Two user roles (admin/user)
- Automatic session restoration
- Smooth animations on login

### Dynamic Dashboard
- **Real-time Statistics Cards**: Track total predictions, average budget, and last prediction timestamp
- **Interactive Form Controls**: Range sliders with live value display, radio buttons for selection
- **Form Validation**: Client-side validation with helpful error messages
- **Tab Navigation**: Switch between creating new predictions and viewing history

### Prediction System
- **Real-time Material Forecasting**: Connects to Python FastAPI backend
- **Visual Charts**: Interactive bar charts using Recharts library
- **Loading States**: Animated spinners during prediction processing
- **Export Functionality**: Download prediction reports as text files

### History Tracking
- Stores last 10 predictions locally
- Beautiful card-based layout with animations
- Detailed view of inputs and results for each prediction
- Clear all history option
- Empty state with call-to-action

### UI/UX Enhancements
- Gradient backgrounds and smooth animations
- Hover effects and transitions
- Responsive design for all screen sizes
- Icon-rich interface
- Professional color scheme
- Animated loading states
- Staggered animations for list items

## Tech Stack

**Frontend:**
- React 18 with Hooks
- Recharts for data visualization
- Modern CSS with animations and gradients
- LocalStorage for persistence

**Backend:**
- FastAPI (Python)
- NumPy for calculations
- CORS enabled
- Pydantic for validation

## Installation

### Prerequisites
- Node.js (v14+)
- Python 3.8+
- npm or yarn

### Setup

1. **Install Frontend Dependencies**
```bash
npm install
```

2. **Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

## Running the Application

### Option 1: Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
python3 main.py
```

**Terminal 2 - Frontend:**
```bash
npm start
```

### Option 2: Using npm script

**Terminal 1:**
```bash
npm run backend
```

**Terminal 2:**
```bash
npm start
```

The app will open at `http://localhost:3000` (frontend) and `http://localhost:8000` (backend API).

## Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**User Account:**
- Username: `user`
- Password: `user123`

## Using the Application

### Creating a Prediction

1. **Login** with provided credentials
2. **View Statistics** showing your prediction history
3. **Fill out the form:**
   - Use the **slider** to select budget (1-100 Cr)
   - Choose **location** from dropdown
   - Select **tower type** using radio buttons (132kV, 220kV, 400kV)
   - Choose **substation type** (AIS or GIS)
   - Select **terrain** type
   - Adjust **tax percentage** with slider (0-50%)
4. **Click "Predict Materials"** button
5. View results in:
   - **Table format** with material icons
   - **Bar chart visualization**
6. **Export** results using the export button

### Viewing History

1. Click the **"History"** tab
2. See all past predictions with:
   - Entry number and timestamp
   - Input parameters used
   - Predicted results
   - Visual icons for materials
3. **Clear history** using the "Clear All" button if needed

### Features in Detail

**Statistics Dashboard:**
- Total number of predictions made
- Average budget across all projects
- Timestamp of most recent prediction

**Interactive Controls:**
- Range sliders show real-time values
- Radio buttons with visual feedback
- Form validation prevents invalid inputs

**Visual Feedback:**
- Loading animations during API calls
- Smooth transitions between states
- Animated list items
- Hover effects on interactive elements

**Data Persistence:**
- Login session saved in localStorage
- Prediction history saved locally
- Statistics auto-calculated from history

## Project Structure

```
project/
├── backend/
│   ├── main.py              # FastAPI server
│   ├── predict.py           # Prediction logic
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/
│   │   ├── Dashboard.js     # Main dashboard with form and results
│   │   ├── Login.js         # Login page
│   │   ├── PredictionChart.js  # Bar chart visualization
│   │   ├── StatsCard.js     # Statistics card component
│   │   └── LoadingSpinner.js   # Loading animation
│   ├── App.js               # Root component
│   ├── index.js             # React entry point
│   └── styles.css           # Global styles with animations
├── public/
│   └── index.html           # HTML template
├── package.json             # Node dependencies
└── README.md                # This file
```

## API Endpoints

**POST /predict**
- **Input:** Project parameters (budget, location, tower_type, substation_type, terrain, tax)
- **Output:** Predicted material requirements (Steel, Cement, Insulators)

## Dynamic Features

### Animations
- Fade-in effects on page load
- Slide-in animations for cards
- Pulse animations for icons
- Loading spinners and dots
- Staggered list animations
- Smooth hover transitions

### Interactivity
- Real-time form value display
- Visual feedback on all interactions
- Dynamic statistics calculation
- Responsive chart tooltips
- Export functionality

### Responsiveness
- Mobile-friendly design
- Adaptive grid layouts
- Touch-friendly controls
- Optimized for all screen sizes

## Building for Production

```bash
npm run build
```

Creates optimized production build in `build/` directory.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- Backend must be running on port 8000 for predictions to work
- Frontend expects backend at `http://127.0.0.1:8000`
- History is stored locally (max 10 entries)
- All Python files remain unchanged from original implementation
