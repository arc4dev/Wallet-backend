// Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const app = require('./app');

const PORT = process.env.PORT | 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

// Handling promise rejections
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
