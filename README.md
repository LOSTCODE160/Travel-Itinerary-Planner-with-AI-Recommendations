# Travel Itinerary Planner with AI Recommendations

A full-stack web application that uses Google's Gemini AI to generate personalized, day-by-day travel itineraries based on your destination, dates, and preferences.

## 🚀 Features

-   **AI-Powered Planning**: Generates detailed daily activities using Google Gemini 1.5 Flash.
-   **Interactive Maps**: Visualizes your destination using Leaflet & OpenStreetMap.
-   **Modern UI**: Beautiful, dark-mode prioritized interface tailored for travelers.
-   **Smart Context**: Automatically adjusts activities based on morning, afternoon, and evening slots.
-   **Responsive Design**: Works seamlessly on desktop and mobile.

## 🛠️ Tech Stack

-   **Frontend**: React 19, Vite, Framer Motion, Leaflet, Lucide Icons
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB (Mongoose)
-   **AI**: Google Generative AI SDK (Gemini)

## 📦 Setup & Installation

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URI)
- Google Gemini API Key

### 1. Backend Setup
```bash
cd server
npm install
# Create a .env file with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/travel_planner
# GEMINI_API_KEY=your_api_key_here

npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 📸 Usage

1.  Enter your **User ID** (e.g., `659000000000000000000001` for demo).
2.  Type a **Destination** (e.g., "Kyoto, Japan").
3.  Select your **Dates**.
4.  (Optional) Add **Preferences** like "Food, History, Nature".
5.  Click **Generate Itinerary** and watch the AI craft your trip!

