import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Use middleware


app.use(cors());


app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('DB Connection Error:', err);
  });

// Define routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Invalid server error';
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    status: statusCode
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening at PORT 3000');
});
