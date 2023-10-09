const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/sign-up', authController.signUp);

router.post('/sign-in', authController.signIn);

router.post('/sign-out', authController.signOut);

router.get('/users/current', authController.getCurrentUser);

module.exports = router;
