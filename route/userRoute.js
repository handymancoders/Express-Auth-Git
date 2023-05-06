const express = require('express');
const { registration, login } = require('../controller/authContoller');

const router = express.Router();

router.route('/signup')
    .post(registration)

router.route('/login')
    .post(login)

module.exports = router;