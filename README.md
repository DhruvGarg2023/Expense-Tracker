# 💰 Expense Tracker

A full-stack expense tracking application built with React, Node.js, and MongoDB. This application helps users manage their personal finances by tracking income, expenses, and providing insights into spending patterns.

## 🚀 Features

- **User Authentication**: Secure login and registration system
- **Expense Management**: Add, edit, and delete expenses
- **Income Tracking**: Record and categorize income sources
- **Category Management**: Organize expenses by categories
- **Real-time Updates**: Instant UI updates with modern state management
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Expense Tracker/
├── Frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store configuration
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main application component
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
│
└── Backend/                # Node.js backend API
    ├── controllers/        # Request handlers
    ├── models/            # Database models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    ├── database/          # Database configuration
    ├── server.js          # Express server
    └── package.json       # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Expense-Tracker
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the Backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=8000
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd Backend
   npm run dev
   ```
   Server will start on `http://localhost:8000`

   **Frontend (Terminal 2):**
   ```bash
   cd Frontend
   npm run dev
   ```
   Application will start on `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout

### Expenses
- `GET /api/v1/expense` - Get all expenses
- `POST /api/v1/expense` - Create new expense
- `PUT /api/v1/expense/:id` - Update expense
- `DELETE /api/v1/expense/:id` - Delete expense

## 🎨 UI Components

This project uses **shadcn/ui** components for a consistent and beautiful user interface:

- **Button** - Interactive buttons with variants
- **Dialog** - Modal dialogs for forms
- **Input** - Form input fields
- **Select** - Dropdown selections
- **Avatar** - User profile pictures
- **Toast** - Notification system

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
```

## 🚀 Deployment

### Frontend Deployment
1. Build the application:
   ```bash
   cd Frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Deploy to platforms like:
   - **Railway**
   - **Render**
   - **Heroku**
   - **Vercel** (Serverless)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dhruv** - *Full Stack Developer*

## 🙏 Acknowledgments

- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for utility-first styling
- **Vite** for fast development experience
- **MongoDB** for reliable database solution

---

⭐ If you find this project helpful, please give it a star! 
