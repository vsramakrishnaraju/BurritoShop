import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import burritoRoutes from './routes/Burrito';
import orderRoutes from './routes/Order';

const app: Application = express();

const corsOptions = {
  origin: '*', // or '*' to allow all origins
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware for CORS
app.use(cors(corsOptions));

// Middleware for parsing JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/burritoShop')
.then(() => console.log('Connected to MongoDB'))
.catch((error: Error) => console.error('MongoDB connection error:', error.message));

// Routes
app.use('/api/burritos', burritoRoutes);
app.use('/api/orders', orderRoutes);

// Welcome route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Burrito API!');
});

// Global error handler
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err); // Log the error
  if (err instanceof Error) {
    return res.status(500).json({ message: err.message });
  }
  res.status(500).json({ message: 'An unknown error occurred' });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
