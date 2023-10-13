require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/authRouter');
const transactionsRouter = require('./routes/transactionsRouter');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./controllers/errorController');

const app = express();

// Middlewares
app.use(morgan(app.get('env') === 'development' ? 'dev' : 'short'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/transactions', transactionsRouter);

// Handle not defined routes
app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
