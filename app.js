const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/auth');
const transactionsRouter = require('./routes/api/transactions');
const otherOperations = require('./routes/api/other');

const app = express();

// Middlewares
app.use(morgan(app.get('env') === 'development' ? 'dev' : 'short'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api', otherOperations);

// Handle not defined routes
app.all('*', (req, res, next) => {
  res.status(404).json({ message: 'Route not found!' });
});
app.use((req, res) => {});

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
