// Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const { default: mongoose } = require('mongoose');
const app = require('./app');

// Database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qbnimu0.mongodb.net/Wallet`
  )
  .then(() => console.log('Database connection successful!'))
  .catch(() => process.exit(1));

// Server launching
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Handling promise rejections
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
