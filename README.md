# AI Event Booking System

## Overview
AI Event Booking System is a modern event management platform that enables users to browse, register, and book tickets for various events. The system leverages AI-powered event recommendations and NLP capabilities to enhance user experience by suggesting relevant events based on location and preferences.

## Features
- **Event Browsing & Filtering**: Search and filter events based on categories, date, and location.
- **Ticket Booking & QR Code Generation**: Users can book tickets and receive a QR code for event entry.
- **Email Confirmation**: Confirmation emails are sent upon successful booking using EmailJS.
- **AI-powered Event Recommendations**: Suggests similar events in the same city using NLP-based models.

## Tech Stack
### Frontend:
- **React** (Vite, TypeScript, Material UI)

### Backend:
- **Node.js** (Express, TypeScript)
- **node-nlp** (For AI-based recommendations)
- **EmailJS** (For email confirmations)

## Installation
### Prerequisites
- Node.js (v16+)
- PostgreSQL

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/devprince116/AI-Event-boooking.git
   cd AI-Event-boooking
   ```

   2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup:**
   ```bash
   cd backend
   npm install
   .env.development  # Update environment variables
   npm start # Start both server and client
   ```



## AI Integration
- Uses `node-nlp` to analyze and suggest similar events based on user preferences.
- AI-generated recommendations appear below the booking confirmation.


## License
This project is licensed under the MIT License.



