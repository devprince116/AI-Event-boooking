# Event Booking App

## 📌 Overview

The **Event Booking App** is a modern, interactive platform that allows users to browse, register, and book tickets for various events. It features event listings, user registration, ticket booking, QR code-based validation, and email/SMS notifications. The frontend is built with **React, TypeScript, Vite, Material UI, and Redux Toolkit** for state management.

## 🚀 Features

- **Event Listings**: Browse events with filters based on date, category, and location.
- **User Registration & Authentication**: Secure signup and login functionality.
- **Ticket Booking**: Users can book tickets for events seamlessly.
- **QR Code Generation**: Upon successful booking, a unique QR code is generated for validation.
- **Email/SMS Notifications**: Users receive confirmation emails and SMS alerts after booking.
- **Responsive UI**: Optimized for both mobile and desktop views.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Material UI
- **State Management**: Redux Toolkit
- **Styling**: Material UI, CSS Modules
- **Email Service**: EmailJS
- **QR Code Generation**: QR Code Library

## 🏗️ Installation & Setup

1️⃣ **Clone the repository:**

```sh
git clone https://github.com/your-username/event-booking-app.git
cd event-booking-app
```

2️⃣ **Install dependencies:**

```sh
npm install
# OR
yarn install
```

3️⃣ **Set up environment variables:**
Create a `.env` file in the root directory and add the required variables:

```env

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_USER_ID=your_user_id
```

4️⃣ **Start the development server:**

```sh
npm run dev
# OR
yarn dev
```

## 📧 Email & QR Code Setup

- **EmailJS**: Used for sending confirmation emails. Configure your EmailJS account and update the `.env` file.
- **QR Code Generation**: QR codes are generated for ticket validation using a QR library.

## 🛠️ Future Enhancements

- Implement payment gateway integration.
- Add a dashboard for event organizers.
- Improve search and filtering options.

## 🤝 Contributing

Feel free to contribute! Open an issue or submit a pull request if you have suggestions or bug fixes.

## 📜 License

This project is licensed under the **MIT License**.

---
