const express = require('express');
const authController = require('../controllers/authController');
// const auth = require('../middleware/middlewareAuth');

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authController.signOut); //<- dodać auth / nie powinno być "delete"?

router.get('/users/current', authController.getCurrentUser);

module.exports = router;
