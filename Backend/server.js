import express from 'express';
import cookieParser from 'cookie-parser'; //cookie-parser means it will parse cookies from the request
import dotenv from 'dotenv';
import cors from 'cors';  //cors means it will allow cross-origin requests i.e. requests from different domains
import connectDB from './database/db.js';
import userRoutes from './routes/user.route.js'; // Import user routes
import expenseRoute from './routes/expense.route.js'; // Import expense routes


dotenv.config({}); // Load environment variables from .env file automatically


const app = express();
const PORT = 8000;

app.use(express.json()); // Use express.json() middleware to parse JSON bodies
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies
app.use(express.urlencoded({ extended: true })); // Use urlencoded middleware to parse URL-encoded bodies

const corseOptions = {
    origin: 'http://localhost:5173', // Allow requests from this origin as when requesting from frontend it gives false CORS error
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corseOptions)); // Use CORS middleware with specified options

//API routes
app.use('/api/v1/user', userRoutes); // Use user routes for API requests at /api/v1/user
//http:localhost:5173/api/v1/user/register will be the endpoint for user registration
app.use('/api/v1/expense', expenseRoute);

connectDB(); // Connect to the database

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});