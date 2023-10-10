const express = require('express');
const authController = require('../controllers/authController');
// const auth = require('../middleware/middlewareAuth');

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authController.auth, authController.signOut);

module.exports = router;
