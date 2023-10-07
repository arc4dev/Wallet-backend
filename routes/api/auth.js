const express = require('express');
const router = express.Router();
const ctrlAuth = require('../../controller/auth');

router.post('/sign-up', ctrlAuth.signUp);

router.post('/sign-in', ctrlAuth.signIn);

router.post('/sign-out', ctrlAuth.signOut);

module.exports = router;
