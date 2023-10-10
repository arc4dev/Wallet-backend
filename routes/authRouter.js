const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authController.auth, authController.signOut);

// tutaj powinien byc oddzielny plik userRouter i userController ale przez to ze jest tylko jeden endpoint to na razie mozna tak zostawic
router.get('/current', authController.getCurrentUser);

module.exports = router;
