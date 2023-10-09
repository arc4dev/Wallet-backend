const express = require('express');
const authController = require('../controllers/authController');
// const auth = require('../middleware/middlewareAuth');

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authController.signOut); //<- dodać auth / nie powinno być "delete"?

// tutaj powinien byc oddzielny plik userRouter i userController ale przez to ze jest tylko jeden endpoint to na razie mozna tak zostawic
router.get('/current', authController.getCurrentUser);

module.exports = router;
